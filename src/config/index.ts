import Axios from 'axios'

export const API = Axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
