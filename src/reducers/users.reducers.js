'use strict';

import {LOGIN, IS_LOGGED_IN} from '../actions/auth.actions';

export const usersReducers = (state = {isLoggedIn: false}, action) => {

	switch (action.type) {

		case IS_LOGGED_IN:
			return state;
	}

	return state;
};