import React from 'react'
// import { renderToString } from 'react-dom/server'
import http from 'http'
import DomServer from 'react-dom/server'

import App from './app.mjs'
import promiseBearerToken from './promiseBearerToken.mjs'

const render = info => DomServer.renderToString(React.createElement(App, { info }, null))

const template = (title, props, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title> ${title} </title>
</head>
<body>
  <div class="content">
    <div id="app" class="wrap-inner">
      <!--- magic happens here -->
      ${content}
    </div>
  </div>
  <script>
    window.__PROPS__ = ${JSON.stringify(props)}
  </script>
  <script src="./client.js"></script>
</body>`

if (process.argv.length < 3) console.log('fetch token')
promiseBearerToken(process.env, process.argv.slice(2)[0]).then(({ access_token: bearerToken }) => {
  console.log('bearer ', bearerToken)
  const props = { apiUrl: process.env.EVETRO_API_URL, bearerToken }
  // Server to be used
  http.createServer((request, response) => {
    console.log('request at ', request.url)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(template("Server Rendered Page", props, render(props)), 'utf-8')
  }).listen(3009)
  console.log('Listening to port 3009');
})

process.on('SIGINT', () => {
  process.exit(0)
})
