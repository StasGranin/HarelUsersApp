"use strict";

import React, {useState, useEffect} from 'react';

import StringFilter from '../filters/stringFilter.component/stringFilter.component.jsx';
import NumberFilter from '../filters/numberFilter.component/numberFilter.component.jsx';
import DateFilter from '../filters/dateFilter.component/dateFilter.component.jsx';
import FilterService, {dataTypes} from '../../services/filter.service';
import {texts} from '../../services/language.service';

import './filterModal.component.scss';

export default ({column, currentFilter, onApplyFilter}) => {

	const [filter, setFilter] = useState(currentFilter || FilterService.createEmptyFilter(column));
	const handleFilterChange = (event) => setFilter({...filter, [event.target.name]: event.target.value});
	const closeModal = (event) => event.target === event.currentTarget && onApplyFilter();

	return (
		<div className="modal" onClick={closeModal}>
			<div className="box panel">
				<div className="title">{texts.filters.FILTER_BY}: {column.label}</div>
				<div className="filter innerPanel">
					{column.dataType === dataTypes.STRING && <StringFilter filter={filter} onChange={handleFilterChange} />}
					{column.dataType === dataTypes.NUMBER && <NumberFilter filter={filter} onChange={handleFilterChange} />}
					{column.dataType === dataTypes.DATE && <DateFilter filter={filter} onChange={handleFilterChange} />}
				</div>
				<div className="actions">
					<div className="button" onClick={closeModal}>Cancel</div>
					<div className="button primary" onClick={() => onApplyFilter(filter)}>Apply</div>
				</div>

			</div>
		</div>);
};