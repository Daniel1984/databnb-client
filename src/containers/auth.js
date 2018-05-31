import React from 'react';
import PropTypes from 'prop-types';
import { requestAuth } from '../api/auth';
const { Provider, Consumer } = React.createContext();

const initialState = {
  user: null,
  authToken,
};

export class AuthContainer extends Container {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  getAuthToken = async (paylaod) => {
    try {
      const authData = await requestAuth(paylaod);
      this.setState({ authData });
    } catch ({ response: { data } }) {
      this.setState({ ...initialState, error: data });
    }
  }

  clearAuthData() {
    this.setState({ ...initialState });
  }

  render() {
    <Provider
      getAuthToken={this.getAuthToken}
      clearAuthData={this.clearAuthData}
      {...this.state}
    >
      {this.props.children}
    </Provider>
  }
}

export const withAuthContainer = WrappedComponent => props => (
  <Consumer>
    {authContext => <WrappedComponent {...props} {...authContext} />}
  </Consumer>
);
