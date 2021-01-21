"use strict";

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import DynamicTable from '../../dynamicTable.component/dynamicTable.component.jsx';
import {getUsers} from '../../../actions/users.actions';
import {dataTypes} from '../../../services/filter.service';

import './mainPage.component.scss';


const MainPage = ({users, getUsers}) => {

	const usersTableHeaders = [
		{key: 'id', dataType: dataTypes.NUMBER, label: 'ID'},
		{key: 'firstName', dataType: dataTypes.STRING, label: 'First Name'},
		{key: 'lastName', dataType: dataTypes.STRING, label: 'Last Name'},
		{key: 'date', dataType: dataTypes.DATE, label: 'Date', dataFormat: data => moment(data).format('DD/MM/YYYY')},
		{key: 'phone', dataType: dataTypes.NUMBER, label: 'Phone'},
	];

	useEffect(()=> {getUsers()}, []);

	return (
		<div className="mainPage">
			<div className="panel globalFilterBox">

			</div>

			<div className="panel usersTable">
				<DynamicTable headers={usersTableHeaders} tableData={users} />
			</div>

		</div>
	);
};

const mapStateToProps = state => ({users: state.users.users});
const mapDispatchToProps = dispatch => bindActionCreators({getUsers}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
