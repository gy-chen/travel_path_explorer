import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { FluentBundle } from "fluent/compat";
import { LocalizationProvider } from "fluent-react/compat";
import { negotiateLanguages as negotiateLanguagesFlt } from "fluent-langneg/compat";
import enMessages from "./en";
import zhMessages from "./zh";

const MESSAGES_ALL = {
  en: enMessages,
  zh: zhMessages
};

export const LOCALES = ["en", "zh"];

export const DEFAULT_LOCALE = "en";

export const hasPreferLocales = userLocales => {
  const matchedLocales = negotiateLanguagesFlt(userLocales, LOCALES);
  return !_.isEmpty(_.intersection(userLocales, matchedLocales));
};

export const negotiateLanguages = userLocales => {
  return negotiateLanguagesFlt(userLocales, LOCALES, {
    defaultLocale: DEFAULT_LOCALE
  });
};

export function* generateBundles(userLocales) {
  const currentLocales = negotiateLanguages(userLocales);

  for (const locale of currentLocales) {
    const bundle = new FluentBundle(locale);
    bundle.addMessages(MESSAGES_ALL[locale]);
    yield bundle;
  }
}

/**
 * AppLocalizationProvider
 *
 * Retreive prefer locale from props, then use it to negotiate languages.
 *
 */
export class AppLocalizationProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bundles: this._generateBundles()
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locale !== this.props.locale) {
      this.setState({
        bundles: this._generateBundles()
      });
    }
  }

  _generateBundles() {
    const { locale } = this.props;

    return generateBundles([locale]);
  }

  render() {
    const { children } = this.props;
    const { bundles } = this.state;

    return (
      <LocalizationProvider bundles={bundles}>{children}</LocalizationProvider>
    );
  }
}

AppLocalizationProvider.propTypes = {
  locale: PropTypes.string
};

export const connectAppLocalizationProvider = locale => {
  const withLocale = Component => {
    const WithLocale = props => {
      return (
        <AppLocalizationProvider locale={locale}>
          <Component {...props} />
        </AppLocalizationProvider>
      );
    };

    return WithLocale;
  };

  return withLocale;
};
