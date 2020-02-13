import fetch from 'node-fetch'

/** @returns {Object} the response body, which contains
the properties 'access_token', 'scope', 'token_type'
and 'expires_in' */
module.exports = processEnv => fetch(
  processEnv.EVETRO_TOKEN_URL,
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: processEnv.EVETRO_CLIENT_ID,
      client_secret: processEnv.EVETRO_CLIENT_SECRET,
      audience: processEnv.EVETRO_API_URL,
    }),
  },
).then(fetchResponse => fetchResponse.json())

