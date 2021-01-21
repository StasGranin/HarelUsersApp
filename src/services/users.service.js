'use strict';

import ApiService, {USERS_API} from './api.service';

class UsersService {
	getUsers() {
		return ApiService.fetch(USERS_API)
	}

	getUser(userId) {
		return ApiService.fetch(`${USERS_API}/${userId}`)
	}
}

export default new UsersService();