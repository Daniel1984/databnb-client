import config from '../../config';

const isSuccessfulStatusCode = code => code >= 200 && code < 400;

function fetchApi({ path }) {
  return fetch(`${config.apiUrl}/${path}`)
    .then((response) => {
      if (!isSuccessfulStatusCode(response.status)) {
        return Promise.reject(new Error(`server responded with ${response.status} ${response.statusText}`));
      }

      return response.json().then(json => json);
    });
}
