import axios from '../shared/axios';
import config from '../../config';

export const getUserProperties = () => (
  axios.get(`${config.apiUrl}/properties`)
);

export const getUserProperty = id => (
  axios.get(`${config.apiUrl}/properties/${id}`)
);

export const removeUserFromProperty = id => (
  axios.put(`${config.apiUrl}/properties/removeUser/${id}`)
);
