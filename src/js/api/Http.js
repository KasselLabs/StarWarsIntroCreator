import axios from 'axios';
import Counter from './Counter';

const REQUEST_TIMEOUT = 20000;
const MAX_TRIES = 3;

const Tries = new Counter(MAX_TRIES);

const _successInterceptor = res => res;

const _sendRavenNotification = (errorData) => {
  Raven.captureException(new Error(JSON.stringify(errorData)));
};

const _retryLastRequest = ({ config }) => {
  const options = {
    method: config.method,
    url: config.url,
    data: config.data ? JSON.parse(config.data) : null,
    params: config.params,
  };

  return Http().request(options)
    .then((response) => {
      Tries.reset();
      return response;
    });
};

const _errorInterceptor = (error) => {
  if (Tries.isMaxValue()) {
    Tries.reset();
    Raven.captureBreadcrumb({
      message: `Error on request. Error code: ${error.code}`,
      level: 'error',
      data: {
        response: error.response,
      },
    });

    _sendRavenNotification(error);
    throw error;
  }

  Tries.increment();
  return _retryLastRequest(error);
};

function Http(baseURL) {
  const http = axios.create({
    baseURL,
    timeout: REQUEST_TIMEOUT,
  });
  http.interceptors.response.use(_successInterceptor, _errorInterceptor);

  return http;
}

export default Http;
