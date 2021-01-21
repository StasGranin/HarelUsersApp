'use strict';

import UsersService from '../services/users.service';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';

export const getUsers = loginData => dispatch => UsersService.getUsers().then(results => dispatch({type: GET_USERS, payload: {users: results}}));