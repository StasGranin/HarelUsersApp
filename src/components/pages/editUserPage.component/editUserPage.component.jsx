"use strict";

import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

import {texts} from '../../../services/language.service';
import {validationTypes, fieldTypes} from '../../../services/validation.service';
import UsersService from '../../../services/users.service';
import {setUserDetails} from '../../../actions/users.actions';

import DynamicForm from '../../dynamicForm.component/dynamicForm.component.jsx';

import './editUserPage.component.scss';

const userFormFields = [
	{
		key: 'firstName',
		label: texts.editUserForm.labels.FIRST_NAME,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.editUserForm.validationErrors.FIRST_NAME_EMPTY
		}]
	},
	{
		key: 'lastName',
		label: texts.editUserForm.labels.LAST_NAME,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.editUserForm.validationErrors.LAST_NAME_EMPTY
		}]
	},
	{
		key: 'email',
		label: texts.editUserForm.labels.EMAIL,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.editUserForm.validationErrors.EMAIL_EMPTY
		}, {
			type: validationTypes.PATTERN,
			pattern: /^[0-9a-z\-._]+@[0-9a-z\-_]+\.[a-z]{2,}$/i,
			errorMessage: texts.editUserForm.validationErrors.EMAIL_INVALID
		}]
	},
	{
		key: 'date',
		label: texts.editUserForm.labels.DATE,
		type: fieldTypes.DATE,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.editUserForm.validationErrors.DATE_EMPTY}]
	},
	{
		key: 'phone',
		label: texts.editUserForm.labels.PHONE,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.editUserForm.validationErrors.PHONE_EMPTY}]
	},
	{
		key: 'account',
		label: texts.editUserForm.labels.ACCOUNT,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.editUserForm.validationErrors.ACCOUNT_EMPTY}]
	},
	{
		key: 'accountName',
		label: texts.editUserForm.labels.ACCOUNT_NAME,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.editUserForm.validationErrors.ACCOUNT_NAME_EMPTY
		}]
	},
];


const UserEditPage = ({match, history, setUserDetails}) => {

	const userId = match.params.userId;
	const [user, setUser] = useState();

	const saveUser = (values) => setUserDetails(userId, values).then(backToUsersPage);
	const backToUsersPage = () => history.push('/');

	useEffect(() => {
		if (userId) {
			UsersService.getUser(userId).then(result => {
				result.date = moment(result.date).format('YYYY-MM-DD');
				setUser(result);
			})
		}
	}, []);

	return (
		<div className="editUserPage">
			{user && <>
			<div className="pageTitle">{texts.pageHeaders.EDIT_USER} {user.firstName} {user.lastName}</div>
			<div className="panel">
				<DynamicForm
					formFields={userFormFields}
					values={user}
					onSubmit={saveUser}
					onCancel={backToUsersPage}
					submitLabel={texts.buttonLabels.SAVE}
				/>
			</div>
			</> || <div className="pageTitle">{texts.pageHeaders.LOADING}</div>}
		</div>
	);
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({setUserDetails}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEditPage));
