'use strict';

import AuthService from '../services/auth.service';

export const LOGIN = 'LOGIN';
export const IS_LOGGED_IN = 'IS_LOGGED_IN';

export const isLoggedIn = () => ({type: IS_LOGGED_IN});
export const login = loginData => dispatch => AuthService.login(loginData).then(result => dispatch({type: LOGIN}));