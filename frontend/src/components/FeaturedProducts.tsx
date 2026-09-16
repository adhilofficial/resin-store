import { products } from "../data/products";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <section className="border-t border-black/5 px-6 py-24 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              Featured collection
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Our favorites.
            </h2>
          </div>

          <a
            href="/shop"
            className="text-sm underline underline-offset-4"
          >
            View all products
          </a>

        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;