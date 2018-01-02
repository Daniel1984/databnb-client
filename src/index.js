import bugsnag from 'bugsnag-js'
import { h, render } from 'preact';
import App from './components/App/App';

const client = bugsnag('48900f3e09cc8859e1e9220b2439f97a');

render(<App />, document.body);
