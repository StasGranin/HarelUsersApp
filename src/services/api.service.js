'use strict';

const API = 'https://test-api-server.herokuapp.com';

export const LOGIN_API = `${API}/login`;
export const USERS_API = `${API}/users`;

class ApiService {
	fetch (url, options = {}) {
		let fetchOptions = {
			headers: {'Content-Type': 'application/json'},
			method: options.method || 'GET'
		};

		if (options.withAuthHeaders !== false) {
			try {
				const user = JSON.parse(localStorage.getItem('auth'));

				if (user && user.accessToken) {
					fetchOptions.headers['x-access-token'] = user.accessToken;
				}
			}
			catch (error) {
				window.location = '/login';
			}
		}

		if (options.body && fetchOptions.method !== 'GET') {
			fetchOptions.body = JSON.stringify(options.body);
		}

		return fetch(url, fetchOptions).then(response => response.json()).then(result => {
			if (result && result.status === 401) {
				window.location = '/login';
			}

			return result
		});
	}
}

export default new ApiService();