import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ADMIN_EMAIL =
  "YOUR_ADMIN_EMAIL@example.com";

function AdminRoute() {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-[75vh] items-center justify-center bg-[#031b18] text-[#f5efe2]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#c9a45c]/20 border-t-[#c9a45c]" />

          <p className="mt-5 text-sm text-[#8f968e]">
            Checking admin access...
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
      />
    );
  }

  if (
    user.email?.toLowerCase() !==
    ADMIN_EMAIL.toLowerCase()
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminRoute;