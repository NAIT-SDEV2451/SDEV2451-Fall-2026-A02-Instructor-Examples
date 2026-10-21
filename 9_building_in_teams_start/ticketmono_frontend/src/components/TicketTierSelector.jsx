import { useState } from 'react'
import { useCart } from '../hooks/useCart'

function TicketTierSelector({ tier, eventId, eventName }) {
  const { items, updateCart } = useCart()

  // let's get our quantity
  // from our cart provider gloabl state.
  let key = `${eventId}-${tier.id}`
  let quantity = 0
  if (items[key]){
    quantity = items[key].quantity
  }

  function decrement() {
    const newQty = Math.max(0, quantity - 1)
    updateCart({ eventId, eventName, tierId: tier.id, tierName: tier.name, tierPrice: tier.price, quantity: newQty })
  }

  function increment() {
    const newQty = quantity + 1
    updateCart({ eventId, eventName, tierId: tier.id, tierName: tier.name, tierPrice: tier.price, quantity: newQty })
  }

  return (
    <div className="flex items-center justify-between p-4 bg-base-100 rounded-box shadow">
      <div>
        <p className="font-semibold">{tier.name}</p>
        <p className="text-sm text-base-content/60">${tier.price}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-sm btn-outline" onClick={decrement}>−</button>
        <span className="w-6 text-center font-medium">{quantity}</span>
        <button className="btn btn-sm btn-outline" onClick={increment}>+</button>
      </div>
    </div>
  )
}

export default TicketTierSelector
