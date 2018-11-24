import { combineReducers } from "redux";
import routeReducer from "./route";
import currentGeolocationReducer from "./currentGeolocation";

export default combineReducers({
  route: routeReducer,
  currentGeolocation: currentGeolocationReducer
});
