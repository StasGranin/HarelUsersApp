'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/index';

import PrivateRoute from './components/privateRoute.component/privateRoute.component.jsx';
import MainPage from './components/pages/mainPage.component/mainPage.component.jsx';
import LoginPage from './components/pages/loginPage.component/loginPage.component.jsx';
import EditUserPage from './components/pages/editUserPage.component/editUserPage.component.jsx';

import './app.scss';


const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const Routes = (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={LoginPage} exact/>
				<PrivateRoute path="/" component={MainPage} exact/>
				<PrivateRoute path="/edit/:userId" component={EditUserPage} exact/>
			</Switch>
		</BrowserRouter>
	</Provider>
);

render(
	Routes, document.getElementById('app')
);