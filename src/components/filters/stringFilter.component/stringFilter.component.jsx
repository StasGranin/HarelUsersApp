"use strict";

import React from 'react';

import {dataTypes, filterTypes} from '../../../services/filter.service';
import {texts} from '../../../services/language.service';

export default ({filter, onChange}) => {

	return (
		<>
			<select name="type" value={filter.type} onChange={onChange}>
				<option value={filterTypes[dataTypes.STRING].EQUALS}>{texts.filters.filterTypes[dataTypes.STRING].EQUALS}</option>
				<option value={filterTypes[dataTypes.STRING].NOT_EQUALS}>{texts.filters.filterTypes[dataTypes.STRING].NOT_EQUALS}</option>
				<option value={filterTypes[dataTypes.STRING].CONTAINING}>{texts.filters.filterTypes[dataTypes.STRING].CONTAINING}</option>
				<option value={filterTypes[dataTypes.STRING].NOT_CONTAINING}>{texts.filters.filterTypes[dataTypes.STRING].NOT_CONTAINING}</option>
			</select>
			<input className="longInput" name="value" value={filter.value} onChange={onChange}/>
		</>
	);
};