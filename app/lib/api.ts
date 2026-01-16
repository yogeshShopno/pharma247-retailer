import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

/* ---------------------------------------
   Axios instance
--------------------------------------- */
const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
})

/* ---------------------------------------
   Request interceptor
--------------------------------------- */
apiInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers?.set('Authorization', `Bearer ${token}`)
      }
    }


    return config
  },
  (error) => Promise.reject(error)
)

/* ---------------------------------------
   Response interceptor
--------------------------------------- */
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

/* ---------------------------------------
   Types
--------------------------------------- */
export type ApiOptions<TPayload = unknown> = {
  method?: AxiosRequestConfig['method']
  params?: Record<string, any>
  data?: TPayload
  headers?: Record<string, string>
  contentType?: 'application/json' | 'multipart/form-data'
}

/* ---------------------------------------
   Single API function
--------------------------------------- */
export async function api<TResponse = any, TPayload = unknown>(
  url: string,
  options: ApiOptions<TPayload> = {}
): Promise<TResponse> {
  const {
    method = 'GET',
    params,
    data,
    headers,
    contentType = 'application/json',
  } = options

  const response = await apiInstance.request<TResponse>({
    url,
    method,
    params,
    data,
    headers, // ✅ let Axios convert internally
  })

  // Content-Type handled safely
  if (contentType) {
    response.config.headers?.set('Content-Type', contentType)
  }

  return response.data
}
