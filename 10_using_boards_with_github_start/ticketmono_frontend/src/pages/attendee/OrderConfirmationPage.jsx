import { useParams } from "react-router-dom"
import { useOrder } from "../../hooks/useOrder"

export default function OrderConfirmationPage() {
  const { id } = useParams()
  // we're going to use our order.
  // const { data: order , isLoading, isError, errors } = useOrder(id)
  const { data: order , isLoading, isError, error } = useOrder(id)
  // if you're ever confused about the state of react query
  // just show it to yourself so you understand what's going on.
  // console.log("current state")
  // console.log("order", order)
  // console.log("isLoading", isLoading)
  // console.log("isError", isError)
  // console.log("error", error)

  if (isLoading) {
    return <p className="test-center py-8">Loading Order...</p>
  }

  if (isError) {
    return <p className="test-center py-8">
      Error fetching order {error.toString()}
    </p>
  }

  return (<div className="max-w-2xl mx-auto px-4 py-8">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-base-content/60">Order #{order.id}</p>
    </div>

    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title text-lg mb-4">Your Tickets</h2>
        {order.tickets.map((ticket) => {
          return <div
            key={ticket.id}
            className="flex justify-between items-center py-3 border-b border-base-300 last:border-0"
          >
            <div>
              <p className="font-semibold">{ticket.tier.event_name}</p>
              <p className="text-sm text-base-content/60">
                {ticket.tier.name} × 1
              </p>
            </div>
          </div>
        })}
      </div>
    </div>
  </div>)
}
