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
  User,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Signup() {
  const {
    signUp,
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

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

   const result =
  await signUp(
    email.trim(),
    password,
    name.trim()
  );

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    if (
      result.needsConfirmation
    ) {
      setMessage(
        "Account created. Please check your email and confirm your account before signing in."
      );
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
            Create your account.
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#8f968e]">
            Create an account to
            complete your order and
            track your purchases.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#c9a45c]/15 bg-[#061f1c] p-7 sm:p-9">

          {error && (
            <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/5 px-4 py-4 text-sm leading-6 text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-6 rounded-2xl border border-[#c9a45c]/20 bg-[#c9a45c]/5 px-4 py-4 text-sm leading-6 text-[#c9a45c]">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Full name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#69756f]"
                />

                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 pl-12 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c]"
                />
              </div>
            </div>

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
                  minLength={6}
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="At least 6 characters"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#69756f] hover:text-[#f5efe2]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Repeat your password"
                className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#c9a45c] px-6 py-4 text-sm font-semibold text-[#071713] transition hover:-translate-y-0.5 hover:bg-[#dfc27a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <ArrowRight size={18} />
              )}
            </button>

          </form>

          <div className="my-7 border-t border-[#c9a45c]/10" />

          <p className="text-center text-sm text-[#8f968e]">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(
                redirect
              )}`}
              className="font-medium text-[#c9a45c] hover:text-[#dfc27a]"
            >
              Sign in
            </Link>
          </p>

        </div>

      </div>
    </main>
  );
}

export default Signup;