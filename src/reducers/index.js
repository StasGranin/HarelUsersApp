'use strict';
import {combineReducers} from 'redux';

import {authReducers} from './auth.reducers';
import {usersReducers} from './users.reducers';

export default combineReducers({
	auth: authReducers,
	users: usersReducers
})