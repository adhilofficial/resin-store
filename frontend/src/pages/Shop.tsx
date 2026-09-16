import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  X,
  Check,
} from "lucide-react";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function Shop() {
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  /*
   * Categories
   */
  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(products.map((product) => product.category))
      ),
    ];
  }, []);

  /*
   * Filter + Search + Sort
   */
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    /*
     * Always create a new array before sorting.
     */
    result = [...result];

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "featured":
      default:
        result.sort(
          (a, b) =>
            Number(b.featured) - Number(a.featured)
        );
        break;
    }

    return result;
  }, [search, category, sort]);

  /*
   * Add product to cart
   */
  const handleAddToCart = (
    product: (typeof products)[number]
  ) => {
    addToCart(product);

    setAddedProduct(product.id);

    window.setTimeout(() => {
      setAddedProduct(null);
    }, 1500);
  };

  /*
   * Clear filters
   */
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("featured");
  };

  return (
    <main className="min-h-screen bg-[#07110f] text-[#f4ead8]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#c9a45c]/20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#c9a45c]/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="max-w-3xl">

            <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#c9a45c]">
              The ResinArt Collection
            </p>

            <h1 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#f4ead8] sm:text-6xl lg:text-8xl">
              Objects made
              <br />
              <span className="italic text-[#c9a45c]">
                to last.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#d7cdbb]/65 sm:text-base">
              Discover handcrafted resin pieces created
              in small batches. Designed with intention,
              finished by hand and made to become part of
              your story.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <section className="sticky top-0 z-30 border-b border-[#c9a45c]/15 bg-[#07110f]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">

          <div className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Categories */}

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`
                    shrink-0
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    transition-all
                    duration-300

                    ${
                      category === item
                        ? "border-[#c9a45c] bg-[#c9a45c] text-[#07110f]"
                        : "border-[#c9a45c]/20 text-[#d7cdbb]/60 hover:border-[#c9a45c]/60 hover:text-[#f4ead8]"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Search + Sort */}

            <div className="flex gap-3">

              {/* Search */}

              <div className="relative flex-1 lg:w-64 lg:flex-none">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d7cdbb]/40"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search pieces..."
                  className="
                    h-11
                    w-full
                    rounded-full
                    border
                    border-[#c9a45c]/20
                    bg-[#0c1a17]
                    pl-11
                    pr-10
                    text-sm
                    text-[#f4ead8]
                    outline-none
                    placeholder:text-[#d7cdbb]/30
                    focus:border-[#c9a45c]
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d7cdbb]/40 transition hover:text-[#f4ead8]"
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Sort */}

              <div className="relative">
                <SlidersHorizontal
                  size={15}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a45c]"
                />

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#d7cdbb]/40"
                />

                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
                  }
                  className="
                    h-11
                    appearance-none
                    rounded-full
                    border
                    border-[#c9a45c]/20
                    bg-[#0c1a17]
                    pl-10
                    pr-10
                    text-xs
                    text-[#f4ead8]
                    outline-none
                    focus:border-[#c9a45c]
                  "
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="name">
                    Name
                  </option>
                </select>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">

        {/* Heading */}

        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a45c]/70">
              Our collection
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#f4ead8] sm:text-4xl">
              All pieces
            </h2>
          </div>

          <p className="text-xs text-[#d7cdbb]/45">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "piece"
              : "pieces"}
          </p>

        </div>

        {/* Empty State */}

        {filteredProducts.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-[#c9a45c]/15 bg-[#0b1916] px-6 text-center">

            <Search
              size={32}
              strokeWidth={1}
              className="text-[#c9a45c]/60"
            />

            <h3 className="mt-6 font-serif text-2xl">
              No pieces found
            </h3>

            <p className="mt-3 max-w-md text-sm text-[#d7cdbb]/45">
              Try another search term or browse our full
              collection.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-7
                rounded-full
                border
                border-[#c9a45c]
                px-6
                py-3
                text-xs
                font-medium
                uppercase
                tracking-[0.15em]
                text-[#c9a45c]
                transition
                hover:bg-[#c9a45c]
                hover:text-[#07110f]
              "
            >
              View all pieces
            </button>

          </div>
        ) : (

          /* Product Grid */

          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (

              <article
                key={product.id}
                className="group"
              >

                {/* Product Image */}

                <Link
                  to={`/product/${product.slug}`}
                  className="
                    relative
                    block
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#c9a45c]/20
                    bg-[#0d1917]
                  "
                >

                  <div className="aspect-[4/5]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  </div>

                  {/* Image Overlay */}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Bestseller */}

                  {product.featured && (
                    <span
                      className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        border
                        border-[#c9a45c]/60
                        bg-[#07110f]/85
                        px-3
                        py-1.5
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-[#c9a45c]
                        backdrop-blur-md
                      "
                    >
                      Bestseller
                    </span>
                  )}

                  {/* Custom Badge */}

                  {product.customizable &&
                    !product.featured && (
                      <span
                        className="
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
                        "
                      >
                        Custom
                      </span>
                    )}

                  {/* Quick View */}

                  <span
                    className="
                      absolute
                      bottom-4
                      right-4
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-[#07110f]/70
                      text-white
                      opacity-0
                      backdrop-blur-md
                      transition-all
                      duration-300
                      group-hover:opacity-100
                    "
                  >
                    <ArrowRight size={16} />
                  </span>

                </Link>

                {/* Product Details */}

                <div className="pt-5">

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="text-[9px] uppercase tracking-[0.22em] text-[#c9a45c]/65">
                        {product.category}
                      </p>

                      <Link
                        to={`/product/${product.slug}`}
                        className="
                          mt-2
                          block
                          truncate
                          font-serif
                          text-lg
                          text-[#f4ead8]
                          transition
                          hover:text-[#c9a45c]
                        "
                      >
                        {product.name}
                      </Link>

                    </div>

                    <p className="shrink-0 text-base font-semibold text-[#c9a45c]">
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#d7cdbb]/45">
                    {product.description}
                  </p>

                  {/* Stock */}

                  <div className="mt-3">

                    {product.stock > 0 &&
                    product.stock <= 5 ? (
                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#c9a45c]">
                        Only {product.stock} left
                      </p>
                    ) : product.stock > 0 ? (
                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#d7cdbb]/40">
                        In stock
                      </p>
                    ) : (
                      <p className="text-[9px] uppercase tracking-[0.15em] text-red-400">
                        Out of stock
                      </p>
                    )}

                  </div>

                  {/* Add To Cart */}

                  <button
                    type="button"
                    disabled={product.stock <= 0}
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className="
                      mt-5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-[#c9a45c]/30
                      bg-transparent
                      px-4
                      py-3
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-[#f4ead8]
                      transition-all
                      duration-300
                      hover:border-[#c9a45c]
                      hover:bg-[#c9a45c]
                      hover:text-[#07110f]
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                  >

                    {addedProduct === product.id ? (
                      <>
                        <Check size={14} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />

                        {product.stock > 0
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </>
                    )}

                  </button>

                </div>

              </article>

            ))}

          </div>
        )}

      </section>

      {/* =====================================================
          CUSTOM ORDER CTA
      ===================================================== */}

      <section className="border-t border-[#c9a45c]/15 bg-[#050c0a]">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-10">

          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a45c]">
            Made especially for you
          </p>

          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#f4ead8] sm:text-5xl">
            Can't find exactly what
            <br />

            <span className="italic text-[#c9a45c]">
              you're looking for?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#d7cdbb]/50">
            Create a one-of-a-kind resin piece designed
            around your name, memories, colours or special
            occasion.
          </p>

          <Link
            to="/custom"
            className="
              group
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#c9a45c]
              px-7
              py-4
              text-xs
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#07110f]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#e0c27a]
              hover:shadow-[0_15px_50px_rgba(201,164,92,0.2)]
            "
          >
            Create Custom Order

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Shop;