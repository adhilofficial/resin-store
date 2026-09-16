import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  Session,
  User,
} from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;

  signUp: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{
    error: string | null;
    needsConfirmation: boolean;
  }>;

  signIn: (
    email: string,
    password: string
  ) => Promise<{
    error: string | null;
  }>;

  resetPassword: (
    email: string
  ) => Promise<{
    error: string | null;
    success: boolean;
  }>;

  signOut: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [session, setSession] =
    useState<Session | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const {
        data,
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(
          "Failed to get session:",
          error
        );
      }

      if (mounted) {
        setSession(data.session);
        setUser(
          data.session?.user ?? null
        );
        setLoading(false);
      }
    };

    loadSession();

    const {
      data: listener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          setSession(newSession);
          setUser(
            newSession?.user ?? null
          );
          setLoading(false);
        }
      );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name?: string
  ) => {
    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name?.trim() || "",
        },
      },
    });

    if (error) {
      return {
        error: error.message,
        needsConfirmation: false,
      };
    }

    return {
      error: null,
      needsConfirmation: !data.session,
    };
  };

  const signIn = async (
    email: string,
    password: string
  ) => {
    const {
      error,
    } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    return {
      error: error
        ? error.message
        : null,
    };
  };

  const resetPassword = async (
    email: string
  ) => {
    const {
      error,
    } =
      await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

    return {
      error: error
        ? error.message
        : null,
      success: !error,
    };
  };

  const signOut = async () => {
    const {
      error,
    } = await supabase.auth.signOut();

    if (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        resetPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}