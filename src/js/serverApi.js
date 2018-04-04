import { serverApi } from './config';
import Http from './Http';

const httpApi = Http(serverApi);

export const fetchStatus = async (key) => {
  const response = await httpApi.get('/status', {
    params: {
      code: key,
    },
  });
  return response.data;

  // return {
  //   url: 'https://s3.amazonaws.com/star-wars-intros/AL6yNfOxCGkHKBUi54xp.mp4',
  // };

  // if (key === 'x') {
  //   return { queue: 300 };
  // }

  // return { queue: 30 };
};

export const requestDownload = async (key, email) => {
  const response = await httpApi.get('/request', {
    params: {
      code: key,
      email,
    },
  });
  return response.data;

  // return { queue: 200 };
};
