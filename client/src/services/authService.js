import { fetchGet, fetchRequestJson } from '../utils/fetch.js'
import { setUser, clearUser } from '../stores/auth.js'
import { navigate } from 'svelte-routing'

export async function login (username, password) {
  const response = await fetchRequestJson(
    '/auth/login',
    { username, password },
    'POST'
  )

  if (!response.ok) {
    const error = await response.json()
    return { error: error.error || 'Login failed' }
  }

  const data = await response.json()
  setUser(data.user)
  navigate('/dashboard')
  return { success: true }
}

export async function logout () {
  const response = await fetchRequestJson('/auth/logout', {}, 'POST')
  clearUser()
  navigate('/login')
  return response
}

export async function checkAuthStatus () {
  const data = await fetchGet('/auth/status')

  if (data?.isAuthenticated) {
    setUser(data.user)
  } else {
    clearUser()
  }

  return data
}
