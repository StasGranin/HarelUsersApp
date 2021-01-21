'use strict';

export const sortDirections = {ASC: 'ASC', DESC: 'DESC'};

class SortService {
	sortArray(arr, key, direction) {
		return arr.sort((a, b) => {
			const aValue = a[key];
			const bValue = b[key];

			switch (direction) {
				case sortDirections.ASC:
					return aValue > bValue ? -1 : 1;
				case sortDirections.DESC:
					return aValue < bValue ? -1 : 1;
				default:
					return 0;
			}
		});
	}
}

export default new SortService();
