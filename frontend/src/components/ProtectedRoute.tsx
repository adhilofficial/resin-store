import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const {
    user,
    loading,
  } = useAuth();

  const location =
    useLocation();

  if (loading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#031b18] px-6 text-[#f5efe2]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#c9a45c]/20 border-t-[#c9a45c]" />

          <p className="mt-5 text-sm text-[#8f968e]">
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;