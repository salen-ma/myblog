import axios from "axios"
import qs from "qs"

axios.defaults.withCredentials = true
const service = axios.create({})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  },
)

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.status === 400) {
    }
    return response
  },
  error => {
    console.log("err" + error) // for debug
    return Promise.reject(error)
  },
)

let headConfig = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
}

export const LXHR = {
  POST(url, params, type) {
    if (type === "json") {
      return service.post(url, params)
    } else {
      return service.post(url, qs.stringify(params), { headers: headConfig })
    }
  },
  GET(url, params) {
    return service.get(url, {params: params}, { headers: headConfig })
  },
  UPLOAD(url, data) {
    return service.post(url, data, { headers: { "Content-Type": "multipart/form-data" } })
  }
}
