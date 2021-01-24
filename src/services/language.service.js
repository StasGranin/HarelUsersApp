'use strict';

import {dataTypes, filterTypes} from './filter.service';

export const texts = {
	pageHeaders: {
		LOADING: 'Loading...',
		MAIN_PAGE: 'Users',
		EDIT_USER: 'Edit User:',
		LOGIN: 'Please Login'
	},

	buttonLabels: {
		APPLY: 'Apply',
		CANCEL: 'Cancel',
		LOGIN: 'Login',
		SAVE: 'Save Changes',
		SUBMIT: 'Submit',
	},

	filters: {
		FILTER_BY: 'Filter by',
		FILTERS: 'Filters',
		FILTER: 'Filter',

		filterTypes: {
			[dataTypes.NUMBER]: {
				[filterTypes[dataTypes.NUMBER].LESS_THAN]: 'Less than',
				[filterTypes[dataTypes.NUMBER].GREATER_THAN]: 'Greater than',
				[filterTypes[dataTypes.NUMBER].EQUALS]: 'Equals',
				[filterTypes[dataTypes.NUMBER].NOT_EQUALS]: 'Not equals',
			},

			[dataTypes.STRING]: {
				[filterTypes[dataTypes.STRING].EQUALS]: 'Equals',
				[filterTypes[dataTypes.STRING].NOT_EQUALS]: 'Not equals',
				[filterTypes[dataTypes.STRING].CONTAINING]: 'Containing',
				[filterTypes[dataTypes.STRING].NOT_CONTAINING]: 'Not containing',
			},

			[dataTypes.DATE]: {
				[filterTypes[dataTypes.DATE].TODAY]: 'Today',
				[filterTypes[dataTypes.DATE].THIS_WEEK]: 'This week',
				[filterTypes[dataTypes.DATE].THIS_MONTH]: 'This month',
				[filterTypes[dataTypes.DATE].THIS_YEAR]: 'This year',
				[filterTypes[dataTypes.DATE].OLDER]: 'Older',
				ALL: 'All',
			}
		}
	},

	usersTableColumnLabels: {
		ID: 'ID',
		FIRST_NAME: 'First Name',
		LAST_NAME: 'Last Name',
		DATE: 'Date',
		PHONE: 'Phone Number'
	},

	loginForm: {
		labels: {
			FIRST_NAME: 'First Name',
			LAST_NAME: 'Last Name',
			EMAIL: 'Email',
			PASSWORD: 'Password'
		},

		validationErrors: {
			FIRST_NAME_EMPTY: 'First Name cannot be empty',
			LAST_NAME_EMPTY: 'Last Name cannot be empty',
			EMAIL_EMPTY: 'Email cannot be empty',
			EMAIL_INVALID: 'Email is invalid',
			PASSWORD_EMPTY: 'Password cannot be empty',
		}
	},

	editUserForm: {
		labels: {
			FIRST_NAME: 'First Name',
			LAST_NAME: 'Last Name',
			EMAIL: 'Email',
			DATE: 'Date',
			PHONE: 'Phone Number',
			ACCOUNT: 'Account',
			ACCOUNT_NAME: 'Account Name'
		},

		validationErrors: {
			FIRST_NAME_EMPTY: 'First Name cannot be empty',
			LAST_NAME_EMPTY: 'Last Name cannot be empty',
			EMAIL_EMPTY: 'Email cannot be empty',
			EMAIL_INVALID: 'Email is invalid',
			DATE_EMPTY: 'Date cannot be empty',
			DATE_INVALID: 'Date is invalid',
			PHONE_EMPTY: 'Phone Number cannot be empty',
			ACCOUNT_EMPTY: 'Account cannot be empty',
			ACCOUNT_NAME_EMPTY: 'Account Name cannot be empty',
		}
	}
};