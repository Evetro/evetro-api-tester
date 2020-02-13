import React from 'react'
import { renderToString } from 'react-dom/server'
import http from 'http'

import App from './app'
import promiseBearerToken from './promiseBearerToken'

const render = info => renderToString(<App info={info} />)

const template = (title, props, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title> ${title} </title>
  <link href="assets/style.css" rel="stylesheet">
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
  <script src="assets/client.js"></script>
</body>`

promiseBearerToken(process.env, process.argsv.slice(2)[0]).then(({ access_token: bearerToken }) => {
  console.log('bearer ', bearerToken)
  const props = { apiUrl: process.env.EVETRO_API_URL, bearerToken }
  // Server to be used
  http.createServer((request, response) => {
    console.log('request at ', request.url)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(template("Server Rendered Page", props, render(props)), 'utf-8')
  }).listen(3009)
})

process.on('SIGINT', () => {
  process.exit(0)
})
