import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  Mail,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function ForgotPassword() {
  const {
    resetPassword,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess(false);
    setLoading(true);

    const result =
      await resetPassword(email);

    if (!result.success) {
      setError(
        result.error ||
          "Unable to send reset email."
      );

      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <main className="min-h-[80vh] bg-[#031b18] px-5 py-16 text-[#f5efe2]">
      <div className="mx-auto max-w-md">
        <div className="rounded-[2rem] border border-[#c9a45c]/15 bg-[#061f1c] p-7 shadow-2xl sm:p-9">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-[#8f968e] hover:text-[#f5efe2]"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </Link>

          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a45c]">
              Account
            </p>

            <h1 className="mt-3 text-3xl font-medium">
              Reset password
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#8f968e]">
              Enter your email and we'll send
              you a password reset link.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/5 px-4 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-2xl border border-green-400/20 bg-green-400/5 px-4 py-4 text-sm leading-6 text-green-300">
              If an account exists for that email,
              a password reset link has been sent.
              Please check your inbox.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            <div>
              <label
                htmlFor="forgot-email"
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
                  id="forgot-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#c9a45c]/20 bg-[#08231f] px-5 py-4 pl-12 text-[#f5efe2] outline-none placeholder:text-[#69756f] focus:border-[#c9a45c]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#c9a45c] px-6 py-4 text-sm font-semibold text-[#071713] transition hover:bg-[#dfc27a] disabled:opacity-60"
            >
              {loading
                ? "Sending..."
                : "Send reset link"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;