export const FETCH_GEOLOCATION = 'FETCH_GEOLOCATION';
export const SET_CURRENT_GEOLOCATION = 'SET_CURRENT_GEOLOCATION';

export const setCurrentGeolocation = geolocation => ({
    type: SET_CURRENT_GEOLOCATION,
    geolocation
});

export const fetchCurrentGeolocation = () => ({
    type: FETCH_GEOLOCATION
});