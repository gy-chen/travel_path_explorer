import { SET_CURRENT_GEOLOCATION } from "../action/currentGeolocation";

const currentGeolocationReducer = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_GEOLOCATION:
      return {
        lat: action.geolocation.lat,
        lng: action.geolocation.lng
      };
    default:
      return state;
  }
};

export default currentGeolocationReducer;
