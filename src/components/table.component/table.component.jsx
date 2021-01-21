"use strict";

import React, {useState, useEffect} from 'react';

import {dataTypes} from '../../services/filter.service';

import './table.component.scss';



export default ({headers, data, onItemClick}) => {



	return (
		<table className="table">
			<thead>
				<tr className="tableHeader">
					{headers.map(header => <th key={header.key}>{header.label}</th>)}
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => <tr className="tableItem" key={index} onClick={()=>onItemClick(item)}>
					{headers.map(header => <td key={`${header.key}.${index}`}>{item[header.key]}</td>)}
				</tr>)}
			</tbody>
		</table>
	);
};