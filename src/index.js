import React from 'react';
import bugsnag from 'bugsnag-js';
import 'reset-css'; // eslint-disable-line
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import socketio from './shared/socket';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ChangePassword from './components/ChangePassword/ChangePassword';
import FourOfour from './components/FourOfour/FourOfour';
import RegistrationThankYou from './components/RegistrationThankYou/RegistrationThankYou';
import Settings from './components/Settings/Settings';
// import Property from './components/Property/Property';
import { AuthProvider } from './containers/Auth';
import './index.scss';

// bugsnag('48900f3e09cc8859e1e9220b2439f97a');
socketio.init();

const Metabnb = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/thank-you" component={RegistrationThankYou} />
        <Route path="/change-password" component={ChangePassword} />
        <Route path="/settings" component={Settings} />
        {/* <Route path="/property/:propertyId" component={Property} /> */}
        {/* https://reacttraining.com/react-router/web/example/basic */}
        {/* <Route path="/settings/billing" component={Billing} />
        <Route path="/settings/reports" component={Reports} /> */}
        <Route component={FourOfour} />
      </Switch>
    </AuthProvider>
  </Router>
);

render(<Metabnb />, document.querySelector('.metabnb-container'));
