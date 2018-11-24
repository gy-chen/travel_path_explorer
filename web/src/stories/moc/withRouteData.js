import React from "react";
import sampleData from "./sample.json";

export const withRouteData = Component => {
  const WithRouteData = props => <Component {...sampleData} {...props} />;

  return WithRouteData;
};
