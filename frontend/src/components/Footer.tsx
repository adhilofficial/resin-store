import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#031b18] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="inline-block text-lg font-semibold tracking-[0.15em] text-white transition-opacity hover:opacity-70"
          >
            RESIN<span className="font-light text-[#c9a45c]">ART</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
            Handmade resin art created to make your special moments last.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-medium text-white">
            Explore
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
            <Link
              to="/shop"
              className="transition-colors duration-200 hover:text-[#c9a45c]"
            >
              Shop
            </Link>

            <Link
              to="/custom"
              className="transition-colors duration-200 hover:text-[#c9a45c]"
            >
              Custom Orders
            </Link>

            <Link
              to="/about"
              className="transition-colors duration-200 hover:text-[#c9a45c]"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="transition-colors duration-200 hover:text-[#c9a45c]"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-medium text-white">
            Follow us
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
            <a
              href="#"
              className="transition-colors duration-200 hover:text-[#c9a45c]"
            >
              Instagram
            </a>

            <a
              href="#"
              className="transition-colors duration-200 hover:text-[#c9a45c]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/40">
        © 2026 ResinArt. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;