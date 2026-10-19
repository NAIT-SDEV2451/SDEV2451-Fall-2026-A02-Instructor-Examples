import { useCart } from '../../hooks/useCart'

function CheckoutPage() {
  const { items } = useCart()
  const cartItems = Object.values(items)

  // reduce is like map and filter, except it reduces to a single numbers
  const grandTotal = cartItems.reduce(
    (sum, item) => {
      return (
        sum +
        (item.quantity * parseFloat(item.tierPrice))
      )
    },
    0 // original value.
  )

  console.log("Cart Items List", cartItems)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <p className="text-base-content/60">Your cart is empty.</p>
      <div>

        <div

          className="flex justify-between py-3 border-b border-base-300"
        >
          <div>
            <p className="font-semibold">jazz</p>
            <p className="text-sm text-base-content/60">
              tiername x tier quantity
            </p>
          </div>
          <p className="font-medium">
            price
          </p>
        </div>

        <div className="flex justify-between pt-4 font-bold text-lg">
          <span>Total</span>
          <span>$10.00</span>
        </div>
      </div>

    </div>
  )
}

export default CheckoutPage
