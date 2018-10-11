import _ from 'lodash';
import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Explore from './container/Explore';
import Intro from './component/Intro';
import Navbar from './component/Navbar';
import { currentGeolocation } from './action';
import { connectAppLocalizationProvider, LOCALES } from './i18n';

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
    const routes = _.flatMap(LOCALES, locale => {
      return URLS.map(([name, Component]) => {
        const path = `/${locale}/${name}`;
        Component = connectAppLocalizationProvider([locale])(Component);
        return <Route key={path} exact path={path} component={Component} />
      });
    });
    return routes;
  }

  render() {
    return (
      <Router>
        <Wrapper>
          <Navbar />
          <Switch>
            {this._renderI18nRoutes()}
            <Route exact path="/explore" component={Explore} />
            <Route path="/" component={Intro} />
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
