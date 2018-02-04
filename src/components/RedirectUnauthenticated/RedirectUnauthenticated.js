import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class RedirectUnauthenticated extends Component {
  componentWillMount() {
    const authToken = sessionStorage.getItem('auth-token');

    if (!authToken) {
      route(this.props.to, true);
    }
  }

  render() {
    return null;
  }
}
