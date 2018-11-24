import React from "react";
import { connect } from "react-redux";
import GoogleMap from "../component/GoogleMap";

export const mapStateToProps = state => ({
  center: state.currentGeolocation
});

// XXX don't know why use forwardRed return object in parameter will cause error.
// XXX need to investigate it later
export default connect(mapStateToProps)(props => <GoogleMap {...props} />);
