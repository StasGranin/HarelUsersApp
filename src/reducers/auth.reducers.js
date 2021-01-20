'use strict';

import {LOGIN, IS_LOGGED_IN} from '../actions/auth.actions';

export const authReducers = (state = {isLoggedIn: false}, action) => {
	const {type, payload} = action;

	switch (type) {

		case IS_LOGGED_IN:
			return Object.assign({}, state);

		case LOGIN:
			return Object.assign({}, state, {
				isLoggedIn: true,
			});
	}

	return state;
};