import React from "react";
import { useAuth } from "../context/AuthContext";
import { GoogleIcon, CartMark } from "./icons";

const Login: React.FC = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-panel px-4">
      <div className="w-full max-w-md rounded-panel border border-line bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex items-center justify-center gap-2">
          <CartMark className="h-7 w-7 text-brand" aria-hidden="true" />
          <span className="text-2xl font-semibold tracking-tight text-ink">
            Shopcart
          </span>
        </div>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-ink">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted">
          Sign in with Google to start shopping.
        </p>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="btn btn-outline mt-8 h-12 w-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          aria-label="Continue with Google sign-in"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="mt-6 text-xs leading-relaxed text-faint">
          By continuing you agree to our <a href="#" className="hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded underline-offset-2 hover:underline">Terms &amp; Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
