const fetch = require('isomorphic-fetch')
const {size} = require('lodash')
const qs = require('qs')

/**
 * This is our overly complicated "request"
 * @returns {Function}
 */
export default {
  async get(url, params, headers = {}) {
    return buildRequest('GET', url, params, { headers })
  },

  async post(url, data, headers = {}) {
    return buildRequest('POST', url, data, { headers })
  },
}

/**
 * Build and execute remote request
 * @param method
 * @param url
 * @param params
 * @param options
 */
function buildRequest(method, url, params, options) {
  const requestURL = url + (method === 'GET' && size(params) ? ('?' + qs.stringify(params)) : '')
  const request = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: options.headers,
  }

  if (!options.isMultiForm) {
    request.headers['content-type'] = 'application/json'
  }

  if (method === 'POST') {
    request.body = JSON.stringify(params || {})
  }

  return fetch(requestURL, request).then(handleResponse)
}

/**
 * Decide what to do with the response.
 * Lets just support text for now, because its an exercise
 * @param response
 * @returns {Promise}
 * @private
 */
async function handleResponse(response) {
  try {
    return response.text()
  } catch(err) {
    console.error(err)
    return Promise.reject(err)
  }
}
