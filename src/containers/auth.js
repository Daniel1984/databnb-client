import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { login, getProfile, updateProfile } from '../api/auth';

const { Provider, Consumer } = React.createContext();

const initialState = {
  user: null,
  error: null,
};

export class AuthProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  componentDidMount() {
    if (this.isAuthenticated()) {
      this.getProfile();
    }
  }

  getAuthToken = async (paylaod) => {
    try {
      const { data: { token } } = await login(paylaod);
      sessionStorage.setItem('auth-token', token);
    } catch (error) {
      throw error;
    }
  }

  getProfile = async () => {
    this.setState({ error: false });
    try {
      const { data: user } = await getProfile();
      this.setState({ user });
    } catch (error) {
      this.setState({ error: true });
    }
  }

  isAuthenticated = () => (
    !!sessionStorage.getItem('auth-token')
  )

  clearAuthData = () => {
    sessionStorage.removeItem('auth-token');
  }

  updateProfile = async (payload) => {
    this.setState({ error: false });
    try {
      await updateProfile(payload);
    } catch (error) {
      this.setState({ error: true });
    }
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
