import bugsnag from 'bugsnag-js'
import { h, render } from 'preact';
import Router from 'preact-router';
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

const Main = () => (
	<Router>
		<Landing path="/" />
		<Login path="/login/:q?" />
		<SignUp path="/signup" />
		<ResetPassword path="/reset-password" />
    <RegistrationThankYou path="/thank-you/:q?" />
    <ChangePassword path="/change-password/:q?" />
    <Profile path="/settings/profile" to="/login" />
    <Billing path="/settings/billing" to="/login" />
    <Reports path="/settings/reports" to="/login" />
    <ForOfor default />
	</Router>
);

render(<Main />, document.body);
