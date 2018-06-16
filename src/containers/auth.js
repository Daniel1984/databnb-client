import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { login, getProfile } from '../api/user';

const { Provider, Consumer } = React.createContext();

const initialState = {
  user: null,
};

export class AuthProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  componentDidMount() {
    if (this.isAuthenticated()) {
      this.getProfile();
    } else if (!(/login/gi).test(window.location.href) && window.location.pathname !== '/') {
      window.location.href = '/login';
    }
  }

  getAuthToken = async (paylaod) => {
    try {
      const { data: { token } } = await login(paylaod);
      localStorage.setItem('auth-token', token);
      this.getProfile();
    } catch (error) {
      throw error;
    }
  }

  getProfile = async () => {
    try {
      const { data: user } = await getProfile();
      this.setState({ user });
    } catch (error) {
      this.clearAuthData();
    }
  }

  isAuthenticated = () => (
    !!localStorage.getItem('auth-token')
  )

  clearAuthData = () => {
    localStorage.removeItem('auth-token');
    this.setState({ user: null });
  }

  render() {
    return (
      <Provider
        value={{
          getProfile: this.getProfile,
          updateProfile: this.updateProfile,
          getAuthToken: this.getAuthToken,
          clearAuthData: this.clearAuthData,
          isAuthenticated: this.isAuthenticated,
          ...this.state,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const withAuthContainer = WrappedComponent => props => (
  <Consumer>
    {authContext => <WrappedComponent {...props} {...authContext} />}
  </Consumer>
);
