"use client";

import { useState } from "react";
import { Check, Warning } from "@phosphor-icons/react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "Saddle fitting",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function validate(): Errors {
    const e: Errors = {};
    if (!values.name.trim()) e.name = "Tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = "Enter a valid email address.";
    if (values.message.trim().length < 10)
      e.message = "A few more words helps us answer properly.";
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    setStatus("sending");
    // Wire to the Shopify contact form endpoint / email service when credentials land.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center border border-leather-900/12 bg-paper-card px-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-tan-500/15">
          <Check size={26} weight="bold" className="text-tan-600" />
        </span>
        <h2 className="font-display mt-6 text-[26px] leading-tight text-leather-900">
          Message received
        </h2>
        <p className="mt-3 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-muted">
          Thanks{values.name ? `, ${values.name.split(" ")[0]}` : ""}. Someone from
          the workshop will get back to you — usually within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setValues({ name: "", email: "", subject: "Saddle fitting", message: "" });
          }}
          className="btn btn-ghost mt-7"
        >
          Send another
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full border border-leather-900/18 bg-paper-card px-4 py-3 text-[14.5px] text-leather-900 outline-none transition-colors placeholder:text-ink-faint focus:border-tan-600";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-leather-900/12 bg-paper-card p-6 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className="label text-[9.5px] text-ink-muted">
            Name
          </label>
          <input
            id="cf-name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder="Your name"
            className={inputClass}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="flex items-center gap-1.5 text-[12px] text-tan-700">
              <Warning size={12} weight="fill" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className="label text-[9.5px] text-ink-muted">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            placeholder="you@example.com"
            className={inputClass}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="flex items-center gap-1.5 text-[12px] text-tan-700">
              <Warning size={12} weight="fill" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="cf-subject" className="label text-[9.5px] text-ink-muted">
          Subject
        </label>
        <select
          id="cf-subject"
          value={values.subject}
          onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
          className={inputClass}
        >
          {[
            "Saddle fitting",
            "Custom build inquiry",
            "Order status",
            "Wholesale / dealer",
            "Leatherkeep & care",
            "Something else",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="cf-message" className="label text-[9.5px] text-ink-muted">
          Message
        </label>
        <textarea
          id="cf-message"
          rows={6}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          placeholder="Tell us about your horse, your riding, and what you're after."
          className={`${inputClass} resize-y`}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="flex items-center gap-1.5 text-[12px] text-tan-700">
            <Warning size={12} weight="fill" />
            {errors.message}
          </p>
        )}
        <p className="text-[12px] text-ink-faint">
          Have a tracing ready? Mention it and we&apos;ll take it from here.
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary mt-7 w-full disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
