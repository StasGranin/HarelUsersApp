'use strict';

export const sortDirection = {ASC: 'ASC', DESC: 'DESC'};

class SortService {
	sortArray(arr, key, direction) {
		return arr.sort((a, b) => {
			const aValue = a[key];
			const bValue = b[key];

			if (direction === sortDirection.ASC) {
				return aValue < bValue ? -1 : 1
			}
			else {
				return aValue > bValue ? -1 : 1
			}
		});
	}
}

export default new SortService();
