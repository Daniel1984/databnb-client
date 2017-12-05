const DEFAULT_ENV = 'local';

export default {
  local: {
    apiUrl: 'http://localhost:3030',
  },
  production: {
    apiUrl: 'https://api.metabnb.com',
  },
}[process.env.HOSTMAKER_ENV || DEFAULT_ENV];
