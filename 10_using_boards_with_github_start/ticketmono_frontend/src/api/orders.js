import apiClient from './client'

export async function createOrder(items) {
  const res = await apiClient('/orders/', {
    method: 'POST',
    body: JSON.stringify({ items }),
  })
  if (!res.ok) throw new Error('Failed to create order.')
  return res.json()
}

// we're going to get the items here.
export async function fetchOrder(id) {
  // remember to await
  const response = await apiClient(`/orders/${id}/`)
  if (!response.ok) {
    throw new Error(`Failed to fetch order ${id}`)
  }
  console.log(response)
  return response.json()
}
