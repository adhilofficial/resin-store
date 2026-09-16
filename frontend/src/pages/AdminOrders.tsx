import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";

import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Loader2,
  MessageCircle,
  Package,
  RefreshCw,
  Search,
  Trash2,
  Truck,
  XCircle,
} from "lucide-react";

import {
  deleteOrder,
  getOrders,
  updateOrderStatus,
  type OrderStatus,
  type ResinOrder,
} from "../utils/orders";

const statuses: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function AdminOrders() {
  const [orders, setOrders] = useState<ResinOrder[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | OrderStatus>("All");

  const [selectedOrder, setSelectedOrder] =
    useState<ResinOrder | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadOrders = useCallback(
    async (showRefreshLoader = false) => {
      try {
        setError("");

        if (showRefreshLoader) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const data = await getOrders();

        setOrders(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load orders from Supabase."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesSearch =
        !searchValue ||
        order.id
          .toLowerCase()
          .includes(searchValue) ||
        order.customer.name
          .toLowerCase()
          .includes(searchValue) ||
        order.customer.phone
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [orders, search, statusFilter]);

  const totalRevenue = useMemo(() => {
    return orders
      .filter(
        (order) =>
          order.status !== "Cancelled"
      )
      .reduce(
        (sum, order) =>
          sum + order.total,
        0
      );
  }, [orders]);

  const pendingOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.status === "Pending"
      ).length,
    [orders]
  );

  const activeOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.status === "Confirmed" ||
          order.status === "Processing"
      ).length,
    [orders]
  );

  const shippedOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.status === "Shipped"
      ).length,
    [orders]
  );

  const deliveredOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.status === "Delivered"
      ).length,
    [orders]
  );

  const handleStatusChange = async (
    orderId: string,
    status: OrderStatus
  ) => {
    try {
      setError("");

      await updateOrderStatus(
        orderId,
        status
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
                updatedAt:
                  new Date().toISOString(),
              }
            : order
        )
      );

      setSelectedOrder((current) =>
        current?.id === orderId
          ? {
              ...current,
              status,
              updatedAt:
                new Date().toISOString(),
            }
          : current
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to update order status."
      );
    }
  };

  const handleDelete = async (
    orderId: string
  ) => {
    const confirmed =
      window.confirm(
        "Delete this order permanently?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteOrder(orderId);

      setOrders((currentOrders) =>
        currentOrders.filter(
          (order) =>
            order.id !== orderId
        )
      );

      setSelectedOrder(null);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to delete this order."
      );
    }
  };

  const openWhatsApp = (
    phone: string
  ) => {
    const cleanPhone =
      phone.replace(/\D/g, "");

    if (!cleanPhone) {
      return;
    }

    const fullPhone =
      cleanPhone.length === 10
        ? `91${cleanPhone}`
        : cleanPhone;

    window.open(
      `https://wa.me/${fullPhone}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const formatDate = (
    date: string
  ) => {
    return new Date(
      date
    ).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const statusClass = (
    status: OrderStatus
  ) => {
    switch (status) {
      case "Pending":
        return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";

      case "Confirmed":
        return "border-blue-400/30 bg-blue-400/10 text-blue-300";

      case "Processing":
        return "border-purple-400/30 bg-purple-400/10 text-purple-300";

      case "Shipped":
        return "border-orange-400/30 bg-orange-400/10 text-orange-300";

      case "Delivered":
        return "border-green-400/30 bg-green-400/10 text-green-300";

      case "Cancelled":
        return "border-red-400/30 bg-red-400/10 text-red-300";

      default:
        return "border-white/10 bg-white/5 text-white";
    }
  };

  return (
    <main className="min-h-screen bg-[#031b18] px-5 py-12 text-[#f5efe2] sm:px-8 lg:px-12 xl:px-16">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a45c]">
            ResinArt Admin
          </p>

          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>

              <h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Orders
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#8f968e]">
                Manage customer orders,
                delivery status and order
                information.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                void loadOrders(true)
              }
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#c9a45c]/20 bg-[#061f1c] px-5 py-4 text-sm transition hover:border-[#c9a45c] disabled:opacity-50"
            >

              <RefreshCw
                size={17}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh

            </button>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-300">

            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                void loadOrders()
              }
              className="underline"
            >
              Retry
            </button>

          </div>
        )}

        {/* STATISTICS */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <StatCard
            icon={<Package size={20} />}
            label="Total Orders"
            value={orders.length}
          />

          <StatCard
            icon={<Clock3 size={20} />}
            label="Pending"
            value={pendingOrders}
          />

          <StatCard
            icon={<Truck size={20} />}
            label="Active Orders"
            value={activeOrders}
          />

          <StatCard
            icon={<Truck size={20} />}
            label="Shipped"
            value={shippedOrders}
          />

          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Revenue"
            value={`₹${totalRevenue.toLocaleString(
              "en-IN"
            )}`}
          />

        </div>

        {/* EXTRA STATUS INFO */}

        <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#8f968e]">

          <span className="rounded-full border border-green-400/20 bg-green-400/5 px-4 py-2">
            Delivered: {deliveredOrders}
          </span>

          <span className="rounded-full border border-orange-400/20 bg-orange-400/5 px-4 py-2">
            Shipped: {shippedOrders}
          </span>

          <span className="rounded-full border border-purple-400/20 bg-purple-400/5 px-4 py-2">
            Processing:{" "}
            {
              orders.filter(
                (order) =>
                  order.status ===
                  "Processing"
              ).length
            }
          </span>

        </div>

        {/* FILTERS */}

        <div className="mt-10 flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#69756f]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search order ID, customer or phone..."
              className="w-full rounded-2xl border border-[#c9a45c]/15 bg-[#061f1c] py-4 pl-12 pr-5 text-sm text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c]"
            />

          </div>

          <div className="relative">

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target
                    .value as
                    | "All"
                    | OrderStatus
                )
              }
              className="w-full appearance-none rounded-2xl border border-[#c9a45c]/15 bg-[#061f1c] px-5 py-4 pr-12 text-sm text-[#f5efe2] outline-none focus:border-[#c9a45c] lg:w-56"
            >

              <option value="All">
                All statuses
              </option>

              {statuses.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}

            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8f968e]"
            />

          </div>

        </div>

        {/* ORDERS TABLE */}

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#c9a45c]/15 bg-[#061f1c]">

          {loading ? (
            <div className="flex flex-col items-center justify-center px-6 py-24 text-center">

              <Loader2
                size={34}
                className="animate-spin text-[#c9a45c]"
              />

              <p className="mt-5 text-sm text-[#8f968e]">
                Loading orders...
              </p>

            </div>
          ) : filteredOrders.length === 0 ? (

            <div className="flex flex-col items-center justify-center px-6 py-24 text-center">

              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a45c]/20 bg-[#08231f]">

                <Package
                  size={30}
                  className="text-[#c9a45c]"
                />

              </div>

              <h2 className="mt-6 text-2xl font-medium">
                No orders found
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-[#8f968e]">
                Orders placed through
                checkout will appear
                here automatically.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead>

                  <tr className="border-b border-[#c9a45c]/10 text-left text-xs uppercase tracking-wider text-[#69756f]">

                    <th className="px-6 py-5">
                      Order
                    </th>

                    <th className="px-6 py-5">
                      Customer
                    </th>

                    <th className="px-6 py-5">
                      Date
                    </th>

                    <th className="px-6 py-5">
                      Total
                    </th>

                    <th className="px-6 py-5">
                      Status
                    </th>

                    <th className="px-6 py-5 text-right">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredOrders.map(
                    (order) => (

                      <tr
                        key={order.id}
                        className="border-b border-[#c9a45c]/10 transition hover:bg-[#08231f]"
                      >

                        <td className="px-6 py-6">

                          <p className="font-semibold text-[#c9a45c]">
                            {order.id}
                          </p>

                          <p className="mt-1 text-xs text-[#69756f]">
                            {order.items.length}{" "}
                            product
                            {order.items.length !==
                            1
                              ? "s"
                              : ""}
                          </p>

                        </td>

                        <td className="px-6 py-6">

                          <p className="font-medium">
                            {order.customer.name}
                          </p>

                          <p className="mt-1 text-xs text-[#8f968e]">
                            {order.customer.phone}
                          </p>

                        </td>

                        <td className="px-6 py-6 text-sm text-[#8f968e]">
                          {formatDate(
                            order.createdAt
                          )}
                        </td>

                        <td className="px-6 py-6 font-semibold">
                          ₹
                          {order.total.toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td className="px-6 py-6">

                          <select
                            value={
                              order.status
                            }
                            onChange={(event) =>
                              void handleStatusChange(
                                order.id,
                                event.target
                                  .value as OrderStatus
                              )
                            }
                            className={`rounded-full border px-4 py-2 text-xs font-medium outline-none ${statusClass(
                              order.status
                            )}`}
                          >

                            {statuses.map(
                              (status) => (
                                <option
                                  key={
                                    status
                                  }
                                  value={
                                    status
                                  }
                                >
                                  {status}
                                </option>
                              )
                            )}

                          </select>

                        </td>

                        <td className="px-6 py-6">

                          <div className="flex justify-end gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedOrder(
                                  order
                                )
                              }
                              className="rounded-xl border border-[#c9a45c]/15 bg-[#08231f] p-3 text-[#c9a45c] transition hover:border-[#c9a45c]"
                              title="View order"
                            >
                              <Eye
                                size={17}
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openWhatsApp(
                                  order.customer.phone
                                )
                              }
                              className="rounded-xl border border-[#c9a45c]/15 bg-[#08231f] p-3 text-[#c9a45c] transition hover:border-[#c9a45c]"
                              title="WhatsApp customer"
                            >
                              <MessageCircle
                                size={17}
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                void handleDelete(
                                  order.id
                                )
                              }
                              className="rounded-xl border border-red-400/10 bg-red-400/5 p-3 text-red-300 transition hover:border-red-400/40"
                              title="Delete order"
                            >
                              <Trash2
                                size={17}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* ORDER DETAILS MODAL */}

      {selectedOrder && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-[#c9a45c]/20 bg-[#061f1c] p-7 shadow-2xl sm:p-9">

            <div className="flex items-start justify-between gap-5">

              <div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a45c]">
                  Order details
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  {selectedOrder.id}
                </h2>

                <p className="mt-2 text-xs text-[#8f968e]">
                  {formatDate(
                    selectedOrder.createdAt
                  )}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="rounded-full border border-[#c9a45c]/15 p-2 text-[#8f968e] transition hover:border-[#c9a45c] hover:text-[#f5efe2]"
              >
                <XCircle size={20} />
              </button>

            </div>

            {/* CUSTOMER */}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">

              <InfoBox
                title="Customer"
                value={
                  selectedOrder.customer
                    .name
                }
              />

              <InfoBox
                title="Phone"
                value={
                  selectedOrder.customer
                    .phone
                }
              />

              <InfoBox
                title="Address"
                value={`${selectedOrder.customer.address}, ${selectedOrder.customer.city}, ${selectedOrder.customer.state} - ${selectedOrder.customer.pincode}`}
              />

              <InfoBox
                title="Delivery"
                value={
                  selectedOrder.deliveryMethod ===
                  "express"
                    ? "Express Delivery"
                    : "Standard Delivery"
                }
              />

            </div>

            {/* PRODUCTS */}

            <div className="mt-8">

              <h3 className="text-lg font-medium">
                Products
              </h3>

              <div className="mt-4 space-y-3">

                {selectedOrder.items.map(
                  (item) => (

                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-2xl border border-[#c9a45c]/10 bg-[#08231f] p-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">

                        <p className="font-medium">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-[#8f968e]">
                          Qty:{" "}
                          {item.quantity}
                        </p>

                      </div>

                      <p className="font-semibold text-[#c9a45c]">
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* TOTALS */}

            <div className="mt-8 rounded-2xl border border-[#c9a45c]/10 bg-[#08231f] p-5">

              <div className="flex justify-between text-sm">

                <span className="text-[#8f968e]">
                  Subtotal
                </span>

                <span>
                  ₹
                  {selectedOrder.subtotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="mt-3 flex justify-between text-sm">

                <span className="text-[#8f968e]">
                  Delivery
                </span>

                <span>
                  {selectedOrder.deliveryCharge ===
                  0
                    ? "Free"
                    : `₹${selectedOrder.deliveryCharge.toLocaleString(
                        "en-IN"
                      )}`}
                </span>

              </div>

              <div className="my-4 border-t border-[#c9a45c]/10" />

              <div className="flex justify-between">

                <span className="text-lg font-medium">
                  Total
                </span>

                <span className="text-xl font-semibold text-[#c9a45c]">
                  ₹
                  {selectedOrder.total.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>

            {/* STATUS */}

            <div className="mt-6">

              <label className="mb-2 block text-xs uppercase tracking-wider text-[#69756f]">
                Order status
              </label>

              <select
                value={
                  selectedOrder.status
                }
                onChange={(event) =>
                  void handleStatusChange(
                    selectedOrder.id,
                    event.target
                      .value as OrderStatus
                  )
                }
                className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none ${statusClass(
                  selectedOrder.status
                )}`}
              >

                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* ACTIONS */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    selectedOrder.customer.phone
                  )
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#c9a45c] px-6 py-4 text-sm font-semibold text-[#071713] transition hover:bg-[#dfc27a]"
              >
                <MessageCircle
                  size={18}
                />
                Contact Customer
              </button>

              <button
                type="button"
                onClick={() =>
                  void handleDelete(
                    selectedOrder.id
                  )
                }
                className="flex items-center justify-center gap-2 rounded-full border border-red-400/20 bg-red-400/5 px-6 py-4 text-sm text-red-300 transition hover:border-red-400/40"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl border border-[#c9a45c]/15 bg-[#061f1c] p-6">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c9a45c]/15 bg-[#08231f] text-[#c9a45c]">
        {icon}
      </div>

      <p className="mt-5 text-xs text-[#8f968e]">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-[#f5efe2]">
        {value}
      </p>

    </div>
  );
}

function InfoBox({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#c9a45c]/10 bg-[#08231f] p-5">

      <p className="text-[10px] uppercase tracking-wider text-[#69756f]">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-[#f5efe2]">
        {value}
      </p>

    </div>
  );
}

export default AdminOrders;