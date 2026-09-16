import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart } = useCart();

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 4);

  const categories = [
    {
      name: "Keychains",
      image: "/products/resin-keychain.jpeg",
      link: "/shop?category=Keychains",
    },
    {
      name: "Coasters",
      image: "/products/coaster.jpeg",
      link: "/shop?category=Coasters",
    },
    {
      name: "Trays",
      image: "/products/tray.jpeg",
      link: "/shop?category=Trays",
    },
    {
      name: "Bookmarks",
      image: "/products/bookmark.jpeg",
      link: "/shop?category=Bookmarks",
    },
    {
      name: "Custom Gifts",
      image: "/products/plaque.jpeg",
      link: "/custom",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#07120f] text-[#f4ead7]">

      {/* =========================================================
          ANNOUNCEMENT BAR
      ========================================================= */}
      <div className="border-b border-[#c9a45c]/20 bg-[#050908] px-4 py-2 text-center">
        <p className="text-[10px] font-medium tracking-[0.2em] text-[#c9a45c] sm:text-xs">
          HANDMADE WITH LOVE · CRAFTED IN INDIA
        </p>
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[720px] overflow-hidden border-b border-[#c9a45c]/15 bg-[#080b09]">

        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#12352d]/30 blur-[120px]" />
          <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#c9a45c]/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto grid min-h-[720px] max-w-[1500px] lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-16 xl:px-20">

            <div className="max-w-xl">

              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#c9a45c]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#c9a45c]">
                  Handmade Resin Art
                </p>
              </div>

              <h1 className="font-serif text-6xl leading-[0.92] tracking-[-0.04em] text-[#f5ead7] sm:text-7xl lg:text-[78px] xl:text-[88px]">
                Crafted
                <br />
                <span className="italic text-[#d7c5a3]">
                  for Eternity.
                </span>
              </h1>

              <p className="mt-8 max-w-lg text-base leading-7 text-[#b7b7ad] sm:text-lg">
                Premium handmade resin pieces that blend
                art, elegance and personality into something
                truly yours.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">

                <Link
                  to="/shop"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-sm
                    bg-[#c9a45c]
                    px-7
                    py-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#10100d]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#e0c27c]
                    hover:shadow-[0_15px_40px_rgba(201,164,92,0.2)]
                  "
                >
                  Shop Collection

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/custom"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-sm
                    border
                    border-[#c9a45c]/60
                    px-7
                    py-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#e3d5ba]
                    transition-all
                    duration-300
                    hover:bg-[#c9a45c]
                    hover:text-[#11110e]
                  "
                >
                  Custom Orders
                </Link>

              </div>

              {/* Mini benefits */}
              <div className="mt-12 grid max-w-xl grid-cols-2 gap-5 border-t border-[#c9a45c]/15 pt-7 sm:grid-cols-4">

                <MiniBenefit
                  icon={<Heart size={19} />}
                  text="Handmade"
                />

                <MiniBenefit
                  icon={<Sparkles size={19} />}
                  text="Premium"
                />

                <MiniBenefit
                  icon={<PackageCheck size={19} />}
                  text="Secure"
                />

                <MiniBenefit
                  icon={<Truck size={19} />}
                  text="Pan India"
                />

              </div>

            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative min-h-[500px] lg:min-h-full">

            <img
              src="/products/resin-keychain.jpeg"
              alt="Premium handmade resin art"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080b09] via-[#080b09]/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b09]/70 via-transparent to-[#080b09]/10" />

            {/* Image label */}
            <div className="absolute bottom-10 right-8 border border-[#c9a45c]/40 bg-[#07120f]/80 px-5 py-4 backdrop-blur-md sm:right-12">

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#c9a45c]">
                Resinart
              </p>

              <p className="mt-1 font-serif text-xl text-[#f1e6d1]">
                Art that stays.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}
      <section className="relative z-10 mx-auto -mt-1 max-w-7xl px-4 sm:px-8">

        <div className="grid overflow-hidden rounded-[1.5rem] border border-[#c9a45c]/20 bg-[#0b1b17]/95 shadow-2xl backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">

          <BenefitCard
            icon={<Sparkles size={23} />}
            title="Premium Materials"
            description="High quality resin and eco-friendly materials"
          />

          <BenefitCard
            icon={<Sparkles size={23} />}
            title="Customization"
            description="Personalized designs made just for you"
          />

          <BenefitCard
            icon={<ShieldCheck size={23} />}
            title="Secure Checkout"
            description="Safe and secure ordering experience"
          />

          <BenefitCard
            icon={<Heart size={23} />}
            title="Happy Customers"
            description="Loved by customers across India"
          />

        </div>

      </section>

      {/* =========================================================
          CATEGORY SECTION
      ========================================================= */}
      <section className="bg-[#07120f] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="Browse by Category"
            title="Find Your Perfect Piece"
          />

          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

            {categories.map((category) => (

              <Link
                key={category.name}
                to={category.link}
                className="group text-center"
              >

                <div className="relative mx-auto aspect-square max-w-[220px] overflow-hidden rounded-full border border-[#c9a45c]/50 p-1 transition-all duration-500 group-hover:border-[#e0c27c] group-hover:shadow-[0_0_40px_rgba(201,164,92,0.12)]">

                  <div className="h-full w-full overflow-hidden rounded-full">

                    <img
                      src={category.image}
                      alt={category.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    <div className="absolute inset-1 rounded-full bg-black/10 transition group-hover:bg-black/0" />

                  </div>

                </div>

                <h3 className="mt-5 font-serif text-xl text-[#e7d9bf]">
                  {category.name}
                </h3>

                <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.25em] text-[#c9a45c]">
                  Shop Now
                </p>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          FEATURED COLLECTION
      ========================================================= */}
      <section className="border-t border-[#c9a45c]/10 bg-[#091613] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="Featured Collection"
            title="Our Bestsellers"
          />

          {featuredProducts.length > 0 ? (

            <div className="relative mt-14">

              {/* Desktop arrows */}
              <button
                type="button"
                className="absolute -left-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c9a45c]/50 bg-[#07120f] text-[#c9a45c] lg:flex"
              >
                <ChevronLeft size={19} />
              </button>

              <button
                type="button"
                className="absolute -right-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#c9a45c]/50 bg-[#07120f] text-[#c9a45c] lg:flex"
              >
                <ChevronRight size={19} />
              </button>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {featuredProducts.map((product, index) => (

                  <div
                    key={product.id}
                    className="
                      group
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#c9a45c]/40
                      bg-[#0b1915]
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:border-[#d9b96c]
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                    "
                  >

                    {/* Image */}
                    <Link
                      to={`/product/${product.slug}`}
                      className="relative block aspect-[4/4.5] overflow-hidden"
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      {/* Badge */}
                      <span className="absolute left-3 top-3 rounded-sm bg-[#c9a45c] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-[#11110e]">
                        {index === 1 ? "New" : "Bestseller"}
                      </span>

                      {product.customizable && (
                        <span className="absolute right-3 top-3 rounded-sm bg-[#07120f]/90 px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.15em] text-[#e4d5b9] backdrop-blur-sm">
                          Custom
                        </span>
                      )}

                    </Link>

                    {/* Product info */}
                    <div className="p-5">

                      <Link
                        to={`/product/${product.slug}`}
                        className="block"
                      >

                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#9b8b6c]">
                          {product.category}
                        </p>

                        <h3 className="mt-2 min-h-[48px] font-serif text-lg leading-tight text-[#eadfc9] transition-colors group-hover:text-[#d9b96c]">
                          {product.name}
                        </h3>

                      </Link>

                      <div className="mt-4 flex items-center justify-between gap-3">

                        <p className="text-base font-semibold text-[#f0dfbd]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          disabled={product.stock <= 0}
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-[#c9a45c]/60
                            text-[#d9b96c]
                            transition-all
                            hover:bg-[#c9a45c]
                            hover:text-[#10100d]
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                          "
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <PackageCheck size={18} />
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* Slider dots */}
              <div className="mt-8 flex justify-center gap-2">

                <span className="h-1.5 w-8 rounded-full bg-[#c9a45c]" />
                <span className="h-1.5 w-2 rounded-full bg-[#5d655e]" />
                <span className="h-1.5 w-2 rounded-full bg-[#5d655e]" />

              </div>

            </div>

          ) : (

            <div className="mt-12 rounded-xl border border-[#c9a45c]/20 bg-[#0b1915] p-12 text-center">
              <p className="text-[#9b9b91]">
                Featured products will appear here.
              </p>
            </div>

          )}

          <div className="mt-12 text-center">

            <Link
              to="/shop"
              className="
                inline-flex
                items-center
                gap-3
                border-b
                border-[#c9a45c]
                pb-2
                text-xs
                font-medium
                uppercase
                tracking-[0.2em]
                text-[#d9b96c]
                transition-colors
                hover:text-[#f0dfbd]
              "
            >
              View All Products
              <ArrowRight size={15} />
            </Link>

          </div>

        </div>

      </section>

      {/* =========================================================
          CUSTOM ORDERS
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-[#c9a45c]/15 bg-[#050b09] px-6 py-24 sm:px-10 lg:px-16 lg:py-28">

        <div className="absolute right-0 top-0 h-full w-1/2 bg-[#12352d]/20 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#c9a45c]">
              Your idea · Your piece
            </p>

            <h2 className="mt-6 font-serif text-5xl leading-tight text-[#f0e4cf] sm:text-6xl">
              Make it
              <br />
              <span className="italic text-[#c9a45c]">
                personal.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#a9aaa2]">
              Turn your memories, names, dates and special moments
              into a one-of-a-kind resin piece designed especially
              for you.
            </p>

            <Link
              to="/custom"
              className="
                group
                mt-9
                inline-flex
                items-center
                gap-3
                rounded-sm
                bg-[#c9a45c]
                px-7
                py-4
                text-xs
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#11110e]
                transition-all
                hover:-translate-y-1
                hover:bg-[#e0c27c]
              "
            >
              Start Custom Order

              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="overflow-hidden rounded-xl border border-[#c9a45c]/30">
              <img
                src="/products/plaque.jpeg"
                alt="Personalized resin plaque"
                className="aspect-[4/5] h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="mt-10 overflow-hidden rounded-xl border border-[#c9a45c]/30">
              <img
                src="/products/tray.jpeg"
                alt="Custom resin tray"
                className="aspect-[4/5] h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          BRAND STATEMENT
      ========================================================= */}
      <section className="bg-[#07120f] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">

        <div className="mx-auto max-w-4xl text-center">

          <Leaf
            className="mx-auto text-[#c9a45c]"
            size={28}
            strokeWidth={1}
          />

          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#9a8b70]">
            Resinart
          </p>

          <h2 className="mt-6 font-serif text-4xl leading-tight text-[#eadfc9] sm:text-5xl lg:text-6xl">
            Objects made to become
            <br />
            <span className="italic text-[#c9a45c]">
              memories.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#999d96]">
            Handmade in India, one piece at a time.
            Designed to be gifted, remembered and kept.
          </p>

        </div>

      </section>

      {/* =========================================================
          TRUST STRIP
      ========================================================= */}
      <section className="border-t border-[#c9a45c]/15 bg-[#06100d]">

        <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">

          <TrustItem
            icon={<Sparkles size={22} />}
            title="Made in India"
            text="Proudly handcrafted by skilled artisans"
          />

          <TrustItem
            icon={<Leaf size={22} />}
            title="Eco Friendly"
            text="Thoughtfully selected materials"
          />

          <TrustItem
            icon={<Truck size={22} />}
            title="Safe Delivery"
            text="Carefully packed and delivered with love"
          />

          <TrustItem
            icon={<ShieldCheck size={22} />}
            title="Support 24/7"
            text="We're here to help you anytime"
          />

        </div>

      </section>

    </main>
  );
}

/* =============================================================
   COMPONENTS
============================================================= */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="text-center">

      <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#c9a45c]">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-serif text-4xl tracking-[-0.02em] text-[#eadfc9] sm:text-5xl">
        {title}
      </h2>

      <div className="mx-auto mt-5 flex items-center justify-center gap-2">
        <span className="h-px w-16 bg-[#c9a45c]/30" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[#c9a45c]" />
        <span className="h-px w-16 bg-[#c9a45c]/30" />
      </div>

    </div>
  );
}

function MiniBenefit({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[#d2c6af]">
      <span className="text-[#c9a45c]">
        {icon}
      </span>

      <span className="text-[9px] uppercase tracking-[0.12em]">
        {text}
      </span>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-[#c9a45c]/10 p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/50 text-[#c9a45c]">
        {icon}
      </div>

      <div>
        <h3 className="font-serif text-base text-[#e7dbc5]">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#92978f]">
          {description}
        </p>
      </div>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 border-b border-[#c9a45c]/10 px-6 py-8 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a45c]/40 text-[#c9a45c]">
        {icon}
      </div>

      <div>
        <h3 className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#d9c69f]">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-[#858b84]">
          {text}
        </p>
      </div>

    </div>
  );
}

export default Home;