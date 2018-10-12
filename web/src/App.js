import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Explore from './container/Explore';
import Intro from './component/Intro';
import Navbar from './component/Navbar';
import { currentGeolocation } from './action';
import { connectAppLocalizationProvider, LOCALES, negotiateLanguages } from './i18n';

// [[name, Component], ...]
// name will be used to construct route, final route url will become /<locale>/<name>
const URLS = [
  ['explore', Explore],
  ['', Intro]
];

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

/**
 * App
 * 
 * Handle routing, display correct information according to routing.
 * 
 */
class App extends Component {

  componentDidMount() {
    const { initialize } = this.props;

    this._renderI18nRoutes = this._renderI18nRoutes.bind(this);

    initialize();
  }

  _renderI18nRoutes() {
    const routes = [];
    for (const locale of LOCALES) {
      for (const [name, Component] of URLS) {
        const path = `/${locale}/${name}`;
        const WithLocaleComponent = connectAppLocalizationProvider([locale])(Component);
        routes.push(<Route key={path} exact path={path} component={WithLocaleComponent} />);
      }
    };

    return routes;
  }

  render() {
    return (
      <Router>
        <Wrapper>
          <Navbar />
          <Switch>
            {this._renderI18nRoutes()}
            <Route path="/" component={RedirectToCurrentLocale} />
          </Switch>
        </Wrapper>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  initialize: currentGeolocation.fetchCurrentGeolocation
};

export default connect(null, mapDispatchToProps)(App);
