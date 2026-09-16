import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search as SearchIcon, X } from "lucide-react";

import { products } from "../data/products";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    });
  }, [query]);

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value = query.trim();

    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-16 text-[#241d19] sm:px-10 lg:px-16 lg:py-24">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="max-w-3xl">

          <p className="text-[10px] uppercase tracking-[0.35em] text-[#756b63]">
            Search
          </p>

          <h1 className="mt-5 text-5xl font-medium tracking-[-0.05em] sm:text-6xl">
            Find your piece.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#756b63]">
            Search our handmade resin collection by product,
            category or description.
          </p>

        </div>


        {/* SEARCH FORM */}

        <form
          onSubmit={handleSearch}
          className="mt-10 flex max-w-3xl items-center gap-3"
        >

          <div className="relative flex-1">

            <SearchIcon
              size={19}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-black/40"
            />

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search keychains, coasters, trays..."
              className="
                h-14
                w-full
                rounded-full
                border
                border-black/10
                bg-white
                pl-12
                pr-12
                text-sm
                outline-none
                transition
                focus:border-black/30
              "
            />

            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="
                  absolute
                  right-4
                  top-1/2
                  flex
                  h-8
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  text-black/40
                  transition
                  hover:bg-black/5
                  hover:text-black
                "
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

          </div>

          <button
            type="submit"
            className="
              hidden
              h-14
              rounded-full
              bg-[#2b211c]
              px-7
              text-sm
              font-medium
              text-white
              transition
              hover:-translate-y-0.5
              hover:bg-[#7a8b72]
              sm:block
            "
          >
            Search
          </button>

        </form>


        {/* RESULTS */}

        {query.trim() && (
          <div className="mt-14">

            <div className="flex items-end justify-between border-b border-black/10 pb-5">

              <div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#756b63]">
                  Search results
                </p>

                <h2 className="mt-2 text-xl font-medium">
                  {results.length}{" "}
                  {results.length === 1
                    ? "piece"
                    : "pieces"}{" "}
                  found
                </h2>

              </div>

              <button
                type="button"
                onClick={clearSearch}
                className="text-xs text-black/40 transition hover:text-black"
              >
                Clear
              </button>

            </div>


            {results.length > 0 ? (

              <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

                {results.map((product) => (

                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="group"
                  >

                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#eeeae3]">

                      <img
                        src={product.image}
                        alt={product.name}
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

                      {product.customizable && (
                        <span className="
                          absolute
                          left-4
                          top-4
                          rounded-full
                          bg-[#d6b77a]
                          px-3
                          py-1.5
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.18em]
                          text-[#2b211c]
                        ">
                          Customizable
                        </span>
                      )}

                    </div>


                    <div className="mt-5">

                      <div className="flex items-center justify-between gap-3">

                        <p className="text-[9px] uppercase tracking-[0.25em] text-[#756b63]">
                          {product.category}
                        </p>

                        <span className="text-sm font-bold text-[#2b211c]">
                          ₹
                          {product.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      <h3 className="mt-2 text-base font-medium">
                        {product.name}
                      </h3>

                    </div>

                  </Link>

                ))}

              </div>

            ) : (

              <div className="border-y border-black/10 py-24 text-center">

                <p className="text-[10px] uppercase tracking-[0.3em] text-black/35">
                  No results
                </p>

                <h2 className="mt-4 text-3xl font-medium">
                  We couldn't find that piece.
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/50">
                  Try searching for a keychain, coaster,
                  tray, bookmark or another product.
                </p>

                <Link
                  to="/shop"
                  className="
                    group
                    mt-8
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-[#2b211c]
                    px-7
                    py-4
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:-translate-y-1
                    hover:bg-[#7a8b72]
                  "
                >
                  Browse collection

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

              </div>

            )}

          </div>
        )}


        {/* DEFAULT STATE */}

        {!query.trim() && (
          <section className="mt-16 border-t border-black/10 pt-12">

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#756b63]">
              Popular categories
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              {[
                "Coasters",
                "Trays",
                "Keychains",
                "Bookmarks",
                "Custom Gifts",
              ].map((category) => (

                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setQuery(category);
                    setSearchParams({
                      q: category,
                    });
                  }}
                  className="
                    rounded-full
                    border
                    border-black/10
                    bg-white
                    px-5
                    py-3
                    text-sm
                    text-black/60
                    transition
                    hover:border-black/30
                    hover:bg-black/[0.03]
                    hover:text-black
                  "
                >
                  {category}
                </button>

              ))}

            </div>

          </section>
        )}

      </div>

    </main>
  );
}

export default Search;