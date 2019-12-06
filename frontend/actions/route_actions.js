import { postRoute, getAllRoutes, getRoute } from '../util/routes_api_util';

export const RECEIVE_ALL_ROUTES = "RECEIVE_ALL_ROUTES";
export const RECEIVE_ROUTE = "RECEIVE_ROUTE";
export const RECEIVE_ROUTE_ERRORS = "RECEIVE_ROUTE_ERRORS";
export const CLEAR_ROUTE_ERRORS = "CLEAR_ROUTE_ERRORS";

const receiveAllRoutes = payload => ({
  type: RECEIVE_ALL_ROUTES,
  routes: payload.routes
})

const receiveRoute = route => ({
  type: RECEIVE_ROUTE,
  route
})

const receiveRouteErrors = errors => ({
  type: RECEIVE_ROUTE_ERRORS,
  errors
})

export const clearRouteErrors = () => ({
  type: CLEAR_ROUTE_ERRORS
})

export const fetchAllRoutes = () => dispatch => {
  return getAllRoutes()
  .then( routes => dispatch(receiveAllRoutes(routes)))
}

export const fetchRoute = routeId => dispatch => {
  return getRoute(routeId)
  .then( route => {
    return dispatch(receiveRoute(route))
  })
}

export const createRoute = route => dispatch => {
  return postRoute(route)
  .then( route => dispatch(receiveRoute(route)), 
  error => dispatch(receiveRouteErrors(error.responseJSON)))
}