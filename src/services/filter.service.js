'use strict';

import moment from 'moment';

export const dataTypes = {NUMBER: 'NUMBER', STRING: 'STRING', DATE: 'DATE'};
export const filterTypes = {
	[dataTypes.NUMBER]: {LESS_THAN: 'LESS_THAN', GREATER_THAN: 'GREATER_THAN', EQUALS: 'EQUALS', NOT_EQUALS: 'NOT_EQUALS'},
	[dataTypes.STRING]: {EQUALS: 'EQUALS', NOT_EQUALS: 'NOT_EQUALS', CONTAINING: 'CONTAINING', NOT_CONTAINING: 'NOT_CONTAINING'},
	[dataTypes.DATE]: {TODAY: 'TODAY', THIS_WEEK: 'THIS_WEEK', THIS_MONTH: 'THIS_MONTH', THIS_YEAR: 'THIS_YEAR', OLDER: 'OLDER'}
};

export class Filters {

	constructor(initialFilterItems = []) {
		this.filters = {
			count: 0,
			keys: {},
			items: initialFilterItems
		};

		this.update();
	}

	getFilters() {
		return this.filters;
	}

	getFilter(key) {
		const {filters} = this;
		return filters.items[filters.keys[key]];
	}

	setFilter(filterItem) {
		const {filters} = this;

		if (filters.keys[filterItem.key]) {
			filters.items[filters.keys[filterItem.key]] = filterItem;
		}
		else {
			filters.items.push(filterItem);
			this.update();
		}

		return filters;
	}

	removeFilter(filterItem) {
		const {filters} = this;
		const itemIndex = filters.keys[filterItem.key];

		if (itemIndex !== undefined) {
			filters.items.splice(itemIndex, 1);
			this.update();
		}

		return filters;
	}

	update() {
		const {filters} = this;

		filters.keys = {};
		filters.items.forEach((item, index) => filters.keys[item.key] = index);
		filters.count = filters.items.length;
	}
}

class FilterService {
	filterArray(arr, filter) {
		return arr.filter(item => {
			switch (filter.dataType) {
				case dataTypes.NUMBER:
					return this.numberFilterFn(item[filter.key], filter.type, filter.value);

				case dataTypes.DATE:
					return this.stringFilterFn(item[filter.key], filter.type);

				case dataTypes.STRING:
				default:
					return this.stringFilterFn(filter.key && item[filter.key] || Object.values(item).join('@@@'), filter.type || filterTypes.STRING.CONTAINING, filter.value);
			}
		});
	}

	numberFilterFn(value, filterType, filterValue) {
		const filters = filterTypes[dataTypes.NUMBER];

		switch (filterType) {
			case filters.LESS_THAN:
				return value < filterValue;

			case filters.GREATER_THAN:
				return value > filterValue;

			case filters.EQUALS:
				return value === filterValue;

			case filters.NOT_EQUALS:
				return value !== filterValue;
		}
	}

	stringFilterFn(value, filterType, filterValue) {
		const filters = filterTypes[dataTypes.STRING];

		switch (filterType) {
			case filters.EQUALS:
				return value === filterValue;

			case filters.NOT_EQUALS:
				return value !== filterValue;

			case filters.CONTAINING:
				return value.includes(filterValue);

			case filters.NOT_CONTAINING:
				return !value.includes(filterValue);
		}
	}

	dateFilterFn(value, filterType) {
		const filters = filterTypes[dataTypes.DATE];
		const today = moment();

		switch (filterType) {
			case filters.TODAY:
				return moment(value).format('YYYY-MM-DD') === today.format('YYYY-MM-DD');

			case filters.THIS_WEEK:
				return moment(value).format('YYYY-w') === today.format('YYYY-w');

			case filters.THIS_MONTH:
				return moment(value).format('YYYY-MM') === today.format('YYYY-MM');

			case filters.THIS_YEAR:
				return moment(value).format('YYYY') === today.format('YYYY');

			case filters.OLDER:
				return moment(value).year() < today.year();
		}
	}
}

export default new FilterService();