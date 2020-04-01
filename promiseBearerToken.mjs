import requestToken from './requestToken.mjs'

export default function promiseBearerToken(processEnv, argToken) {
  console.log(argToken)
  if (typeof argToken === 'string') {
    return Promise.resolve({access_token: argToken})
  }
  return requestToken(processEnv)
}

