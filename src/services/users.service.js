'use strict';

import ApiService, {USERS_API} from './api.service';

class UsersService {
	getUsers() {
		return ApiService.fetch(USERS_API);
	}

	getUser(userId) {
		return ApiService.fetch(`${USERS_API}/${userId}`);
	}

	setUser(userId, userData) {
		return ApiService.fetch(`${USERS_API}/${userId}`, {
			method: 'POST', // As per CRUD this should be PUT
			body: userData
		});
	}
}

export default new UsersService();