import axios from "axios"

import { PEW_API_URL } from "../config"

const headers = {}

const buildUrl = ( endpoint ) => {

  return `${ PEW_API_URL }/${ endpoint }`
}

const setAuthToken = ( jwt ) => {
  headers[ "Authorization" ] = `Bearer ${ jwt }`
}

const clearAuthToken = () => {
  delete headers[ "Authorization" ]
}

const get = ( endpoint ) => {
  return axios.get( buildUrl( endpoint ), {
    headers,
  } )
}

const post = ( endpoint, payload ) => {
  return axios.post( buildUrl( endpoint ), payload, {
    headers,
  } )
}

export default {
  setAuthToken,
  clearAuthToken,
  get,
  post,
}
