import { useState } from 'react'

export default function TicketTierSelector({ tier }) {
  const [quantity, setQuantity] = useState(0)

  const decrement = () => {
    const newQuantity = Math.max(0, quantity - 1)
    setQuantity(newQuantity)
  }

  const increment = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
  }

  return <div className="flex items-center justify-between p-4 bg-base-100 rounded-box shadow">
    <div>
      <p className="font-semibold">
        {tier.name}
      </p>
      <p className="text-sm text-base-content/60">
        ${tier.price}
      </p>
    </div>
    <div className="flex items-center gap-3">
      <button
        className="btn btn-sm btn-outline"
        onClick={decrement}>−</button>
      <span className="w-6 text-center font-medium">
        {quantity}
      </span>
      <button className="btn btn-sm btn-outline"
        onClick={increment}
      >+</button>
    </div>
  </div>
}