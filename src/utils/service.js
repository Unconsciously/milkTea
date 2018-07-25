'use strict'

import axios from 'axios'

axios.defaults.timeout = 5000

axios.defaults.withCredentials = true
console.log(process.env.API_ROOT)
axios.defaults.baseURL = process.env.API_ROOT

axios.interceptors.request.use(
  config => {
    console.log('Loading...');
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

axios.interceptors.response.use(
  response => {
    console.log('Loading结束...');
    return response
  },
  error => {
    return Promise.reject(error)
  },
)

export default axios

