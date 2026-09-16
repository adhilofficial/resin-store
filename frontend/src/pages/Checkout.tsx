import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import {
  createWhatsAppOrder,
  type CustomerDetails,
} from "../utils/whatsapp";
import { saveOrder } from "../utils/orders";

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase();

  return `RESIN-${timestamp}-${random}`;
}

function Checkout() {
  const {
    cartItems,
    cartSubtotal,
    clearCart,
  } = useCart();

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [orderId, setOrderId] =
    useState("");

  const [error, setError] =
    useState("");

  const [customer, setCustomer] =
    useState<CustomerDetails>({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });

  const [delivery, setDelivery] =
    useState<"standard" | "express">(
      "standard"
    );

  const standardDelivery = 0;
  const expressDelivery = 99;

  const deliveryCharge =
    delivery === "express"
      ? expressDelivery
      : standardDelivery;

  const total = useMemo(
    () => cartSubtotal + deliveryCharge,
    [cartSubtotal, deliveryCharge]
  );

  const updateCustomer = (
    field: keyof CustomerDetails,
    value: string
  ) => {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    const newOrderId = generateOrderId();

    try {
      /*
       * 1. Save order to Supabase
       */
      await saveOrder({
        id: newOrderId,

        customer,

        items: cartItems,

        subtotal: cartSubtotal,

        deliveryCharge,

        deliveryMethod: delivery,

        total,

        status: "Pending",

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
      });

      /*
       * 2. Open WhatsApp
       */
      const whatsappOpened =
        createWhatsAppOrder(
          newOrderId,
          cartItems,
          cartSubtotal,
          deliveryCharge,
          customer
        );

      if (!whatsappOpened) {
        throw new Error(
          "Unable to open WhatsApp."
        );
      }

      /*
       * 3. Clear cart
       */
      clearCart();

      /*
       * 4. Show success screen
       */
      setOrderId(newOrderId);
      setOrderPlaced(true);
    } catch (err) {
      console.error(
        "Order submission failed:",
        err
      );

      setError(
        "We couldn't place your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * ORDER SUCCESS
   */
  if (orderPlaced) {
    return (
      <main className="min-h-[75vh] bg-[#031b18] px-6 py-24 text-[#f5efe2] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#c9a45c]/30 bg-[#08231f] shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c9a45c]">
              <Check
                size={30}
                strokeWidth={2}
                className="text-[#071713]"
              />
            </div>
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.4em] text-[#c9a45c]">
            Order received
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            Thank you for your order.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-[#8f968e] sm:text-base">
            Your order has been successfully
            received. We've prepared your
            order details and opened WhatsApp
            for confirmation.
          </p>

          {/* ORDER ID */}
          <div className="mt-8 w-full max-w-md rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8f968e]">
              Order ID
            </p>

            <p className="mt-3 break-all text-xl font-semibold tracking-wide text-[#c9a45c]">
              {orderId}
            </p>
          </div>

          {/* WhatsApp */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#c9a45c]/15 bg-[#08231f] px-6 py-4">
            <MessageCircle
              size={20}
              className="text-[#c9a45c]"
            />

            <span className="text-sm text-[#d8d3c5]">
              Order sent to WhatsApp
            </span>
          </div>

          <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">

            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full bg-[#c9a45c] px-8 py-4 text-sm font-semibold text-[#071713] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dfc27a] hover:shadow-xl"
            >
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-[#c9a45c]/25 bg-[#061f1c] px-8 py-4 text-sm font-medium text-[#f5efe2] transition-all duration-300 hover:border-[#c9a45c] hover:bg-[#08231f]"
            >
              Back to Home
            </Link>

          </div>

          <p className="mt-8 text-xs text-[#69756f]">
            Keep WhatsApp available so we can
            confirm your order.
          </p>

        </div>
      </main>
    );
  }

  /*
   * EMPTY CART
   */
  if (cartItems.length === 0) {
    return (
      <main className="min-h-[75vh] bg-[#031b18] px-6 py-24 text-[#f5efe2] sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a45c]/30 bg-[#08231f]">
            <Check
              size={30}
              strokeWidth={1.5}
              className="text-[#c9a45c]"
            />
          </div>

          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-[#c9a45c]">
            Checkout
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            Your cart is empty.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#8f968e]">
            Add something beautiful to your
            collection before continuing to
            checkout.
          </p>

          <Link
            to="/shop"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#c9a45c] px-7 py-4 text-sm font-semibold text-[#071713] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dfc27a] hover:shadow-xl"
          >
            Explore collection
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#031b18] px-5 py-16 text-[#f5efe2] sm:px-8 lg:px-12 xl:px-16">

      <div className="mx-auto max-w-7xl">

        {/* BACK */}

        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-[#8f968e] transition hover:text-[#f5efe2]"
        >
          <ArrowLeft size={16} />
          Back to cart
        </Link>

        {/* HEADER */}

        <div className="mt-12 border-b border-[#c9a45c]/15 pb-10">

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a45c]">
            Checkout
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Complete your order.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#8f968e] sm:text-base">
            Enter your details and we'll send
            your order directly to WhatsApp for
            confirmation.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-12 pt-12 lg:grid-cols-[1fr_390px]">

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-12"
          >

            {/* CONTACT */}

            <section>

              <div className="mb-7">

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a45c]">
                  01
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  Contact information
                </h2>

                <p className="mt-2 text-sm text-[#8f968e]">
                  We'll use these details to
                  contact you about your order.
                </p>

              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    required
                    value={customer.name}
                    onChange={(event) =>
                      updateCustomer(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Adhil M"
                    className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(event) =>
                      updateCustomer(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="9876543210"
                    className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/30"
                  />
                </div>

              </div>

            </section>

            {/* SHIPPING */}

            <section>

              <div className="mb-7">

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a45c]">
                  02
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  Shipping address
                </h2>

                <p className="mt-2 text-sm text-[#8f968e]">
                  Where should we deliver your
                  handmade pieces?
                </p>

              </div>

              <div className="space-y-5">

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    required
                    rows={4}
                    value={customer.address}
                    onChange={(event) =>
                      updateCustomer(
                        "address",
                        event.target.value
                      )
                    }
                    placeholder="House name, street, locality"
                    className="w-full resize-none rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/30"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      required
                      value={customer.city}
                      onChange={(event) =>
                        updateCustomer(
                          "city",
                          event.target.value
                        )
                      }
                      placeholder="Kozhikode"
                      className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-sm font-medium"
                    >
                      State
                    </label>

                    <input
                      id="state"
                      type="text"
                      required
                      value={customer.state}
                      onChange={(event) =>
                        updateCustomer(
                          "state",
                          event.target.value
                        )
                      }
                      placeholder="Kerala"
                      className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/30"
                    />
                  </div>

                </div>

                <div className="max-w-sm">

                  <label
                    htmlFor="pincode"
                    className="mb-2 block text-sm font-medium"
                  >
                    PIN code
                  </label>

                  <input
                    id="pincode"
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    value={customer.pincode}
                    onChange={(event) =>
                      updateCustomer(
                        "pincode",
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    placeholder="673001"
                    className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c] focus:ring-1 focus:ring-[#c9a45c]/30"
                  />

                </div>

              </div>

            </section>

            {/* DELIVERY */}

            <section>

              <div className="mb-7">

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a45c]">
                  03
                </p>

                <h2 className="mt-2 text-2xl font-medium">
                  Delivery method
                </h2>

              </div>

              <div className="space-y-4">

                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition ${
                    delivery === "standard"
                      ? "border-[#c9a45c] bg-[#08231f]"
                      : "border-[#c9a45c]/15 bg-[#061f1c] hover:border-[#c9a45c]/40"
                  }`}
                >

                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={
                      delivery === "standard"
                    }
                    onChange={() =>
                      setDelivery("standard")
                    }
                  />

                  <Truck
                    size={20}
                    className="text-[#c9a45c]"
                  />

                  <div className="flex-1">

                    <p className="font-medium">
                      Standard delivery
                    </p>

                    <p className="mt-1 text-xs text-[#8f968e]">
                      5–7 business days
                    </p>

                  </div>

                  <span className="text-sm font-medium">
                    Free
                  </span>

                </label>

                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 transition ${
                    delivery === "express"
                      ? "border-[#c9a45c] bg-[#08231f]"
                      : "border-[#c9a45c]/15 bg-[#061f1c] hover:border-[#c9a45c]/40"
                  }`}
                >

                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={
                      delivery === "express"
                    }
                    onChange={() =>
                      setDelivery("express")
                    }
                  />

                  <Truck
                    size={20}
                    className="text-[#c9a45c]"
                  />

                  <div className="flex-1">

                    <p className="font-medium">
                      Express delivery
                    </p>

                    <p className="mt-1 text-xs text-[#8f968e]">
                      2–3 business days
                    </p>

                  </div>

                  <span className="text-sm font-medium">
                    ₹99
                  </span>

                </label>

              </div>

            </section>

            {/* PLACE ORDER */}

            <section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#c9a45c] px-7 py-5 text-sm font-semibold text-[#071713] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dfc27a] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >

                <MessageCircle size={19} />

                {isSubmitting
                  ? "Placing Order..."
                  : `Place Order · ₹${total.toLocaleString(
                      "en-IN"
                    )}`}

              </button>

              <p className="mt-4 text-center text-xs text-[#69756f]">
                Your order will be saved securely
                and sent to WhatsApp for
                confirmation.
              </p>

            </section>

          </form>

          {/* ORDER SUMMARY */}

          <aside className="h-fit lg:sticky lg:top-28">

            <div className="rounded-[2rem] border border-[#c9a45c]/15 bg-[#061f1c] p-7 sm:p-8">

              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a45c]">
                Your collection
              </p>

              <h2 className="mt-3 text-2xl font-medium">
                Order summary
              </h2>

              <div className="mt-8 space-y-6">

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-[#c9a45c]/10 pb-6"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">

                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#8f968e]">
                        Qty: {item.quantity}
                      </p>

                      <p className="mt-2 text-sm font-medium text-[#c9a45c]">
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

              <div className="mt-7 space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-[#8f968e]">
                    Subtotal
                  </span>

                  <span>
                    ₹
                    {cartSubtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#8f968e]">
                    Shipping
                  </span>

                  <span>
                    {deliveryCharge === 0
                      ? "Free"
                      : `₹${deliveryCharge.toLocaleString(
                          "en-IN"
                        )}`}
                  </span>
                </div>

              </div>

              <div className="my-7 border-t border-[#c9a45c]/15" />

              <div className="flex items-center justify-between">

                <span className="text-lg font-medium">
                  Total
                </span>

                <span className="text-2xl font-semibold text-[#c9a45c]">
                  ₹
                  {total.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="mt-8 space-y-4 border-t border-[#c9a45c]/10 pt-7">

                <div className="flex items-center gap-3">
                  <ShieldCheck
                    size={18}
                    className="text-[#c9a45c]"
                  />

                  <span className="text-xs text-[#8f968e]">
                    Secure order confirmation
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle
                    size={18}
                    className="text-[#c9a45c]"
                  />

                  <span className="text-xs text-[#8f968e]">
                    Order confirmation via WhatsApp
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Truck
                    size={18}
                    className="text-[#c9a45c]"
                  />

                  <span className="text-xs text-[#8f968e]">
                    Pan-India delivery available
                  </span>
                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Checkout;