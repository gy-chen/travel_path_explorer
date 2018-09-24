import { combineEpics } from 'redux-observable';
import routeEpic from './route';

export default combineEpics(
    routeEpic
);