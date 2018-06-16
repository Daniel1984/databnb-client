import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserProperties, getUserProperty, removeUserFromProperty } from '../api/userProperties';

const { Provider, Consumer } = React.createContext();

const initialState = {
  properties: [],
  selectedProperty: null,
  errorGettingProperties: '',
  errorGettingProperty: '',
  errorDeletingProperty: '',
  isLoadingProperties: false,
  isLoadingProperty: false,
  isDeletingProperty: false,
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
      isLoadingProperty: false,
      errorGettingProperty: '',
    });

    try {
      const { data } = await getUserProperty(id);
      this.setState({
        selectedProperty: data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        errorGettingProperty: 'Oops. Something went wrong. Try again later',
        isLoading: false,
        selectedProperty: null,
      });
    }
  }

  loadUserProperties = async () => {
    this.setState({
      isLoadingProperties: true,
      errorGettingProperties: '',
    });

    try {
      const { data } = await getUserProperties();
      this.setState({
        properties: data,
        isLoadingProperties: false,
      });
    } catch (error) {
      this.setState({
        errorGettingProperties: 'Oops. Something went wrong. Try again later',
        isLoadingProperties: false,
        properties: [],
      });
    }
  }

  deleteUserProperty = async (id) => {
    this.setState({
      isDeletingProperty: true,
      errorDeletingProperty: '',
    });

    try {
      await removeUserFromProperty(id);
      this.setState({ isDeletingProperty: false });
    } catch (error) {
      this.setState({
        errorDeletingProperty: 'Oops. Something went wrong. Try again later',
        isDeletingProperty: false,
      });
    }
  }

  render() {
    return (
      <Provider
        value={{
          loadUserProperties: this.loadUserProperties,
          getPropertyById: this.getPropertyById,
          deleteUserProperty: this.deleteUserProperty,
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
