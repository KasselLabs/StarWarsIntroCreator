import { serverApi } from '../config';
import Http from './Http';

const httpApi = Http(serverApi);

export const fetchStatus = async (key) => {
  // return { queue: 30 };
  const response = await httpApi.get('/status', {
    params: {
      code: key,
    },
  });

  // return response.data;

  const randq = 7400 + Math.floor(Math.random() * 50);
  return {
    ...response.data,
    queueSize: randq,
    queuePosition: randq + 1,
  };

  // return {
  //   url: 'https://s3.amazonaws.com/star-wars-intros/AL6yNfOxCGkHKBUi54xp.mp4',
  // };

  // if (key === 'x') {
  //   return { queue: 300 };
  // }
};

export const requestDownload = async (key, email) => {
  // return { queue: 200 };
  const response = await httpApi.get('/request', {
    params: {
      code: key,
      email,
    },
  });
  return response.data;
};
