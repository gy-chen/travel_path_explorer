import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Explore from './container/Explore';
import Intro from './component/Intro';
import { currentGeolocation } from './action';

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
        <Switch>
          <Route exact path="/explore" component={Explore} />
          <Route path="/" component={Intro} />
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  initialize: currentGeolocation.fetchCurrentGeolocation
};

export default connect(null, mapDispatchToProps)(App);
