"use strict";

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {login} from '../../../actions/auth.actions';

import './loginPage.component.scss';



const LoginPage = ({isLoggedIn, login}) => {

	const loginButtonOnClick = () => {

		login({});
	};

	return (
		<div className="loginPage">
			<div>Is logged in: {isLoggedIn}</div>

			<button onClick={loginButtonOnClick}>Login</button>

		</div>
	);
};

const mapStateToProps = state => ({isLoggedIn: state.auth.isLoggedIn});
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
