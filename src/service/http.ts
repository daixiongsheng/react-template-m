import axios, { Method } from 'axios'
import { Toast } from 'antd-mobile'
import { ResultCode } from '@/common/enum'
import { local } from '@/storage'

const baseURL = '/api'

const instance = axios.create({
  baseURL,
})

instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use(
  (res) => {
    if (res.data.code !== ResultCode.Success) {
      Toast.fail(res.data.msg)
    }
    return res
  },
  (error) => {
    Toast.fail(error.message)
  }
)

function request<R>(url: string, method: Method, data = {}, headers = {}) {
  return instance({
    url,
    method,
    data,
    headers: {
      'Content-Type': 'application / json;',
      token: local.get('token'),
      ...headers,
    },
    params: method.toLowerCase() === 'get' ? data : {},
  }).then((res) => {
    return res.data.data
  }) as Promise<R>
}

export function post<R>(url: string, data = {}, headers = {}) {
  return request<R>(url, 'post', data, headers)
}

export function get<R>(url: string, data = {}, headers = {}) {
  return request<R>(url, 'get', data, headers)
}
