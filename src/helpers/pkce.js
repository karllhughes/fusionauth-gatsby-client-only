import * as crypto from 'crypto-browserify';

function base64URLEncode(str) {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}


function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest();
}

export const getState = () => {
  let state = localStorage.getItem('pkceState');

  if (!state) {
    state = base64URLEncode(crypto.randomBytes(32));
    localStorage.setItem('pkceState', state);
  }

  return state
}

export const getVerifier = () => {
  let codeVerifier = localStorage.getItem('pkceVerifier');

  if (!codeVerifier) {
    codeVerifier = base64URLEncode(crypto.randomBytes(32));
    localStorage.setItem('pkceVerifier', codeVerifier);
  }

  return codeVerifier
}

export const getChallenge = () => {
  return base64URLEncode(sha256(getVerifier()));
}
