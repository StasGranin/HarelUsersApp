'use strict';

import ApiService, {LOGIN_API} from './api.service';

class AuthService {
	login(loginData) {
		return ApiService.fetch(LOGIN_API, {
			method: 'POST',
			withAuthHeaders: false,
			body: loginData
		}).then(result => {
			localStorage.setItem('auth', JSON.stringify({accessToken: result.token}));

			return result;
		});
	}

	isLoggedIn() {
		const user = JSON.parse(localStorage.getItem('auth'));

		return user && user.accessToken && true || false;
	}
}

export default new AuthService();