import { combineEpics } from "redux-observable";
import routeEpic from "./route";
import geolocationEpic from "./geolocation";

export default combineEpics(routeEpic, geolocationEpic);
