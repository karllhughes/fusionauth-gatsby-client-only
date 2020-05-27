import { getChallenge, getState, getVerifier } from "../helpers/pkce"
import queryString from "query-string"

const config = {
  baseUrl: process.env.GATSBY_AUTH_URL,
  clientId: process.env.GATSBY_CLIENT_ID,
  tenantId: process.env.GATSBY_TENANT_ID,
  redirectUrl: process.env.GATSBY_REDIRECT_URL,
}

const parseJson = (response) => {
  if (response.status === 200) {
    return response.json()
  } else {
    throw response.status
  }
}

const saveTokenToLocalStorage = (data) => {
  localStorage.setItem('accessToken', data.access_token)
  localStorage.setItem('userId', data.userId)
}

export const generateLoginUrl = () => {
  const challenge = getChallenge()
  const state = getState()

  return `${config.baseUrl}/oauth2/authorize?client_id=${config.clientId}&code_challenge=${challenge}&state=${state}&code_challenge_method=S256&response_type=code&tenantId=${config.tenantId}&redirect_uri=${config.redirectUrl}`
}

export const isAuthenticated = () => {
  return localStorage.getItem('accessToken') && localStorage.getItem('userId')
}

export const getTokenCallback = (callback) => {
  const code = queryString.parse(window.location.search).code

  const requestUrl = `${config.baseUrl}/oauth2/token`
  const requestParams = {
    client_id: config.clientId,
    code: code,
    code_verifier: getVerifier(),
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUrl,
  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify(requestParams),
  };

  fetch(requestUrl, requestOptions)
    .then(parseJson)
    .then(data => {
      if (data && data.access_token && data.userId) {
        saveTokenToLocalStorage(data)
        callback(null, data)
      } else {
        throw data
      }
    })
    .catch((error) => callback(error, null))
}

export const getCurrentUser = (callback) => {
  const accessToken = localStorage.getItem('accessToken')
  const userId = localStorage.getItem('userId')

  fetch(`${config.baseUrl}/api/user/${userId}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
    .then(parseJson)
    .then(data => {
      if (data && data.user) {
        callback(null, data.user)
      } else {
        throw data;
      }
    })
    .catch((error) => callback(error))
}
