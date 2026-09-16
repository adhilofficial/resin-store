import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedCheckout from "./components/ProtectedCheckout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Custom from "./pages/Custom";
import Search from "./pages/Search";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#071b1a] text-[#f3eee3]">

            <Navbar />

            <Routes>

              {/* ================================
                  PUBLIC PAGES
              ================================= */}

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/shop"
                element={<Shop />}
              />

              <Route
                path="/product/:slug"
                element={<ProductDetails />}
              />

              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/custom"
                element={<Custom />}
              />

              <Route
                path="/search"
                element={<Search />}
              />

              {/* ================================
                  AUTHENTICATION
              ================================= */}

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/signup"
                element={<Signup />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />

              {/* ================================
                  ACCOUNT
              ================================= */}

              <Route
                path="/account"
                element={<Account />}
              />

              {/* ================================
                  PROTECTED CHECKOUT
              ================================= */}

              <Route
                path="/checkout"
                element={
                  <ProtectedCheckout>
                    <Checkout />
                  </ProtectedCheckout>
                }
              />

            </Routes>

            <Footer />

          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;