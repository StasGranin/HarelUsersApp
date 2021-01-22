"use strict";

import React from 'react';

import {dataTypes, filterTypes} from '../../../services/filter.service';
import {texts} from '../../../services/language.service';

export default ({filter, onChange}) => {

	return (
		<>
			<select className="longInput" name="value" value={filter.value} onChange={onChange}>
				<option value="">{texts.filters.filterTypes[dataTypes.DATE].ALL}</option>
				<option value={filterTypes[dataTypes.DATE].TODAY}>{texts.filters.filterTypes[dataTypes.DATE].TODAY}</option>
				<option value={filterTypes[dataTypes.DATE].THIS_WEEK}>{texts.filters.filterTypes[dataTypes.DATE].THIS_WEEK}</option>
				<option value={filterTypes[dataTypes.DATE].THIS_MONTH}>{texts.filters.filterTypes[dataTypes.DATE].THIS_MONTH}</option>
				<option value={filterTypes[dataTypes.DATE].THIS_YEAR}>{texts.filters.filterTypes[dataTypes.DATE].THIS_YEAR}</option>
				<option value={filterTypes[dataTypes.DATE].OLDER}>{texts.filters.filterTypes[dataTypes.DATE].OLDER}</option>
			</select>
		</>
	);
};