import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Explore from './container/Explore';
import Intro from './component/Intro';

/**
 * App
 * 
 * Handle routing, display correct information according to routing.
 * 
 */
class App extends Component {
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

export default App;
