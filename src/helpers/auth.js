import { getChallenge, getState, getVerifier } from "../helpers/pkce"
import queryString from "query-string"

const config = {
  baseUrl: process.env.GATSBY_AUTH_URL,
  clientId: process.env.GATSBY_CLIENT_ID,
  tenantId: process.env.GATSBY_TENANT_ID,
  redirectUrl: process.env.GATSBY_REDIRECT_URL,
}

export const generateLoginUrl = () => {
  const challenge = getChallenge()
  const state = getState()

  return `${config.baseUrl}/oauth2/authorize?client_id=${config.clientId}&code_challenge=${challenge}&state=${state}&code_challenge_method=S256&response_type=code&tenantId=${config.tenantId}&redirect_uri=${config.redirectUrl}`
}

export const isAuthenticated = () => {
  return localStorage.getItem('accessToken') && localStorage.getItem('userId')
}

export const getTokenCallback = (cb) => {
  const code = queryString.parse(window.location.search).code

  const tokenRequestUrl = `${config.baseUrl}/oauth2/token`
  const tokenRequestParams = {
    client_id: config.clientId,
    code: code,
    code_verifier: getVerifier(),
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUrl,
  }

  fetch(tokenRequestUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify(tokenRequestParams),
  })
    .then(response => response.json())
    .then(data => {
      if (data && data.access_token) {
        localStorage.setItem('accessToken', data.access_token)
        localStorage.setItem('userId', data.userId)
        window.location.href = '/profile'
      } else {
        throw data
      }
    })
    .catch((error) => console.error('Error:', error))
}

export const getCurrentUser = () => {
  const accessToken = localStorage.getItem('accessToken')
  const userId = localStorage.getItem('userId')

  fetch(`${config.baseUrl}/api/user/${userId}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.user)
    })
    .catch((error) => console.error('Error:', error))
}
