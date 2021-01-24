"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from "react-router-dom";

import {texts} from '../../../services/language.service';
import {validationTypes, fieldTypes} from '../../../services/validation.service';
import {login} from '../../../actions/auth.actions';

import DynamicForm from '../../dynamicForm.component/dynamicForm.component.jsx';

import './loginPage.component.scss';

const loginFormFields = [
	{
		key: 'email',
		label: texts.loginForm.labels.EMAIL,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.loginForm.validationErrors.EMAIL_EMPTY
		}, {
			type: validationTypes.PATTERN,
			pattern: /^[0-9a-z\-._]+@[0-9a-z\-_]+\.[a-z]{2,}$/i,
			errorMessage: texts.loginForm.validationErrors.EMAIL_INVALID
		}]
	},
	{
		key: 'firstName',
		label: texts.loginForm.labels.FIRST_NAME,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.loginForm.validationErrors.FIRST_NAME_EMPTY
		}]
	},
	{
		key: 'lastName',
		label: texts.loginForm.labels.LAST_NAME,
		type: fieldTypes.TEXT,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.loginForm.validationErrors.LAST_NAME_EMPTY}]
	},
	{
		key: 'password',
		label: texts.loginForm.labels.PASSWORD,
		type: fieldTypes.PASSWORD,
		validation: [{
			type: validationTypes.NOT_EMPTY,
			errorMessage: texts.loginForm.validationErrors.PASSWORD_EMPTY
		}]
	},
];

const LoginPage = ({isLoggedIn, login, history}) => {

	const loginButtonOnClick = (loginData) => {
		login(loginData).then((response) => response.token && history.push('/'));
	};

	return (
		<div className="loginPage">
			<div className="pageTitle">{texts.pageHeaders.LOGIN}</div>
			<div className="panel">
				<DynamicForm
					formFields={loginFormFields}
					onSubmit={loginButtonOnClick}
					submitLabel={texts.buttonLabels.LOGIN}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({isLoggedIn: state.auth.isLoggedIn});
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
