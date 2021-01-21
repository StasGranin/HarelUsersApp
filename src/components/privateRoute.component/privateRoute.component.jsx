'use strict';

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) =>
	(<Route {...rest} render={props => (isLoggedIn === true ? <Component {...props} /> : <Redirect to="/login" />)} />);

const mapStateToProps = state => ({isLoggedIn: state.auth.isLoggedIn});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
