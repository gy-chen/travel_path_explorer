export const ROUTE_FETCH = "FETCH_ROUTE";
export const ROUTE_REQUEST = "REQUEST_ROUTE";
export const ROUTE_RECEIVE = "RECEIVE_ROUTE";
export const ERROR_RECEIVE = "RECEIVE_ERROR";

export const fetchRoute = (origin, destination) => ({
  type: ROUTE_FETCH,
  origin,
  destination
});

export const requestRoute = () => ({
  type: ROUTE_REQUEST
});

export const receiveRoute = route => ({
  type: ROUTE_RECEIVE,
  route
});

export const receiveError = error => ({
  type: ERROR_RECEIVE,
  error
});
