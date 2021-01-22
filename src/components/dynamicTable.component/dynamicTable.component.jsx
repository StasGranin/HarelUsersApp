"use strict";

import React, {useState, useEffect} from 'react';

import FilterModal from '../filterModal.component/filterModal.component.jsx';
import FilterService, {Filters} from '../../services/filter.service';
import SortService, {sortDirections} from '../../services/sort.service';
import {texts} from '../../services/language.service';

import './dynamicTable.component.scss';

const updateTableData = (tableData, filters, sortingProps) => {
	filters.forEach(filter => {
		tableData = FilterService.filterArray(tableData, filter)
	});

	tableData = SortService.sortArray(tableData, sortingProps.key, sortingProps.direction);

	return tableData;
};

const determineSortDirection = (key, sortingProps) => {
	if (key === sortingProps.key) {
		return sortingProps.direction === sortDirections.ASC ? sortDirections.DESC : sortDirections.ASC;
	}

	return sortingProps.direction || sortDirections.DESC;
};

const determineSortButtonClassName = (key, sortingProps) => {
	const sortClass = sortingProps.direction === sortDirections.ASC ? 'asc' : 'desc';

	if (key === sortingProps.key) {
		return `${sortClass} current`;
	}

	return sortClass;
};

const updateColumnFilter = (filter, filters) => {
	const existingFilterIndex = filters.findIndex(item => item.key === filter.key);

	if (filter.value === '') {
		if (existingFilterIndex !== -1) {
			filters.splice(existingFilterIndex, 1);
		}
	}
	else {
		if (existingFilterIndex !== -1) {
			filters[existingFilterIndex] = filter;
		}
		else {
			filters.push(filter);
		}
	}

	return filters;
};

const getFilterByKey = (key, filters) => filters.find(item => item.key === key);

//{key: 'id', label: 'ID', dataType: 'NUMBER', type: 'LESS_THAN', value: 10}, {key: 'lastName', label: 'Last Name', dataType: 'STRING', type: 'CONTAINING', value: 'a'}

export default ({tableColumns, tableData, onItemClick}) => {

	const [filteredTableData, setFilteredTableData] = useState([]);
	const [sortingProps, setSortingProps] = useState({});
	const [filters, setFilters] = useState([]);
	const [columnFilterModalProps, setColumnFilterModalProps] = useState({});

	const openColumnFilterModal = column => setColumnFilterModalProps({show: true, column, currentFilter: getFilterByKey(column.key, filters)});
	const sortColumn = key => setSortingProps({key, direction: determineSortDirection(key, sortingProps)});
	const applyColumnFilter = filter => {
		filter && setFilters([...updateColumnFilter(filter, filters)]);
		setColumnFilterModalProps({show: false});
	};

	useEffect(() => setFilteredTableData([...updateTableData(tableData, filters, sortingProps)]), [tableData, filters, sortingProps]);


	return (
		<div className="dynamicTable">
			{filters.length && <div className="filtersTags innerPanel">
				<div>{texts.filters.FILTERS}:</div>
				{filters.map(filter => <div className="tag" key={filter.key}>
					<div className="label">
						<span>{filter.label}: </span>
						{filter.type &&
							<span>
								{texts.filters.filterTypes[filter.dataType][filter.type]} "<b>{filter.value}</b>"
							</span> ||
							<span>
								<b>{texts.filters.filterTypes[filter.dataType][filter.value]}</b>
							</span>
						}
						</div>
					<div className="x" onClick={()=> applyColumnFilter({...filter, value: ''})}></div>
				</div>)}
			</div> || <></>}

			<table>
				<thead>
					<tr>
						{tableColumns.map(column => <th key={column.key}>
							<div className="content">
								<div className="label">{column.label}</div>
								<div className="actions">
									<div
										className={`actionButton sort ${determineSortButtonClassName(column.key, sortingProps)}`}
										onClick={() => sortColumn(column.key)} />
									<div className="actionButton filter" onClick={(event) => openColumnFilterModal(column)}></div>
								</div>
							</div>
						</th>)}
					</tr>
				</thead>
				<tbody>
					{filteredTableData.map((item, index) => <tr className="tableItemRow" key={index} onClick={()=>onItemClick(item)}>
						{tableColumns.map(column => <td key={`${column.key}.${index}`}>
							{column.dataFormat && typeof column.dataFormat === 'function' && column.dataFormat(item[column.key]) || item[column.key]}
						</td>)}
					</tr>)}
				</tbody>
			</table>
			{columnFilterModalProps.show && <FilterModal {...columnFilterModalProps} onApplyFilter={applyColumnFilter} />}
		</div>
	);
};