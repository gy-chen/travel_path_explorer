import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Explore from './container/Explore';
import Intro from './component/Intro';
import Navbar from './component/Navbar';
import { currentGeolocation } from './action';

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

    initialize();
  }

  render() {
    return (
      <Router>
        <Wrapper>
          <Navbar />
          <Switch>
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
