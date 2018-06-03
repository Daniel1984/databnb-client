import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserProperties, getUserProperty } from '../api/userProperties';

const { Provider, Consumer } = React.createContext();

const initialState = {
  properties: [],
  selectedProperty: null,
  error: '',
  isLoading: false,
};

export class PropertiesProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  componentDidMount() {
    this.loadUserProperties();
  }

  getPropertyById = async (id) => {
    this.setState({
      isLoading: true,
      error: '',
    });

    try {
      const { data } = await getUserProperty(id);
      this.setState({
        selectedProperty: data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Oops. Something went wrong. Try again later',
        isLoading: false,
        selectedProperty: null,
      });
    }
  }

  loadUserProperties = async () => {
    this.setState({
      isLoading: true,
      error: '',
    });

    try {
      const { data } = await getUserProperties();
      this.setState({
        properties: data,
        isLoading: false,
        error: '',
      });
    } catch (error) {
      this.setState({
        error: 'Oops. Something went wrong. Try again later',
        isLoading: false,
        properties: [],
      });
    }
  }

  render() {
    return (
      <Provider
        value={{
          loadUserProperties: this.loadUserProperties,
          getPropertyById: this.getPropertyById,
          ...this.state,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const withPropertiesContainer = WrappedComponent => props => (
  <Consumer>
    {context => <WrappedComponent {...props} {...context} />}
  </Consumer>
);
