'use strict';

import ApiService, {LOGIN_API} from './api.service';

class AuthService {
	login(loginData) {
		return ApiService.fetch(LOGIN_API, {
			method: 'POST',
			withAuthHeaders: false,
			body: loginData
		}).then(result => {
			localStorage.setItem('auth', JSON.stringify({accessToken: result}));

			return result;
		});
	}
}

export default new AuthService();