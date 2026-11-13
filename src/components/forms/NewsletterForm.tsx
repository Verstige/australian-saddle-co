"use client";

import { useState } from "react";
import { Check, Warning } from "@phosphor-icons/react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setState("loading");
    // Wire this to the Shopify customer endpoint / Klaviyo when credentials land.
    await new Promise((r) => setTimeout(r, 700));
    setState("done");
    setMessage("You're on the list. We'll send show dates and new builds.");
    setEmail("");
  }

  if (state === "done") {
    return (
      <div className="mt-5 flex items-start gap-2.5 border border-tan-500/40 bg-tan-500/10 px-4 py-3">
        <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-tan-400" />
        <p className="text-[13px] leading-relaxed text-paper-deep/80">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5" noValidate>
      <div className="flex items-stretch border border-paper/25 focus-within:border-tan-400">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          placeholder="your@email.com"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-[13px] text-paper outline-none placeholder:text-paper-deep/35"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="label shrink-0 bg-tan-500 px-4 text-[10px] text-leather-900 transition-colors hover:bg-tan-400 disabled:opacity-50"
        >
          {state === "loading" ? "…" : "Join"}
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-tan-400">
          <Warning size={13} weight="fill" />
          {message}
        </p>
      )}
    </form>
  );
}
