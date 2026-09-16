import {
  LogOut,
  Package,
  User,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Account() {
  const {
    user,
    signOut,
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {
      await signOut();
      navigate("/");
    };

  return (
    <main className="min-h-[80vh] bg-[#031b18] px-5 py-16 text-[#f5efe2] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">

        <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a45c]">
          My Account
        </p>

        <h1 className="mt-5 text-4xl font-medium">
          Welcome back.
        </h1>

        <p className="mt-3 text-sm text-[#8f968e]">
          {user?.email}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">

          <Link
            to="/orders"
            className="group rounded-3xl border border-[#c9a45c]/15 bg-[#061f1c] p-7 transition hover:-translate-y-1 hover:border-[#c9a45c]/40"
          >
            <Package
              size={24}
              className="text-[#c9a45c]"
            />

            <h2 className="mt-5 text-xl font-medium">
              My Orders
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#8f968e]">
              View your previous orders
              and track their status.
            </p>
          </Link>

          <div className="rounded-3xl border border-[#c9a45c]/15 bg-[#061f1c] p-7">
            <User
              size={24}
              className="text-[#c9a45c]"
            />

            <h2 className="mt-5 text-xl font-medium">
              Account
            </h2>

            <p className="mt-2 text-sm text-[#8f968e]">
              {user?.email}
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/5 px-6 py-3 text-sm text-red-300 transition hover:border-red-400/40 hover:bg-red-400/10"
        >
          <LogOut size={17} />
          Sign out
        </button>

      </div>
    </main>
  );
}

export default Account;