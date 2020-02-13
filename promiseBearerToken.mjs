import requestToken from './requestToken'

module.exports = function promiseBearerToken(processEnv, argToken) {
  if (typeof argToken === 'string') {
    return Promise.resolve({access_token: argToken})
  }
  return requestToken(processEnv)
}

