import axios from '../shared/axios';
import config from '../../config';


export const getUserProperties = () => (
  axios.get(`${config.apiUrl}/property`)
);

export const getUserProperty = id => (
  axios.get(`${config.apiUrl}/property/${id}`)
);

export const removeUserFromProperty = id => (
  axios.put(`${config.apiUrl}/property/removeUser/${id}`)
);
