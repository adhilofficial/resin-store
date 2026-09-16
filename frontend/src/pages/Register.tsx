import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(
        trimmedEmail,
        password,
        trimmedName
      );

      if (result.error) {
        setError(
          result.error ||
            "Unable to create your account."
        );

        setLoading(false);
        return;
      }

      if (result.needsConfirmation) {
        setSuccess(
          "Account created successfully. Please check your email and confirm your account before signing in."
        );

        setLoading(false);
        return;
      }

      navigate("/account", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      setError(
        "Something went wrong while creating your account. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-[#031b18] px-5 py-16 text-[#f5efe2] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2rem] border border-[#c9a45c]/15 bg-[#061f1c] p-7 shadow-2xl sm:p-9">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a45c]">
              ResinArt Account
            </p>

            <h1 className="mt-3 text-3xl font-medium">
              Create account
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#8f968e]">
              Create your account to manage
              your orders and profile.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/5 px-4 py-4 text-sm leading-6 text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-2xl border border-green-400/20 bg-green-400/5 px-4 py-4 text-sm leading-6 text-green-300">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="register-name"
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
                  id="register-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 pl-12 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-email"
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
                  id="register-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 pl-12 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#69756f]"
                />

                <input
                  id="register-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="At least 6 characters"
                  className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 pl-12 pr-12 text-[#f5efe2] outline-none transition placeholder:text-[#69756f] focus:border-[#c9a45c]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#69756f] hover:text-[#f5efe2]"
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

            <div>
              <label
                htmlFor="register-confirm-password"
                className="mb-2 block text-sm font-medium"
              >
                Confirm password
              </label>

              <input
                id="register-confirm-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
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
              to="/login"
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

export default Register;
