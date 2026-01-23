import toastr from 'toastr'
import { get } from 'svelte/store'
import { navigate } from 'svelte-routing'
import { account } from '../stores/auth.js'

export function goToDashboard () {
  const currentUser = get(account)
  if (!currentUser) {
    console.error('You must be logged in to access the dashboard')
    navigate('/login')
    return
  }
  navigate('/dashboard')
}

export function goToLogin () {
  navigate('/login')
}

export function goBack (fallback = '/') {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigate(fallback)
  }
}
