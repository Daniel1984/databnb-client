import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((instance) => {
  const token = localStorage.getItem('auth-token');

  if (token) {
    instance.headers['x-access-token'] = token;
  }

  if (['post', 'put'].indexOf(instance.method) !== -1) {
    instance.headers['Content-Type'] = 'application/json';
  }

  return instance;
});

export default axiosInstance;
