export const SET_CURRENT_GEOLOCATION = 'SET_CURRENT_LOCATION';

export const setCurrentGeolocation = geolocation => ({
    type: SET_CURRENT_GEOLOCATION,
    geolocation
});