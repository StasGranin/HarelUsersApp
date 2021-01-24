'use strict';

import {GET_USERS, GET_USER, SET_USER} from '../actions/users.actions';

export const usersReducers = (state = {users: [], isLoaded: false}, action) => {
	const {type, payload} = action;

	switch (type) {

		case GET_USERS:
			return ({...state,
				users: payload.users,
				isLoaded: true
			});

		case SET_USER:
			return state;
	}

	return state;
};