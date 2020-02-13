import React from 'react'
import Graphiql from 'graphiql'

const executeQuery = (apiUrl, token) => params => fetch(
  apiUrl,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
    body: JSON.stringify(params),
  },
).then(response => response.json())

export default function App({info}){
  const { apiUrl, bearerToken } = info
  return <GraphiQL fetcher={executeQuery(apiUrl, bearerToken)} />
}
