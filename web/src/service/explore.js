import { create } from 'apisauce';

export const api = create({
    baseURL: process.env.TPE_API_SERVER || process.env.STORY_BOOK_TPE_API_SERVER
});

export const findRoute = (origin, destination) => {
    origin = formatLocation(origin);
    destination = formatLocation(destination);
    return api.get('/explore', { origin, destination });
};

export const STATUS_CODE = {
    OK: 'OK',
    UNAVAILABLE: 'UNAVAILABLE',
    NOT_FOUND: 'NOT_FOUND'
};

/**
 * Convert location parameter to string format that api accept
 * 
 * if location is object, convert to `${location.lat},${location.lng}`.
 * 
 * if location is string, do nothing.
 * 
 * @param {object|string} location 
 */
export const formatLocation = location => {
    if (typeof location === 'object') {
        return `${location.lat},${location.lng}`;
    }
    return location;
};