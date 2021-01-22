'use strict';

import {dataTypes, filterTypes} from './filter.service';

export const texts = {
	filters: {
		FILTER_BY: 'Filter by',
		FILTERS: 'Filters',
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
	}
};