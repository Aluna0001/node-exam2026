// @ts-nocheck
import { API_URL } from './api.js'

export async function fetchGet (path) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      credentials: 'include'
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function fetchRequestJson (path, bodyObjekt, httpVerbum) {
  const objectAsJsonString = JSON.stringify(bodyObjekt)
  const fetchOptions = {
    method: httpVerbum,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: objectAsJsonString
  }
  const response = await fetch(`${API_URL}${path}`, fetchOptions)
  if (!response.ok) {
    const errorMessage = response.statusText
    console.error('Fejl i fetchRequestJson:', errorMessage)
  }
  return response
}
