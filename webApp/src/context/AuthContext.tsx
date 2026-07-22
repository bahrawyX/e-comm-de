import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut, getIdToken } from "firebase/auth";

export interface AppUser {
  email: string;
  name: string;
  picture?: string;
  sub: string; // Firebase UID
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
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to Firebase auth state
  useEffect(() => {
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
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged will handle setting user and token
    } catch (e) {
      console.error("Firebase sign-in failed", e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase sign-out failed", e);
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  };

  const value = useMemo(() => ({ user, loading, loginWithGoogle, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
