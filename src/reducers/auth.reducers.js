'use strict';

import {LOGIN, IS_LOGGED_IN} from '../actions/auth.actions';
import AuthService from '../services/auth.service';

export const authReducers = (state = {isLoggedIn: AuthService.isLoggedIn()}, action) => {
	const {type, payload} = action;

	switch (type) {

		case IS_LOGGED_IN:
			return ({...state});

		case LOGIN:
			return ({...state,
				isLoggedIn: true,
			});
	}

	return state;
};