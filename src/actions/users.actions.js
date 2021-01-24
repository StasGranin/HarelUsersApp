'use strict';

import UsersService from '../services/users.service';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';

export const getUsers = () => dispatch => UsersService.getUsers().then(results => dispatch({type: GET_USERS, payload: {users: results}}));
export const getUserDetails = (userId) => dispatch => UsersService.getUser(userId).then(result => dispatch({type: GET_USER, payload: {user: result}})); // Not used
export const setUserDetails = (userId, userData) => dispatch => UsersService.setUser(userId, userData).then(result => dispatch({type: SET_USER, payload: {userData, res: result}}));