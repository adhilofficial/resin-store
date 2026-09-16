import { useState } from "react";
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const [isLiked, setIsLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <article className="group">

      {/* Product image */}
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#eeeae3]">

        <Link
          to={`/product/${product.slug}`}
          className="block"
        >
          <img
            src={product.image}
            alt={product.name}
            className="
              aspect-square
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.04]
            "
            loading="lazy"
          />
        </Link>

        {/* New badge */}
        <span
          className="
            absolute
            left-4
            top-4
            rounded-full
            bg-[#d6b77a]
            px-3
            py-1.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#2b211c]
            shadow-sm
          "
        >
          New
        </span>

        {/* Customizable badge */}
        {product.customizable && (
          <span
            className="
              absolute
              bottom-4
              left-4
              rounded-full
              bg-white/95
              px-3
              py-1.5
              text-[9px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-[#2b211c]
              shadow-sm
              backdrop-blur
            "
          >
            Customizable
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsLiked((current) => !current)}
          aria-label={
            isLiked
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-[#2b211c]
            shadow-sm
            backdrop-blur
            transition-all
            duration-300
            hover:scale-105
          "
        >
          <Heart
            size={17}
            strokeWidth={1.7}
            fill={isLiked ? "currentColor" : "none"}
            className={
              isLiked
                ? "text-[#c98262]"
                : "text-[#2b211c]"
            }
          />
        </button>

        {/* Quick view */}
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="
            absolute
            bottom-4
            right-4
            flex
            h-10
            w-10
            translate-y-3
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#2b211c]
            opacity-0
            shadow-lg
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight
            size={17}
            strokeWidth={1.7}
          />
        </Link>

      </div>

      {/* Product information */}
      <div className="px-1 pt-5">

        {/* Category + price */}
        <div className="flex items-center justify-between gap-4">

          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-[#756b63]
            "
          >
            {product.category}
          </p>

          <p
            className="
              shrink-0
              text-base
              font-bold
              tracking-[-0.02em]
              text-[#2b211c]
            "
          >
            ₹{product.price.toLocaleString("en-IN")}
          </p>

        </div>

        {/* Name */}
        <Link
          to={`/product/${product.slug}`}
          className="
            mt-3
            block
            text-[19px]
            font-medium
            leading-tight
            tracking-[-0.025em]
            text-[#241d19]
            transition-colors
            duration-300
            group-hover:text-[#7a8b72]
          "
        >
          {product.name}
        </Link>

        {/* Description */}
        <p
          className="
            mt-2.5
            line-clamp-2
            max-w-sm
            text-sm
            leading-6
            text-[#756b63]
          "
        >
          {product.description}
        </p>

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2.5
            rounded-full
            bg-[#2b211c]
            px-5
            py-3.5
            text-xs
            font-medium
            uppercase
            tracking-[0.15em]
            text-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#7a8b72]
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          <ShoppingBag
            size={15}
            strokeWidth={1.7}
          />

          {added ? "Added to Cart ✓" : "Add to Cart"}
        </button>

      </div>

    </article>
  );
}

export default ProductCard;