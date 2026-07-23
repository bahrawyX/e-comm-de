import { Link } from "react-router-dom";
import { mockOrders } from "../data/mockData";
import { Bag, ArrowLeft } from "../components/icons";
import type { Order } from "../types";

const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <span className="text-sm font-semibold text-ink">
            Order #{order.id}
          </span>
        </div>
        <span className="text-sm text-muted">{order.date}</span>
      </div>

      <div className="mt-4 divide-y divide-line">
        {order.items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="h-14 w-14 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-medium text-ink">
                  {item.product.name}
                </p>
                <p className="text-xs text-muted">Qty {item.quantity}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-ink">
              ${item.product.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-sm font-medium text-muted">Total Paid</span>
        <span className="text-base font-bold text-ink">
          ${order.total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border bg-white py-16 text-center shadow-sm">
      <Bag className="h-10 w-10 text-faint" />
      <p className="mt-4 text-sm font-medium text-muted">
        You haven&apos;t placed any orders yet.
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>
    </div>
  );
}

function Orders() {
  const orders = mockOrders;

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold text-ink">Order History</h1>
      <p className="mt-1 text-sm text-muted">
        View the status and details of your past orders.
      </p>

      {orders.length === 0 ? (
        <div className="mt-6">
          <EmptyOrders />
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

