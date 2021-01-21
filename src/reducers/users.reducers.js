'use strict';

import {GET_USERS, GET_USER} from '../actions/users.actions';

export const usersReducers = (state = {users: []}, action) => {
	const {type, payload} = action;

	switch (type) {

		case GET_USERS:
			return ({...state,
				users: payload.users,
			});
	}

	return state;
};