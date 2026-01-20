import { writable } from 'svelte/store'

export const account = writable(null)

export const isAuthenticated = writable(false)

export function setAccount (accountData) {
  account.set(accountData)
  isAuthenticated.set(true)
}

export function clearAccount () {
  account.set(null)
  isAuthenticated.set(false)
}

// TO DO
// Make more stores later for better handling
