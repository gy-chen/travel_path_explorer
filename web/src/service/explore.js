import { create } from 'apisauce';

export const api = create({
    baseURL: process.env.TPE_API_SERVER || process.env.STORY_BOOK_TPE_API_SERVER
});

export const findRoute = (origin, destination) => {
    origin = formatLocation(origin);
    destination = formatLocation(destination);
    return api.get('/explore', { origin, destination });
};

/**
 * Convert location parameter to string format that api accept
 * 
 * if location is object, convert to `${location.lng},${location.lat}`.
 * 
 * if location is string, do nothing.
 * 
 * @param {object|string} location 
 */
export const formatLocation = location => {
    if (typeof location === 'object') {
        return `${location.lng},${location.lat}`;
    }
    return location;
};