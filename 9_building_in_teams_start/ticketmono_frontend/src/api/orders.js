import apiClient from './client'

export async function createOrder(items) {
  const response = await apiClient('/orders/', {
    method: "POST",
    body: JSON.stringify({ items: items })
  })
  if (!response.ok) {
    throw new Error("Failed to create order")
  }
  return response.json()
}
