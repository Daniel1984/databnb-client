const DEFAULT_ENV = 'local';

export default {
  local: {
    apiUrl: 'http://localhost:3030',
  },
  production: {
    apiUrl: 'https://api.metabnb.com',
  },
}[process.env.NODE_ENV || DEFAULT_ENV];
