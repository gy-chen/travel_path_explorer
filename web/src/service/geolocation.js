import { api } from './baseApi';

export const getGeolocation = () => {
    return api.get('/geolocation');
};