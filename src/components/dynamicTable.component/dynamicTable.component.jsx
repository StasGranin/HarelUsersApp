"use strict";

import React, {useState, useEffect} from 'react';

import FilterService, {Filters} from '../../services/filter.service';
import SortService, {sortDirections} from '../../services/sort.service';

import './dynamicTable.component.scss';


const filters = new Filters([
	{key: 'id', label: 'ID: Less than 1', dataType: 'NUMBER', type: 'LESS_THAN', value: 10},
	{key: 'lastName', label: 'Last name: Containing "a"', dataType: 'STRING', type: 'CONTAINING', value: 'a'}
]);

const updateTableData = (tableData, filterProps, sortingProps) => {
	filterProps.items.forEach(filter => {
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

export default ({headers, tableData, onItemClick}) => {

	const [filteredTableData, setFilteredTableData] = useState([]);
	const [sortingProps, setSortingProps] = useState({});
	const [filterProps, setFilterProps] = useState(filters.getFilters());
	const removeFilter = filter => setFilterProps({...filters.removeFilter(filter)});
	const sort = key => setSortingProps({key, direction: determineSortDirection(key, sortingProps)});

	useEffect(() => setFilteredTableData([...updateTableData(tableData, filterProps, sortingProps)]), [tableData, filterProps, sortingProps]);

	return (
		<div className="dynamicTable">
			{filterProps.count && <div className="filtersTags">
				<div>Filters:</div>
				{filterProps.items.map(filter => <div className="tag" key={filter.key}>
					<div className="label">{filter.label}</div>
					<div className="x" onClick={()=> removeFilter(filter)}></div>
				</div>)}
			</div> || <></>}

			<table>
				<thead>
					<tr>
						{headers.map(header => <th key={header.key}>
							<div className="content">
								<div className="label">{header.label}</div>
								<div className="actions">
									<div
										className={`button sort ${determineSortButtonClassName(header.key, sortingProps)}`}
										onClick={() => sort(header.key)} />
									<div className="button filter"></div>
								</div>
							</div>
						</th>)}
					</tr>
				</thead>
				<tbody>
					{filteredTableData.map((item, index) => <tr className="tableItemRow" key={index} onClick={()=>onItemClick(item)}>
						{headers.map(header => <td key={`${header.key}.${index}`}>
							{header.dataFormat && typeof header.dataFormat === 'function' && header.dataFormat(item[header.key]) || item[header.key]}
						</td>)}
					</tr>)}
				</tbody>
			</table>
		</div>
	);
};