import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { user } = useAuth();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [categoryOpen, setCategoryOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const categories = [
    {
      name: "Coasters",
      slug: "Coasters",
    },
    {
      name: "Trays",
      slug: "Trays",
    },
    {
      name: "Keychains",
      slug: "Keychains",
    },
    {
      name: "Bookmarks",
      slug: "Bookmarks",
    },
    {
      name: "Custom Gifts",
      slug: "Custom Gifts",
    },
  ];

  /* =========================================
     SEARCH
  ========================================== */

  const handleSearch = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(
      `/shop?search=${encodeURIComponent(query)}`
    );

    setSearchOpen(false);
    setSearchQuery("");
  };

  /* =========================================
     CLOSE MOBILE
  ========================================== */

  const closeMobile = () => {
    setMobileOpen(false);
    setCategoryOpen(false);
  };

  /* =========================================
     ACCOUNT DESTINATION
  ========================================== */

  const accountPath = user
    ? "/account"
    : "/login";

  return (
    <>
      {/* =========================================
          NAVBAR
      ========================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#c8a96b]/15
          bg-[#071b1a]/95
          text-[#f3eee3]
          backdrop-blur-xl
        "
      >
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">

          <div className="flex h-[82px] items-center justify-between">

            {/* =====================================
                LOGO
            ====================================== */}

            <Link
              to="/"
              onClick={closeMobile}
              className="group flex shrink-0 items-center"
            >
              <div>

                <p
                  className="
                    text-[23px]
                    font-semibold
                    uppercase
                    leading-none
                    tracking-[0.16em]
                    text-[#f3eee3]
                    transition-colors
                    duration-300
                    group-hover:text-[#c8a96b]
                  "
                >
                  Resinart
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-px w-5 bg-[#c8a96b]" />

                  <p
                    className="
                      text-[7px]
                      font-medium
                      uppercase
                      tracking-[0.35em]
                      text-[#b8b2a5]
                    "
                  >
                    Handmade Design Studio
                  </p>

                </div>

              </div>
            </Link>


            {/* =====================================
                DESKTOP NAVIGATION
            ====================================== */}

            <nav
              className="
                hidden
                items-center
                gap-9
                lg:flex
              "
            >

              {/* Shop */}

              <Link
                to="/shop"
                className="
                  relative
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[#b8b2a5]
                  transition
                  duration-300
                  hover:text-[#c8a96b]
                  after:absolute
                  after:-bottom-2
                  after:left-0
                  after:h-px
                  after:w-0
                  after:bg-[#c8a96b]
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                Shop
              </Link>


              {/* Categories */}

              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setCategoryOpen(
                      (current) => !current
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-[#b8b2a5]
                    transition
                    duration-300
                    hover:text-[#c8a96b]
                  "
                >
                  Categories

                  <ChevronDown
                    size={13}
                    strokeWidth={1.5}
                    className={`transition-transform duration-300 ${
                      categoryOpen
                        ? "rotate-180 text-[#c8a96b]"
                        : ""
                    }`}
                  />
                </button>


                {/* Category dropdown */}

                {categoryOpen && (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-full
                      mt-5
                      w-60
                      -translate-x-1/2
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#c8a96b]/20
                      bg-[#0d3431]
                      p-2
                      shadow-2xl
                      shadow-black/40
                    "
                  >

                    <div className="px-4 pb-2 pt-3">

                      <p
                        className="
                          text-[8px]
                          uppercase
                          tracking-[0.3em]
                          text-[#c8a96b]
                        "
                      >
                        Collections
                      </p>

                    </div>


                    {/* All Products */}

                    <Link
                      to="/shop"
                      onClick={() =>
                        setCategoryOpen(false)
                      }
                      className="
                        block
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-[#f3eee3]
                        transition
                        duration-300
                        hover:bg-[#c8a96b]/10
                        hover:text-[#c8a96b]
                      "
                    >
                      All Products
                    </Link>

                    <div className="my-1 h-px bg-[#c8a96b]/10" />


                    {/* Categories */}

                    {categories.map(
                      (category) => (
                        <Link
                          key={category.slug}
                          to={`/shop?category=${encodeURIComponent(
                            category.slug
                          )}`}
                          onClick={() =>
                            setCategoryOpen(false)
                          }
                          className="
                            block
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            text-[#b8b2a5]
                            transition
                            duration-300
                            hover:bg-[#c8a96b]/10
                            hover:text-[#f3eee3]
                          "
                        >
                          {category.name}
                        </Link>
                      )
                    )}

                  </div>
                )}

              </div>


              {/* Custom Orders */}

              <Link
                to="/custom"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[#b8b2a5]
                  transition
                  duration-300
                  hover:text-[#c8a96b]
                "
              >

                <Sparkles
                  size={13}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    duration-300
                    group-hover:rotate-12
                  "
                />

                Custom Orders

              </Link>

            </nav>


            {/* =====================================
                RIGHT ACTIONS
            ====================================== */}

            <div className="flex shrink-0 items-center gap-1">

              {/* =================================
                  SEARCH
              ================================== */}

              <button
                type="button"
                onClick={() =>
                  setSearchOpen(
                    (current) => !current
                  )
                }
                aria-label="Search"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[#b8b2a5]
                  transition-all
                  duration-300
                  hover:bg-[#c8a96b]/10
                  hover:text-[#c8a96b]
                "
              >

                {searchOpen ? (
                  <X
                    size={19}
                    strokeWidth={1.5}
                  />
                ) : (
                  <Search
                    size={19}
                    strokeWidth={1.5}
                  />
                )}

              </button>


              {/* =================================
                  ACCOUNT / SIGN IN
              ================================== */}

              <Link
                to={accountPath}
                aria-label={
                  user
                    ? "My account"
                    : "Sign in"
                }
                className="
                  flex
                  h-11
                  shrink-0
                  items-center
                  gap-2
                  rounded-full
                  px-3
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-[#b8b2a5]
                  transition-all
                  duration-300
                  hover:bg-[#c8a96b]/10
                  hover:text-[#c8a96b]
                "
              >

                <User
                  size={19}
                  strokeWidth={1.5}
                />

                <span className="hidden xl:inline whitespace-nowrap">
                  {user
                    ? "Account"
                    : "Sign In"}
                </span>

              </Link>


              {/* =================================
                  CART
              ================================== */}

              <Link
                to="/cart"
                aria-label={`Cart with ${cartCount} items`}
                className="
                  group
                  relative
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[#b8b2a5]
                  transition-all
                  duration-300
                  hover:bg-[#c8a96b]/10
                  hover:text-[#c8a96b]
                "
              >

                <ShoppingBag
                  size={19}
                  strokeWidth={1.5}
                />

                {/* Cart badge */}

                {cartCount > 0 && (
                  <span
                    className="
                      absolute
                      right-0
                      top-0
                      flex
                      h-[18px]
                      min-w-[18px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#071b1a]
                      bg-[#c8a96b]
                      px-1
                      text-[8px]
                      font-bold
                      leading-none
                      text-[#071b1a]
                    "
                  >
                    {cartCount > 99
                      ? "99+"
                      : cartCount}
                  </span>
                )}

              </Link>


              {/* =================================
                  MOBILE MENU
              ================================== */}

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(
                    (current) => !current
                  )
                }
                aria-label={
                  mobileOpen
                    ? "Close menu"
                    : "Open menu"
                }
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[#b8b2a5]
                  transition
                  duration-300
                  hover:bg-[#c8a96b]/10
                  hover:text-[#c8a96b]
                  lg:hidden
                "
              >

                {mobileOpen ? (
                  <X
                    size={20}
                    strokeWidth={1.5}
                  />
                ) : (
                  <Menu
                    size={20}
                    strokeWidth={1.5}
                  />
                )}

              </button>

            </div>

          </div>

        </div>


        {/* =========================================
            SEARCH PANEL
        ========================================== */}

        {searchOpen && (
          <div
            className="
              border-t
              border-[#c8a96b]/15
              bg-[#0d3431]
            "
          >

            <div
              className="
                mx-auto
                max-w-3xl
                px-5
                py-6
                sm:px-8
              "
            >

              <form
                onSubmit={handleSearch}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-[#c8a96b]/20
                  bg-[#071b1a]
                  px-4
                  py-3
                  transition
                  focus-within:border-[#c8a96b]/50
                "
              >

                <Search
                  size={18}
                  className="shrink-0 text-[#c8a96b]"
                  strokeWidth={1.5}
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search resin products..."
                  autoFocus
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    text-sm
                    text-[#f3eee3]
                    outline-none
                    placeholder:text-[#b8b2a5]/40
                  "
                />

                <button
                  type="submit"
                  className="
                    rounded-full
                    bg-[#c8a96b]
                    px-5
                    py-2
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#071b1a]
                    transition
                    duration-300
                    hover:bg-[#f3eee3]
                  "
                >
                  Search
                </button>

              </form>

            </div>

          </div>
        )}


        {/* =========================================
            MOBILE MENU
        ========================================== */}

        {mobileOpen && (
          <div
            className="
              border-t
              border-[#c8a96b]/15
              bg-[#071b1a]
              lg:hidden
            "
          >

            <div className="px-5 py-7 sm:px-8">

              <nav className="space-y-1">

                {/* =================================
                    SHOP
                ================================== */}

                <Link
                  to="/shop"
                  onClick={closeMobile}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-4
                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#f3eee3]
                    transition
                    duration-300
                    hover:bg-[#c8a96b]/10
                    hover:text-[#c8a96b]
                  "
                >
                  Shop

                  <span className="text-[#c8a96b]">
                    →
                  </span>
                </Link>


                {/* =================================
                    CATEGORIES
                ================================== */}

                <button
                  type="button"
                  onClick={() =>
                    setCategoryOpen(
                      (current) => !current
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-4
                    text-left
                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#f3eee3]
                    transition
                    duration-300
                    hover:bg-[#c8a96b]/10
                    hover:text-[#c8a96b]
                  "
                >

                  <span>
                    Categories
                  </span>

                  <ChevronDown
                    size={17}
                    strokeWidth={1.5}
                    className={`transition-transform ${
                      categoryOpen
                        ? "rotate-180 text-[#c8a96b]"
                        : ""
                    }`}
                  />

                </button>


                {/* Mobile categories */}

                {categoryOpen && (
                  <div
                    className="
                      ml-4
                      border-l
                      border-[#c8a96b]/20
                      pl-3
                    "
                  >

                    <Link
                      to="/shop"
                      onClick={closeMobile}
                      className="
                        block
                        rounded-lg
                        px-4
                        py-3
                        text-sm
                        text-[#b8b2a5]
                        transition
                        hover:bg-[#c8a96b]/10
                        hover:text-[#c8a96b]
                      "
                    >
                      All Products
                    </Link>

                    {categories.map(
                      (category) => (
                        <Link
                          key={category.slug}
                          to={`/shop?category=${encodeURIComponent(
                            category.slug
                          )}`}
                          onClick={closeMobile}
                          className="
                            block
                            rounded-lg
                            px-4
                            py-3
                            text-sm
                            text-[#b8b2a5]
                            transition
                            hover:bg-[#c8a96b]/10
                            hover:text-[#c8a96b]
                          "
                        >
                          {category.name}
                        </Link>
                      )
                    )}

                  </div>
                )}


                {/* =================================
                    CUSTOM ORDERS
                ================================== */}

                <Link
                  to="/custom"
                  onClick={closeMobile}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-4
                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#f3eee3]
                    transition
                    duration-300
                    hover:bg-[#c8a96b]/10
                    hover:text-[#c8a96b]
                  "
                >

                  <span className="flex items-center gap-2">

                    <Sparkles
                      size={16}
                      strokeWidth={1.5}
                    />

                    Custom Orders

                  </span>

                  <span className="text-[#c8a96b]">
                    →
                  </span>

                </Link>


                {/* =================================
                    ACCOUNT / SIGN IN
                ================================== */}

                <Link
                  to={accountPath}
                  onClick={closeMobile}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-4
                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#f3eee3]
                    transition
                    duration-300
                    hover:bg-[#c8a96b]/10
                    hover:text-[#c8a96b]
                  "
                >

                  <span className="flex items-center gap-3">

                    <User
                      size={18}
                      strokeWidth={1.5}
                    />

                    {user
                      ? "My Account"
                      : "Sign In"}

                  </span>

                  <span className="text-[#c8a96b]">
                    →
                  </span>

                </Link>


                {/* =================================
                    CART
                ================================== */}

                <Link
                  to="/cart"
                  onClick={closeMobile}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-4
                    text-sm
                    font-medium
                    uppercase
                    tracking-[0.15em]
                    text-[#f3eee3]
                    transition
                    duration-300
                    hover:bg-[#c8a96b]/10
                    hover:text-[#c8a96b]
                  "
                >

                  <span className="flex items-center gap-3">

                    <ShoppingBag
                      size={18}
                      strokeWidth={1.5}
                    />

                    Cart

                  </span>

                  {cartCount > 0 && (
                    <span
                      className="
                        flex
                        h-7
                        min-w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-[#c8a96b]
                        px-2
                        text-[10px]
                        font-bold
                        text-[#071b1a]
                      "
                    >
                      {cartCount > 99
                        ? "99+"
                        : cartCount}
                    </span>
                  )}

                </Link>

              </nav>


              {/* =================================
                  MOBILE SEARCH
              ================================== */}

              <div
                className="
                  mt-6
                  border-t
                  border-[#c8a96b]/15
                  pt-6
                "
              >

                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileOpen(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-[#c8a96b]/15
                    bg-[#0d3431]
                    px-4
                    py-4
                    text-sm
                    text-[#b8b2a5]
                    transition
                    hover:border-[#c8a96b]/40
                    hover:text-[#f3eee3]
                  "
                >

                  <Search
                    size={18}
                    className="text-[#c8a96b]"
                    strokeWidth={1.5}
                  />

                  Search products

                </button>

              </div>

            </div>

          </div>
        )}

      </header>
    </>
  );
}

export default Navbar;