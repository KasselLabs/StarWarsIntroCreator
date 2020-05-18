export const defaultOpening = {
  center: false,
  episode: 'Episode IX',
  intro: 'A long time ago in a galaxy far,\nfar away....',
  logo: 'STaR\nwaRS',
  text: 'The dead speak! The galaxy has heard a mysterious broadcast, a threat of REVENGE in the sinister voice of the late EMPEROR PALPATINE.\nGENERAL LEIA ORGANA dispatches secret agents to gather intelligence, while REY, the last hope of the Jedi, trains for battle against the diabolical FIRST ORDER.\nMeanwhile, Supreme Leader KYLO REN rages in search of the phantom Emperor, determined to destroy any threat to his power....',
  title: 'THE RISE OF SKYWALKER',
};

export const defaultKey = 'Episode9';

export const firebases = {
  initial: process.env.FIREBASE_INITIAL,
  A: process.env.FIREBASE_A,
  B: process.env.FIREBASE_B,
  C: process.env.FIREBASE_C,
};

export const defaultFirebase = firebases.C;
export const defaultFirebasePrefix = 'C';

export const serverApi = process.env.SERVER_API;
export const paymentPageUrl = process.env.PAYMENT_PAGE_URL;

if (!defaultFirebase) {
  throw new Error('Firebase URL can\'t be empty');
}

if (!serverApi) {
  throw new Error('Server API URL can\'t be empty');
}

// MOCK Api
// export const serverApi = 'https://5mitidksxm7xfn4g4-mock.stoplight-proxy.io/';
