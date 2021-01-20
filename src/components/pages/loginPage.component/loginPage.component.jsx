"use strict";

import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {login} from '../../../actions/auth.actions';

import './addCityPage.component.scss';



const LoginPage = ({isLoggedIn, login}) => {


	return (
		<div className="loginPage">
			<div>Is logged in: {isLoggedIn}</div>

			<button onClick={login}></button>

		</div>
	);
};

const mapStateToProps = state => ({isLoggedIn: state.auth.isLoggedIn});
const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
