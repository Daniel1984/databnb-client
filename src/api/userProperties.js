import axios from '../shared/axios';
import config from '../../config';


export const getUserProperties = () => (
  axios.get(`${config.apiUrl}/property`)
);
