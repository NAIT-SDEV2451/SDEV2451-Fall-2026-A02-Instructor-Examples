import { createContext, useState } from "react";

export const CartContext = createContext(null)

export default function CartProvider({ children }) {
  const [items, updateCartItems] = useState({})

  // I want the ability to buy tickets for multiple
  // events.
  // on the object above i'm oging to store
  // eventid-tierid (all the values in it.)

  const updateCart = (
    { eventId, eventName, tierId, tierName, tierPrice, quantity}
  ) => {
    // let's build the key
    const key = `${eventId}-${tierId}`
    updateCartItems((previous) => {
      return {
        ...previous, // the old state
        [key] : { // our new key will update the old
          eventId: eventId, // all our information saved.
          eventName: eventName,
          tierId: tierId,
          tierName: tierName,
          tierPrice: tierPrice,
          quantity: quantity
        }
      }
    })
  }

  // this is what we're gong to expose
  const value = { items, updateCart }

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}