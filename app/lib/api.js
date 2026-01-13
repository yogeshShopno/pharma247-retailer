/**
 * Production-grade API service
 * - Retry with backoff
 * - Normalized error shape
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// --------------------
// Normalized Error
// --------------------
export class ApiError extends Error {
  constructor({ message, status, code, details }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

// --------------------
// Error Normalizer
// --------------------
function normalizeError({ response, data, error }) {
  if (error?.name === 'AbortError') {
    return new ApiError({
      message: 'Request timeout',
      status: 408,
      code: 'TIMEOUT',
    })
  }

  if (!response) {
    return new ApiError({
      message: 'Network error',
      status: 0,
      code: 'NETWORK_ERROR',
    })
  }

  return new ApiError({
    message: data?.message || response.statusText || 'API Error',
    status: response.status,
    code: data?.code || `HTTP_${response.status}`,
    details: data,
  })
}

// --------------------
// Safe JSON parser
// --------------------
async function safeJson(res) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

// --------------------
// Retry helper (exponential backoff)
// --------------------
async function retry(fn, retries, delay = 300) {
  try {
    return await fn()
  } catch (err) {
    if (retries <= 0) throw err
    await new Promise((r) => setTimeout(r, delay))
    return retry(fn, retries - 1, delay * 2)
  }
}

// --------------------
// Main fetch
// --------------------
export async function api(
  path,
  {
    method = 'GET',
    headers = {},
    body,
    cache = 'force-cache',
    revalidate,
    timeout = 10000,
    retryCount = 2,
  } = {}
) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  const exec = async () => {
    let response

    try {
      response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        signal: controller.signal,
        cache,
        ...(revalidate !== undefined && { next: { revalidate } }),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await safeJson(response)

      if (!response.ok) {
        throw normalizeError({ response, data })
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw normalizeError({ response, error })
    }
  }

  try {
    return await retry(exec, retryCount)
  } finally {
    clearTimeout(timer)
  }
}
