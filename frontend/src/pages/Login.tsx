import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Login() {
  const {
    signIn,
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const params =
    new URLSearchParams(
      location.search
    );

  const redirect =
    params.get("redirect") ||
    "/account";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result =
      await signIn(
        email.trim(),
        password
      );

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    navigate(
      redirect,
      { replace: true }
    );
  };

  return (
    <main className="min-h-[80vh] bg-[#031b18] px-5 py-16 text-[#f5efe2] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-md">

        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a45c]">
            ResinArt Account
          </p>

          <h1 className="mt-5 text-4xl font-medium tracking-[-0.04em]">
            Welcome back.
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#8f968e]">
            Sign in to continue with
            your order.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#c9a45c]/15 bg-[#061f1c] p-7 sm:p-9">

          {error && (
            <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/5 px-4 py-4 text-sm leading-6 text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#69756f]"
                />

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 pl-12 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#69756f]"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Your password"
                  className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 pl-12 pr-12 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#69756f] transition hover:text-[#f5efe2]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#c9a45c] px-6 py-4 text-sm font-semibold text-[#071713] transition hover:-translate-y-0.5 hover:bg-[#dfc27a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowRight size={18} />
              )}
            </button>

          </form>

          <div className="my-7 border-t border-[#c9a45c]/10" />

          <p className="text-center text-sm text-[#8f968e]">
            Don't have an account?{" "}
            <Link
              to={`/signup?redirect=${encodeURIComponent(
                redirect
              )}`}
              className="font-medium text-[#c9a45c] hover:text-[#dfc27a]"
            >
              Create one
            </Link>
          </p>

        </div>

        <p className="mt-7 text-center text-xs text-[#69756f]">
          You can browse ResinArt and
          add products to your cart
          without an account.
        </p>

      </div>
    </main>
  );
}

export default Login;