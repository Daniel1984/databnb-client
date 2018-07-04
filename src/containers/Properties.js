import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socket from '../shared/socket';
import { getUserProperties, getUserProperty, removeUserFromProperty } from '../api/userProperties';

const { Provider, Consumer } = React.createContext();

const initialState = {
  properties: [],
  nearbyListings: [],
  selectedProperty: null,
  errorGettingProperties: '',
  errorGettingProperty: '',
  errorDeletingProperty: '',
  isLoadingProperties: false,
  isLoadingProperty: false,
  isDeletingProperty: false,
  loadingPropertyMsg: '',
};

export class PropertiesProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  componentDidMount() {
    socket.get().on('getListings:loadingInfo', ({ msg }) => {
      this.setState({ loadingPropertyMsg: msg });
    });

    socket.get().on('listing', ({ listing }) => {
      this.setState({
        nearbyListings: [...this.state.nearbyListings, ...listing],
      });
    });

    socket.get().on('nearbyListings:done', () => {
      this.state({
        isLoadingProperty: false,
        loadingPropertyMsg: '',
      });
    });
  }

  getPropertyById = async (id) => {
    this.setState({
      isLoadingProperty: true,
      errorGettingProperty: '',
    });

    try {
      const { data: { listing, nearbyListings = [] } } = await getUserProperty(id);

      this.setState({
        nearbyListings,
        isLoadingProperty: !nearbyListings.length,
        selectedProperty: listing,
      });

      if (!nearbyListings.length) {
        const { location_title } = listing;
        socket.get().emit('getNearbyListings', { location_title });
      }
    } catch (error) {
      this.setState({
        errorGettingProperty: 'Oops. Something went wrong. Try again later',
        isLoadingProperty: false,
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
