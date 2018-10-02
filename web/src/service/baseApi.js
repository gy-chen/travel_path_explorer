import { create } from 'apisauce';

export const api = create({
    baseURL: process.env.TPE_API_SERVER || process.env.STORY_BOOK_TPE_API_SERVER
});