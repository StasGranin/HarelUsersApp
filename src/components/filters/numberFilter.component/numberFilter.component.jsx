"use strict";

import React from 'react';

import {dataTypes, filterTypes} from '../../../services/filter.service';
import {texts} from '../../../services/language.service';

export default ({filter, onChange}) => {

	const preventNonNumericValue = (event) => {
		if (/\d/.test(event.key)) {
			return;
		}
		else if (/\./.test(event.key) && !/\./.test(event.target.value)) {
			return;
		}

		event.preventDefault();
	};


	return (
		<>
			<select name="type" value={filter.type} onChange={onChange}>
				<option value={filterTypes[dataTypes.NUMBER].EQUALS}>{texts.filters.filterTypes[dataTypes.NUMBER].EQUALS}</option>
				<option value={filterTypes[dataTypes.NUMBER].NOT_EQUALS}>{texts.filters.filterTypes[dataTypes.NUMBER].NOT_EQUALS}</option>
				<option value={filterTypes[dataTypes.NUMBER].LESS_THAN}>{texts.filters.filterTypes[dataTypes.NUMBER].LESS_THAN}</option>
				<option value={filterTypes[dataTypes.NUMBER].GREATER_THAN}>{texts.filters.filterTypes[dataTypes.NUMBER].GREATER_THAN}</option>
			</select>
			<input className="longInput" name="value" value={filter.value} onChange={onChange} onKeyPress={preventNonNumericValue}/>
		</>
	);
};