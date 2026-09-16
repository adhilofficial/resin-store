import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();

  const {
    addToCart,
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const product = products.find((item) => item.slug === slug);

  // Product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-[#07110f] px-6 py-24 text-[#f4ead8]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a45c]">
            Product
          </p>

          <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
            Product not found
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#d7cdbb]/60">
            We couldn't find the piece you're looking for.
          </p>

          <Link
            to="/shop"
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#c9a45c]
              px-7
              py-4
              text-sm
              font-medium
              text-[#07110f]
              transition
              hover:-translate-y-0.5
              hover:bg-[#e0c27a]
            "
          >
            <ArrowLeft size={16} />
            Back to collection
          </Link>
        </div>
      </main>
    );
  }

  const cartItem = cartItems.find((item) => item.id === product.id);

  const quantity = cartItem?.quantity ?? 0;

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#07110f] text-[#f4ead8]">
      {/* =====================================================
          TOP NAVIGATION / BREADCRUMB
      ====================================================== */}

      <section className="px-6 pt-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/shop"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#d7cdbb]/50
              transition
              hover:text-[#c9a45c]
            "
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to collection
          </Link>
        </div>
      </section>

      {/* =====================================================
          PRODUCT SECTION
      ====================================================== */}

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}

          <div>
            <div className="group relative overflow-hidden rounded-[2rem] border border-[#c9a45c]/15 bg-[#0d1917]">
              <img
                src={product.image}
                alt={product.name}
                className="
                  aspect-square
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-1000
                  ease-out
                  group-hover:scale-[1.03]
                "
              />

              {/* Image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5" />

              {/* Category */}
              <div className="absolute left-5 top-5">
                <span className="
                  rounded-full
                  border
                  border-[#c9a45c]/30
                  bg-[#07110f]/85
                  px-4
                  py-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#c9a45c]
                  backdrop-blur-md
                ">
                  {product.category}
                </span>
              </div>

              {/* Wishlist */}
              <button
                type="button"
                aria-label="Add to wishlist"
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-[#07110f]/80
                  text-[#f4ead8]
                  backdrop-blur-md
                  transition
                  hover:scale-105
                  hover:border-[#c9a45c]/50
                  hover:text-[#c9a45c]
                "
              >
                <Heart size={17} strokeWidth={1.7} />
              </button>

              {/* Bestseller badge */}
              {product.featured && (
                <span className="
                  absolute
                  bottom-5
                  left-5
                  rounded-full
                  border
                  border-[#c9a45c]/50
                  bg-[#07110f]/85
                  px-4
                  py-2
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#c9a45c]
                  backdrop-blur-md
                ">
                  Bestseller
                </span>
              )}
            </div>

            {/* Small product statement */}
            <div className="mt-5 flex items-center justify-between px-1">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d7cdbb]/40">
                Handmade in India
              </p>

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d7cdbb]/40">
                One of a kind
              </p>
            </div>
          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="flex flex-col justify-center lg:py-8">

            {/* Category */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9a45c]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#c9a45c]">
                {product.category}
              </p>
            </div>

            {/* Product name */}
            <h1 className="
              mt-6
              max-w-2xl
              font-serif
              text-5xl
              leading-[0.95]
              tracking-[-0.055em]
              text-[#f4ead8]
              sm:text-6xl
              lg:text-7xl
            ">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-7 flex items-end gap-3">
              <span className="text-3xl font-bold tracking-[-0.03em] text-[#c9a45c]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              <span className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#d7cdbb]/40">
                INR
              </span>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-[#c9a45c]/15" />

            {/* Description */}
            <p className="max-w-xl text-base leading-8 text-[#d7cdbb]/60">
              {product.description}
            </p>

            {/* Customizable */}
            {product.customizable && (
              <div className="
                mt-7
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[#c9a45c]/20
                bg-[#0c1a17]
                p-4
              ">
                <div className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#c9a45c]
                  text-[#07110f]
                ">
                  <Sparkles size={15} />
                </div>

                <div>
                  <p className="text-xs font-medium text-[#f4ead8]">
                    Customizable piece
                  </p>

                  <p className="mt-1 text-[11px] text-[#d7cdbb]/50">
                    Personalize this piece to make it yours.
                  </p>
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mt-7 flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-[#9aaa91]" />

                  <p className="text-xs text-[#d7cdbb]/50">
                    {product.stock}{" "}
                    {product.stock === 1 ? "piece" : "pieces"}{" "}
                    available
                  </p>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-400" />

                  <p className="text-xs text-[#d7cdbb]/50">
                    Currently out of stock
                  </p>
                </>
              )}
            </div>

            {/* =================================================
                CART ACTION
            ================================================= */}

            {product.stock > 0 && quantity > 0 ? (
              <div className="mt-8 flex max-w-md gap-3">

                {/* Quantity */}
                <div className="
                  flex
                  h-14
                  items-center
                  rounded-full
                  border
                  border-[#c9a45c]/20
                  bg-[#0c1a17]
                ">
                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(product.id)
                    }
                    className="
                      flex
                      h-14
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      text-[#d7cdbb]
                      transition
                      hover:bg-[#c9a45c]/10
                    "
                  >
                    <Minus size={15} />
                  </button>

                  <span className="w-8 text-center text-sm font-medium text-[#f4ead8]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    disabled={quantity >= product.stock}
                    onClick={() =>
                      increaseQuantity(product.id)
                    }
                    className="
                      flex
                      h-14
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      text-[#d7cdbb]
                      transition
                      hover:bg-[#c9a45c]/10
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                  >
                    <Plus size={15} />
                  </button>
                </div>

                {/* View cart */}
                <Link
                  to="/cart"
                  className="
                    group
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#c9a45c]
                    px-6
                    text-sm
                    font-medium
                    text-[#07110f]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#e0c27a]
                    hover:shadow-[0_15px_50px_rgba(201,164,92,0.2)]
                  "
                >
                  <ShoppingBag size={17} />

                  View cart

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            ) : (
              <button
                type="button"
                disabled={product.stock <= 0}
                onClick={() => addToCart(product)}
                className="
                  group
                  mt-8
                  flex
                  w-full
                  max-w-md
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#c9a45c]
                  px-7
                  py-4
                  text-sm
                  font-medium
                  text-[#07110f]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#e0c27a]
                  hover:shadow-[0_15px_50px_rgba(201,164,92,0.2)]
                  disabled:cursor-not-allowed
                  disabled:bg-[#c9a45c]/30
                "
              >
                <ShoppingBag size={18} />

                {product.stock > 0
                  ? "Add to cart"
                  : "Out of stock"}

                {product.stock > 0 && (
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            )}

            {/* Product benefits */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">

              <div className="
                rounded-2xl
                border
                border-[#c9a45c]/15
                bg-[#0c1a17]
                p-4
              ">
                <Check
                  size={15}
                  className="text-[#9aaa91]"
                />

                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#d7cdbb]">
                  Handmade
                </p>
              </div>

              <div className="
                rounded-2xl
                border
                border-[#c9a45c]/15
                bg-[#0c1a17]
                p-4
              ">
                <Check
                  size={15}
                  className="text-[#9aaa91]"
                />

                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#d7cdbb]">
                  Carefully packed
                </p>
              </div>

              <div className="
                rounded-2xl
                border
                border-[#c9a45c]/15
                bg-[#0c1a17]
                p-4
              ">
                <Check
                  size={15}
                  className="text-[#9aaa91]"
                />

                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#d7cdbb]">
                  Made in India
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED PRODUCTS
      ====================================================== */}

      {relatedProducts.length > 0 && (
        <section className="
          border-t
          border-[#c9a45c]/15
          bg-[#050c0a]
          px-6
          py-20
          sm:px-10
          lg:px-16
          lg:py-28
        ">
          <div className="mx-auto max-w-7xl">

            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a45c]/70">
                  You may also like
                </p>

                <h2 className="
                  mt-4
                  font-serif
                  text-3xl
                  tracking-[-0.04em]
                  text-[#f4ead8]
                  sm:text-4xl
                ">
                  More from the collection
                </h2>
              </div>

              <Link
                to="/shop"
                className="
                  group
                  hidden
                  items-center
                  gap-2
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#d7cdbb]/50
                  transition
                  hover:text-[#c9a45c]
                  sm:inline-flex
                "
              >
                View all

                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.slug}`}
                  className="group"
                >
                  <div className="
                    relative
                    overflow-hidden
                    rounded-[1.5rem]
                    border
                    border-[#c9a45c]/15
                    bg-[#0d1917]
                  ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        aspect-[4/5]
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    {item.customizable && (
                      <span className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        bg-[#c9a45c]
                        px-3
                        py-1.5
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-[#07110f]
                      ">
                        Customizable
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#c9a45c]/60">
                      {item.category}
                    </p>

                    <div className="mt-2 flex items-start justify-between gap-3">
                      <h3 className="
                        text-sm
                        font-medium
                        text-[#f4ead8]
                        transition
                        group-hover:text-[#c9a45c]
                      ">
                        {item.name}
                      </h3>

                      <span className="shrink-0 text-sm font-bold text-[#c9a45c]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          FINAL BRAND STATEMENT
      ====================================================== */}

      <section className="
        border-t
        border-[#c9a45c]/15
        bg-[#030807]
        px-6
        py-20
        text-[#f4ead8]
        sm:px-10
        lg:px-16
      ">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#c9a45c]">
            ResinArt
          </p>

          <h2 className="
            mt-5
            font-serif
            text-3xl
            font-medium
            leading-tight
            tracking-[-0.04em]
            sm:text-5xl
          ">
            Made slowly.
            <br />

            <span className="font-normal italic text-[#9aaa91]">
              Made to stay.
            </span>
          </h2>

          <p className="
            mx-auto
            mt-5
            max-w-lg
            text-sm
            leading-7
            text-[#d7cdbb]/45
          ">
            Every piece carries a little story.
            Choose something beautiful to keep.
          </p>

        </div>
      </section>
    </main>
  );
}

export default ProductDetails;