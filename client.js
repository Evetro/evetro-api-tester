import React from 'react'
import { hydrate } from 'react-dom'
import App from './app'

// Read the state sent with markup
const info = JSON.parse(window.__PROPS__)

// delete the transferred object from global window object
delete window.__PROPS__

/**
 * hydrate the page to make sure both server and client
 * side pages are identical. This includes markup checking,
 * react comments to identify elements and more.
 */

hydrate(React.createElement(App, { info }, null), document.querySelector('#app'))
