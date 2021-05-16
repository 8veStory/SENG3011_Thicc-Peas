import { Switch, Route, withRouter, useHistory } from 'react-router-dom';
import React,{useState} from 'react';

import './App.css';
import '../../common/Shared.css';
import NavBar from '../../components/NavBar/NavBar';

import HomePage from '../HomePage/HomePage';
import HomePagev2 from '../HomePageV2/HomePage';
import ClinicPage from '../ClinicDashboardPage/ClinicDashboardPage';
import CheckSymptomsPage from '../CheckSymptomsPage/CheckSymptomsPage';
import LoginRegisterForm from '../LoginRegisterForm/LoginRegisterForm';
import VaccineFinder from '../VaccineFinder/VaccineFinder';
import BookingPage from '../BookingPage/BookingPage';
import ClinicBookingPage from '../ClinicDashboardPage/ClinicBookingPage';

/**
 * The main React component that links to the others.
 */
export default function App(props) {
    console.log(useHistory);
    let history = useHistory();
    console.log(history);
    const [login_status, set_login_status] = useState(false);
    let LoginRegisterFormWithRouter = withRouter((props) => <LoginRegisterForm {...props} set_login_status={set_login_status}/>);

    return (
        <div className="App">
            {/* <NavBar log_status={login_status} set_login_status={set_login_status}/> */}
            {/* <SideMenu /> */}
            <Switch>
                <Route path='/' exact component={withRouter(HomePage)} />
                <Route path='/homepagev2' exact component={withRouter(HomePagev2)} />
                <Route path='/register' exact component={LoginRegisterFormWithRouter} />
                <Route path='/clinic' exact component={withRouter(ClinicPage)} />
                <Route path='/check' exact component={withRouter(CheckSymptomsPage)} />
                <Route path='/vaccinefinder' exact component={withRouter(VaccineFinder)} />
                <Route path='/book' exact component={withRouter(BookingPage)} />
                <Route path='/booking' exact component={withRouter(ClinicBookingPage)} />
            </Switch>
        </div>
    );
}
