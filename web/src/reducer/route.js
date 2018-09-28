import { combineReducers } from 'redux';
import { ROUTE_REQUEST, ROUTE_RECEIVE, ERROR_RECEIVE, ROUTE_FETCH } from '../action/route';

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
        case ERROR_RECEIVE:
            return false;
        default:
            return state;
    }
}

export const currentErrorReducer = (state = null, action) => {
    switch (action.type) {
        case ROUTE_REQUEST:
            return null;
        case ERROR_RECEIVE:
            return action.error;
        default:
            return state;
    }
};

export default combineReducers({
    currentError: currentErrorReducer,
    currentRoute: currentRouteReducer,
    isFetching: isFetchReducer
})