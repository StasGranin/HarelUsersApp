"use strict";

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import DynamicTable from '../../dynamicTable.component/dynamicTable.component.jsx';
import {getUsers} from '../../../actions/users.actions';
import {dataTypes} from '../../../services/filter.service';
import {texts} from '../../../services/language.service';

import './mainPage.component.scss';


const MainPage = ({users, getUsers}) => {

	const usersTableColumns = [
		{key: 'id', dataType: dataTypes.NUMBER, label: texts.usersTableColumnLabels.ID},
		{key: 'firstName', dataType: dataTypes.STRING, label: texts.usersTableColumnLabels.FIRST_NAME},
		{key: 'lastName', dataType: dataTypes.STRING, label: texts.usersTableColumnLabels.LAST_NAME},
		{key: 'date', dataType: dataTypes.DATE, label: texts.usersTableColumnLabels.DATE, dataFormat: data => moment(data).format('DD/MM/YYYY')},
		{key: 'phone', dataType: dataTypes.STRING, label: texts.usersTableColumnLabels.PHONE},
	];

	useEffect(()=> {getUsers()}, []);

	return (
		<div className="mainPage">
			<div className="panel globalFilterBox">

			</div>

			<div className="panel usersTable">
				<DynamicTable tableColumns={usersTableColumns} tableData={users} />
			</div>

		</div>
	);
};

const mapStateToProps = state => ({users: state.users.users});
const mapDispatchToProps = dispatch => bindActionCreators({getUsers}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
