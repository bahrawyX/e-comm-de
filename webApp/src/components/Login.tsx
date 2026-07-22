/*
  Login.tsx
  ─────────
  Google sign-in screen. Shown by App.tsx whenever there is no session.

  KEY CONCEPTS (unchanged):
  - useAuth() → loginWithGoogle() opens the Firebase Google popup
*/

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { GoogleIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const Login: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center px-4">
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="glass relative w-full max-w-md rounded-panel p-8 text-center sm:p-10"
      >
        {/* Pulsing glow behind the card */}
        <div
          aria-hidden="true"
          className="anim-glow absolute -top-20 left-1/2 -z-10 h-44 w-44 -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(216,246,81,0.6), transparent 70%)",
          }}
        />

        {/* Brand mark */}
        <motion.div
          variants={item}
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-xl font-semibold text-white"
        >
          S
        </motion.div>

        <motion.span variants={item} className="chip mt-6 inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          ShopEasy
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-ink"
        >
          Welcome back
        </motion.h1>

        <motion.p variants={item} className="mt-3 text-[15px] text-muted">
          Sign in with Google to start shopping.
        </motion.p>

        <motion.button
          variants={item}
          onClick={loginWithGoogle}
          className="btn-outline mt-8 h-14 w-full text-sm font-medium"
        >
          <GoogleIcon />
          Continue with Google
        </motion.button>

        <motion.p variants={item} className="mt-6 text-xs leading-relaxed text-faint">
          By continuing you agree to our Terms &amp; Privacy Policy.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
