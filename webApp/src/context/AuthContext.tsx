import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut, getIdToken } from "firebase/auth";

const AUTH_ENABLED: boolean = false;

const GUEST_USER: AppUser = {
  email: "guest@shopcart.dev",
  name: "Guest",
  sub: "guest",
  idToken: "",
};

export interface AppUser {
  email: string;
  name: string;
  picture?: string;
  sub: string;
  idToken: string;
}

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "firebase_id_token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(AUTH_ENABLED ? null : GUEST_USER);
  const [loading, setLoading] = useState(AUTH_ENABLED);

  useEffect(() => {
    if (!AUTH_ENABLED || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const idToken = await getIdToken(fbUser, true);
        localStorage.setItem(TOKEN_KEY, idToken);
        setUser({
          email: fbUser.email || "",
          name: fbUser.displayName || fbUser.email || "",
          picture: fbUser.photoURL || undefined,
          sub: fbUser.uid,
          idToken,
        });
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    if (!AUTH_ENABLED || !auth) return;
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error("Firebase sign-in failed", e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (AUTH_ENABLED && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn("Firebase sign-out failed", e);
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    setUser(AUTH_ENABLED ? null : GUEST_USER);
  };

  const value = useMemo(() => ({ user, loading, loginWithGoogle, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
