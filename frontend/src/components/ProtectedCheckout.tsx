import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

type ProtectedCheckoutProps = {
  children: React.ReactNode;
};

function ProtectedCheckout({
  children,
}: ProtectedCheckoutProps) {
  const {
    user,
    loading,
  } = useAuth();

  const location =
    useLocation();

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#031b18] text-[#f5efe2]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#c9a45c]/20 border-t-[#c9a45c]" />

          <p className="mt-5 text-sm text-[#8f968e]">
            Checking your account...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(
          location.pathname
        )}`}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedCheckout;