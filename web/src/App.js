import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Explore from './container/Explore';
import Intro from './component/Intro';
import Navbar from './component/Navbar';
import { currentGeolocation } from './action';
import { hasPreferLocales, AppLocalizationProvider, negotiateLanguages } from './i18n';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
`;

const RedirectToCurrentLocale = () => {
  const currentLocale = negotiateLanguages(navigator.languages)[0];
  return <Redirect to={`/${currentLocale}`} />;
};

class AppRoutes extends Component {

  // [[name, Component], ...]
  // name will be used to construct route, final route url will become /<locale>/<name>
  static URLS = [
    ['explore', Explore],
    ['', Intro]
  ]

  constructor(props) {
    super(props);

    this._renderAppRoutes = this._renderAppRoutes.bind(this);
    this._hasPreferLocales = this._hasPreferLocales.bind(this);

    this.state = {
      hasPreferLocales: this._hasPreferLocales()
    };
  }

  _hasPreferLocales() {
    const { match: { params: { locale } } } = this.props;
    return hasPreferLocales([locale]);
  }

  _renderAppRoutes() {
    const { match } = this.props;

    const routes = [];
    for (const [name, Component] of AppRoutes.URLS) {
      const path = `${match.url}/${name}`;
      routes.push(<Route key={path} exact path={path} component={Component} />);
    }
    return routes;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.locale !== this.props.match.params.locale) {
      this.setState({
        hasPreferLocales: this._hasPreferLocales()
      });
    }
  }

  render() {
    const { hasPreferLocales } = this.state;
    if (!hasPreferLocales) {
      return <RedirectToCurrentLocale />;
    }

    const { match: { params: { locale } } } = this.props;

    return (
      <AppLocalizationProvider locale={locale}>
        <Switch>
          {this._renderAppRoutes()}
          <Route path="/" component={RedirectToCurrentLocale} />
        </Switch>
      </AppLocalizationProvider>
    );
  }
}

/**
 * App
 * 
 * Handle routing, display correct information according to routing.
 * 
 */
class App extends Component {

  componentDidMount() {
    const { initialize } = this.props;

    initialize();
  }

  render() {
    return (
      <Router>
        <Wrapper>
          <Navbar />
          <Route path="/:locale" component={AppRoutes} />
        </Wrapper>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  initialize: currentGeolocation.fetchCurrentGeolocation
};

export default connect(null, mapDispatchToProps)(App);
