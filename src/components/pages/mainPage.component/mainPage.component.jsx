"use strict";

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from "react-router-dom";
import moment from 'moment';
import DynamicTable from '../../dynamicTable.component/dynamicTable.component.jsx';
import {getUsers} from '../../../actions/users.actions';
import FilterService, {dataTypes} from '../../../services/filter.service';
import {texts} from '../../../services/language.service';

import './mainPage.component.scss';

const usersTableColumns = [
	{key: 'id', dataType: dataTypes.NUMBER, label: texts.usersTableColumnLabels.ID},
	{key: 'firstName', dataType: dataTypes.STRING, label: texts.usersTableColumnLabels.FIRST_NAME},
	{key: 'lastName', dataType: dataTypes.STRING, label: texts.usersTableColumnLabels.LAST_NAME},
	{key: 'date', dataType: dataTypes.DATE, label: texts.usersTableColumnLabels.DATE, dataFormat: data => moment(data).format('DD/MM/YYYY')},
	{key: 'phone', dataType: dataTypes.STRING, label: texts.usersTableColumnLabels.PHONE},
];

const MainPage = ({users, isLoaded, getUsers, history}) => {

	const [filteredUsers, setFilteredUsers] = useState([]);
	const [filter, setFilter] = useState(FilterService.createEmptyFilter({dataType: dataTypes.STRING}));
	const handleTableRowClick = userId => history.push(`edit/${userId}`);
	const handleFilterChange = (event) => setFilter({...setFilter, value: event.target.value});
	const filterUsers = () => setFilteredUsers([...FilterService.filterArray(users, filter)]);

	useEffect(() => {getUsers()}, []);
	useEffect(() => filterUsers(), [users, filter]);

	return (
		<div className="mainPage">
			{isLoaded && <>
				<div className="pageTitle">{texts.pageHeaders.MAIN_PAGE}</div>
				<div className="panel globalFilterBox">
					<input name="globalFilter" placeholder={texts.filters.FILTER} value={filter.value} onChange={handleFilterChange} />
				</div>
				<div className="panel usersTable">
					<DynamicTable tableColumns={usersTableColumns} tableData={filteredUsers} onRowClick={handleTableRowClick} />
				</div>
			</> || <div className="pageTitle">{texts.pageHeaders.LOADING}</div>}
		</div>
	);
};

const mapStateToProps = state => ({users: state.users.users, isLoaded: state.users.isLoaded});
const mapDispatchToProps = dispatch => bindActionCreators({getUsers}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
