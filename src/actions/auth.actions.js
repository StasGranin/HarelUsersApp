'use strict';

export const LOGIN = 'LOGIN';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';

export const isLoggedIn = () => ({type: IS_LOGGED_IN});
export const login = () => dispatch => CityService.getCities().then(cities => dispatch({type: GET_CITIES, payload: {cities}}));