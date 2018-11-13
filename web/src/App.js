import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './component/Navbar';
import RedirectToCurrentLocale from './component/RedirectToCurrentLocale';
import AppRoutes from './AppRoutes';
import { currentGeolocation } from './action';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

    initialize();
  }

  render() {
    return (
      <Router>
        <Wrapper>
          <Navbar />
          <Switch>
            <Route path="/:locale" component={AppRoutes} />
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
