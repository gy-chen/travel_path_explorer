import { combineReducers } from 'redux';
import { ROUTE_REQUEST, ROUTE_RECEIVE } from '../action/route';

export const currentRouteReducer = (state = null, action) => {
    switch (action.type) {
        case ROUTE_REQUEST:
            return null;
        case ROUTE_RECEIVE:
            return action.route;
        default:
            return state;
    }
}

export const isFetchReducer = (state = false, action) => {
    switch (action.type) {
        case ROUTE_REQUEST:
            return true;
        case ROUTE_RECEIVE:
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    currentRoute: currentRouteReducer,
    isFetching: isFetchReducer
})