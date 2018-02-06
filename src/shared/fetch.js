import config from '../../config';

const isSuccessfulStatusCode = code => code >= 200 && code < 400;

export default function fetch(url, props = {}) {
  let { body = null, headers, ...rest } = props;

  if (body) {
    headers = { ...headers, 'Content-Type': 'application/json' };
    body = JSON.stringify(body)
  }

  const config = {
    mode: 'cors',
    ...rest,
    headers,
    body,
  };

  return window.fetch(url, config).then((response) => {
    return new Promise((resolve, reject) => {
      response.json().then((json) => {
        isSuccessfulStatusCode(response.status) ? resolve(json) : reject(json);
      });
    });
  });
}

