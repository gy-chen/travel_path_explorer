import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FluentBundle } from 'fluent/compat';
import { LocalizationProvider } from 'fluent-react/compat';
import { negotiateLanguages } from 'fluent-langneg/compat';
import enMessages from './en.fmt';
import zhMessages from './zh.fmt';

const MESSAGES_ALL = {
    en: enMessages,
    zh: zhMessages
};

const LOCALES = ['en', 'zh'];

export const hasPreferLocales = userLocales => {
    const matchedLocales = negotiateLanguages(userLocales, LOCALES);
    return !_.isEmpty(_.intersection(userLocales, matchedLocales));
};

export function* generateBundles(userLocales) {
    const currentLocales = negotiateLanguages(userLocales,
        LOCALES,
        { defaultLocale: 'en' }
    )

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

    render() {
        const { userLocales, children } = this.props;

        return (
            <LocalizationProvider bundles={generateBundles(userLocales)}>
                {children}
            </LocalizationProvider>
        )
    }
}

AppLocalizationProvider.propTypes = {
    userLocales: PropTypes.arrayOf(PropTypes.string)
};

export const connectAppLocalizationProvider = userLocales => {

    const withLocale = Component => {

        const WithLocale = props => {

            return (
                <AppLocalizationProvider userLocales={userLocales}>
                    <Component {...props} />
                </AppLocalizationProvider>
            );
        };

        return WithLocale;
    };

    return withLocale;
};