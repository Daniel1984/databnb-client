import bugsnag from 'bugsnag-js'
import { h, render } from 'preact';
import Router from 'preact-router';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';

const client = bugsnag('48900f3e09cc8859e1e9220b2439f97a');

const Main = () => (
	<Router>
		<Landing path="/" />
		<Login path="/login" />
	</Router>
);

render(<Main />, document.body);
