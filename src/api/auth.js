import axios from '../shared/axios';
import config from '../../config';

export const login = ({ email, password }) => (
  axios.post(`${config.apiUrl}/login`, { email, password })
);

export const getProfile = () => (
  axios.get(`${config.apiUrl}/me`)
);

export const updateProfile = payload => (
  axios.put(`${config.apiUrl}/me/${payload._id}`, payload)
);
