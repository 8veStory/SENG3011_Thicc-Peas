import { Switch, Route, withRouter, useHistory } from 'react-router-dom';
import React from 'react';

import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import SideMenu from '../../components/SideMenu/SideMenu';

import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import ClinicPage from '../ClinicDashboardPage/ClinicDashboardPage';
import CheckSymptomsPage from '../CheckSymptomsPage/CheckSymptomsPage';

/**
 * The main React component that links to the others.
 */
export default function App(props) {
    console.log(useHistory);
    let history = useHistory();
    console.log(history);

    return (
        <div className="App">
            <NavBar />
            <SideMenu />
            <Switch>
                <Route path='/' exact component={withRouter(HomePage)} />
                <Route path='/signup' exact component={withRouter(SignUpPage)} />
                <Route path='/login' exact component={withRouter(LoginPage)} />
                <Route path='/clinic' exact component={withRouter(ClinicPage)} />
                <Route path='/check' exact component={withRouter(CheckSymptomsPage)} />
            </Switch>
        </div>
    );
}