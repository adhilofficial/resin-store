import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
  } = useCart();

  /* =====================================================
     EMPTY CART
  ====================================================== */

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#17130f] px-6 py-20 text-white sm:px-10 lg:px-16">

        <div className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center text-center">

          {/* Icon */}
          <div className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            text-white
          ">
            <ShoppingBag
              size={30}
              strokeWidth={1.4}
            />
          </div>

          {/* Label */}
          <p className="
            mt-8
            text-[9px]
            font-medium
            uppercase
            tracking-[0.4em]
            text-white/40
          ">
            Your collection
          </p>

          {/* Heading */}
          <h1 className="
            mt-5
            text-5xl
            font-medium
            leading-[0.95]
            tracking-[-0.055em]
            text-white
            sm:text-6xl
          ">
            Nothing here
            <br />
            <span className="font-normal italic text-[#c7a76c]">
              yet.
            </span>
          </h1>

          {/* Description */}
          <p className="
            mx-auto
            mt-6
            max-w-md
            text-sm
            leading-7
            text-white/50
          ">
            Your collection is waiting for something
            beautiful. Explore our handmade pieces and
            find something worth keeping.
          </p>

          {/* CTA */}
          <Link
            to="/shop"
            className="
              group
              mt-9
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-8
              py-4
              text-sm
              font-medium
              text-[#17130f]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#c7a76c]
              hover:shadow-xl
            "
          >
            Explore collection

            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>

        </div>

      </main>
    );
  }

  /* =====================================================
     CALCULATIONS
  ====================================================== */

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="
      min-h-screen
      bg-[#17130f]
      px-6
      py-14
      text-white
      sm:px-10
      lg:px-16
      lg:py-20
    ">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="border-b border-white/10 pb-10">

          <div className="flex items-center gap-3">

            <span className="h-px w-8 bg-[#c7a76c]" />

            <p className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.4em]
              text-white/40
            ">
              Your collection
            </p>

          </div>

          <div className="
            mt-5
            flex
            flex-col
            justify-between
            gap-5
            sm:flex-row
            sm:items-end
          ">

            <h1 className="
              text-5xl
              font-medium
              leading-none
              tracking-[-0.055em]
              text-white
              sm:text-6xl
              lg:text-7xl
            ">
              Your cart.
            </h1>

            <p className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-white/40
            ">
              {itemCount}{" "}
              {itemCount === 1 ? "piece" : "pieces"}
            </p>

          </div>

        </header>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="
          grid
          gap-12
          pt-12
          lg:grid-cols-[1fr_390px]
          lg:gap-16
        ">

          {/* =================================================
              CART ITEMS
          ================================================= */}

          <section>

            <div className="space-y-0">

              {cartItems.map((item) => {

                const itemTotal =
                  item.price * item.quantity;

                return (
                  <article
                    key={item.id}
                    className="
                      border-b
                      border-white/10
                      py-7
                      first:pt-0
                    "
                  >

                    <div className="
                      flex
                      gap-5
                      sm:gap-7
                    ">

                      {/* IMAGE */}

                      <Link
                        to={`/product/${item.slug}`}
                        className="
                          group
                          block
                          w-28
                          shrink-0
                          overflow-hidden
                          rounded-[1.25rem]
                          bg-[#211b16]
                          sm:w-40
                        "
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="
                            aspect-square
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                        />

                      </Link>

                      {/* DETAILS */}

                      <div className="
                        flex
                        min-w-0
                        flex-1
                        flex-col
                        justify-between
                        gap-5
                      ">

                        <div>

                          {/* Category */}

                          <p className="
                            text-[8px]
                            font-medium
                            uppercase
                            tracking-[0.3em]
                            text-white/40
                          ">
                            {item.category}
                          </p>

                          {/* Name */}

                          <Link
                            to={`/product/${item.slug}`}
                            className="
                              mt-2
                              block
                              text-base
                              font-medium
                              leading-tight
                              tracking-[-0.02em]
                              text-white
                              transition
                              hover:text-[#c7a76c]
                              sm:text-lg
                            "
                          >
                            {item.name}
                          </Link>

                          {/* Price */}

                          <p className="
                            mt-3
                            text-base
                            font-bold
                            tracking-[-0.02em]
                            text-white
                          ">
                            ₹
                            {item.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                        {/* Bottom controls */}

                        <div className="
                          flex
                          flex-wrap
                          items-center
                          justify-between
                          gap-4
                        ">

                          {/* Quantity */}

                          <div className="
                            flex
                            items-center
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.05]
                            text-white
                          ">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-white
                                transition
                                hover:bg-[#c7a76c]/10
                                hover:text-[#c7a76c]
                              "
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus size={14} />
                            </button>

                            <span className="
                              w-8
                              text-center
                              text-sm
                              font-medium
                              text-white
                            ">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              disabled={
                                item.quantity >= item.stock
                              }
                              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-white
                                transition
                                hover:bg-[#c7a76c]/10
                                hover:text-[#c7a76c]
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                              "
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                          {/* Item total */}

                          <div className="
                            hidden
                            text-right
                            sm:block
                          ">

                            <p className="
                              text-[8px]
                              uppercase
                              tracking-[0.2em]
                              text-white/35
                            ">
                              Total
                            </p>

                            <p className="
                              mt-1
                              text-sm
                              font-bold
                              text-white
                            ">
                              ₹
                              {itemTotal.toLocaleString(
                                "en-IN"
                              )}
                            </p>

                          </div>

                          {/* Remove */}

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              text-[10px]
                              uppercase
                              tracking-[0.15em]
                              text-white/40
                              transition
                              hover:text-[#c47a63]
                            "
                          >
                            <Trash2 size={14} />

                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>

            {/* Clear cart */}

            <button
              type="button"
              onClick={clearCart}
              className="
                mt-7
                text-[9px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-white/35
                transition
                hover:text-[#c47a63]
              "
            >
              Clear all items
            </button>

          </section>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside className="
            h-fit
            rounded-[2rem]
            border
            border-white/10
            bg-[#211b16]
            p-7
            text-white
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            sm:p-8
            lg:sticky
            lg:top-28
          ">

            {/* Header */}

            <div className="flex items-center gap-3">

              <span className="h-px w-7 bg-[#c7a76c]" />

              <p className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.35em]
                text-white/40
              ">
                Order summary
              </p>

            </div>

            {/* Items */}

            <div className="mt-7 space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >

                  <div className="min-w-0">

                    <p className="
                      truncate
                      text-sm
                      font-medium
                      text-white
                    ">
                      {item.name}
                    </p>

                    <p className="
                      mt-1
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      text-white/40
                    ">
                      Qty {item.quantity}
                    </p>

                  </div>

                  <p className="
                    shrink-0
                    text-sm
                    font-bold
                    text-white
                  ">
                    ₹
                    {(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

              ))}

            </div>

            {/* Divider */}

            <div className="my-7 h-px bg-white/10" />

            {/* Subtotal */}

            <div className="
              flex
              justify-between
              text-sm
            ">

              <span className="text-white/50">
                Subtotal
              </span>

              <span className="font-medium text-white">
                ₹
                {cartSubtotal.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* Shipping */}

            <div className="
              mt-4
              flex
              justify-between
              gap-4
              text-sm
            ">

              <span className="text-white/50">
                Shipping
              </span>

              <span className="
                text-right
                text-xs
                text-white/40
              ">
                Calculated at checkout
              </span>

            </div>

            {/* Total divider */}

            <div className="my-7 h-px bg-white/10" />

            {/* Total */}

            <div className="
              flex
              items-end
              justify-between
              gap-5
            ">

              <div>

                <p className="
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                ">
                  Total
                </p>

                <p className="
                  mt-1
                  text-xl
                  font-medium
                  text-white
                ">
                  Your order
                </p>

              </div>

              <span className="
                text-2xl
                font-bold
                tracking-[-0.03em]
                text-white
              ">
                ₹
                {cartSubtotal.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* Checkout */}

            <Link
              to="/checkout"
              className="
                group
                mt-8
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-white
                px-7
                py-4
                text-sm
                font-medium
                text-[#17130f]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#c7a76c]
                hover:shadow-xl
              "
            >
              Continue to checkout

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </Link>

            {/* Continue shopping */}

            <Link
              to="/shop"
              className="
                mt-5
                block
                text-center
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-white/40
                transition
                hover:text-[#c7a76c]
              "
            >
              Continue shopping
            </Link>

            {/* Trust information */}

            <div className="
              mt-8
              grid
              grid-cols-2
              gap-3
              border-t
              border-white/10
              pt-7
            ">

              <div>

                <Truck
                  size={16}
                  className="text-[#c7a76c]"
                />

                <p className="
                  mt-3
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-white
                ">
                  Delivery
                </p>

                <p className="
                  mt-1
                  text-[10px]
                  leading-5
                  text-white/40
                ">
                  Shipping calculated at checkout
                </p>

              </div>

              <div>

                <ShieldCheck
                  size={16}
                  className="text-[#c7a76c]"
                />

                <p className="
                  mt-3
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-white
                ">
                  Handmade
                </p>

                <p className="
                  mt-1
                  text-[10px]
                  leading-5
                  text-white/40
                ">
                  Carefully made and packed
                </p>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Cart;