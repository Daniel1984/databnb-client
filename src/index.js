import React from 'react';
import bugsnag from 'bugsnag-js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Profile from './pages/Profile/Profile';
import Billing from './pages/Billing/Billing';
import Reports from './pages/Reports/Reports';
import ForOfor from './pages/ForOfor/ForOfor';
import RegistrationThankYou from './pages/RegistrationThankYou/RegistrationThankYou';

const client = bugsnag('48900f3e09cc8859e1e9220b2439f97a');

const Metabnb = () => (
  <Router>
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/reset-password' component={ResetPassword} />
      <Route path='/thank-you' component={RegistrationThankYou} />
      <Route path='/change-password' component={ChangePassword} />
      <Route path='/settings' component={Profile} />
      {/* https://reacttraining.com/react-router/web/example/basic */}
      {/* <Route path='/settings/billing' component={Billing} />
      <Route path='/settings/reports' component={Reports} /> */}
      <Route component={ForOfor} />
    </Switch>
	</Router>
);

render(<Metabnb />, document.querySelector('.metabnb-container'));
