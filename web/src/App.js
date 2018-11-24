import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import RedirectToCurrentLocale from "./component/RedirectToCurrentLocale";
import AppRoutes from "./AppRoutes";
import { currentGeolocation } from "./action";
import MatomoTracker from "./component/MatomoTracker";

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
      <Router basename={process.env.REACT_APP_ROUTER_BASENAME}>
        <div>
          <Switch>
            <Route path="/:locale" component={AppRoutes} />
            <Route path="/" component={RedirectToCurrentLocale} />
          </Switch>
          <MatomoTracker host={process.env.REACT_APP_TRACKER_SERVER} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = {
  initialize: currentGeolocation.fetchCurrentGeolocation
};

export default connect(
  null,
  mapDispatchToProps
)(App);
