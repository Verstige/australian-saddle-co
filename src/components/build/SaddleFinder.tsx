"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "@phosphor-icons/react";
import {
  scoreSaddles,
  priceFor,
  type FinderAnswer,
  type HorseAnswer,
  type RiderAnswer,
} from "@/data/saddles";
import { products } from "@/data/catalog";
import { asset } from "@/lib/site";

const QUESTIONS = [
  {
    id: "use" as const,
    kicker: "Step one",
    title: "What will you do with the saddle?",
    options: [
      { value: "trail" as RiderAnswer, label: "Trail and long rides", sub: "All-day riding on varied ground" },
      { value: "work" as RiderAnswer, label: "Work", sub: "Ranch, packing, everyday utility" },
      { value: "police" as RiderAnswer, label: "Mounted unit", sub: "Patrol, ceremony, public display" },
      { value: "competition" as RiderAnswer, label: "Competition", sub: "You want a secure, balanced seat" },
      { value: "beginner" as RiderAnswer, label: "New to saddles", sub: "Looking for a safe place to start" },
    ],
  },
  {
    id: "horse" as const,
    kicker: "Step two",
    title: "Tell us about your horse",
    options: [
      { value: "light" as HorseAnswer, label: "Light or small", sub: "Under 900 lbs, or a pony" },
      { value: "mid" as HorseAnswer, label: "Mid-weight", sub: "900–1200 lbs, the usual range" },
      { value: "heavy" as HorseAnswer, label: "Heavy or big", sub: "Over 1200 lbs, or a tall horse" },
      { value: "hardtofit" as HorseAnswer, label: "Hard to fit", sub: "Unusual back shape or withers" },
    ],
  },
  {
    id: "budget" as const,
    kicker: "Step three",
    title: "What are you comfortable spending?",
    options: [
      { value: "under1500" as const, label: "Up to $1,500", sub: "The Drover and Fox Poley range" },
      { value: "1500to1800" as const, label: "$1,500 – $1,800", sub: "The Mustermaster and Survivor" },
      { value: "over1800" as const, label: "Above $1,800", sub: "Premium builds, Merino and tooling" },
    ],
  },
];

export function SaddleFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<FinderAnswer>>({});
  const [done, setDone] = useState(false);

  const question = QUESTIONS[step];

  function choose(value: string) {
    const key = question.id as keyof FinderAnswer;
    const next = { ...answers, [key]: value } as FinderAnswer;
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    if (done) {
      setDone(false);
      setStep(QUESTIONS.length - 1);
      return;
    }
    if (step > 0) setStep(step - 1);
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  const results = done
    ? scoreSaddles(answers as FinderAnswer)
    : [];

  if (done) {
    return (
      <div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-[10px] text-tan-600">Your matches</p>
            <h2 className="font-display mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-tight text-leather-900">
              Three saddles worth a look
            </h2>
          </div>
          <button
            type="button"
            onClick={reset}
            className="label inline-flex items-center gap-2 text-[10px] text-ink-muted transition-colors hover:text-tan-600"
          >
            <ArrowLeft size={13} weight="bold" />
            Start over
          </button>
        </div>

        <ul className="mt-9 space-y-4">
          {results.slice(0, 3).map((r, i) => {
            const p = products.find((x) => x.handle === r.spec.handle);
            return (
              <li
                key={r.spec.handle}
                className={`reveal grid gap-5 border border-leather-900/12 bg-paper-card p-5 sm:grid-cols-[120px_1fr_auto] sm:items-center sm:p-6 ${
                  i === 0 ? "border-tan-500/45" : ""
                }`}
              >
                <div className="media aspect-4/3 border border-leather-900/10">
                  {p?.images[0] && (
                    <img
                      src={asset(p.images[0])}
                      alt={r.spec.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-[22px] leading-tight text-leather-900">
                      {r.spec.name}
                    </h3>
                    {i === 0 && (
                      <span className="label bg-tan-500 px-2 py-1 text-[8.5px] text-leather-900">
                        Best match
                      </span>
                    )}
                    <span className="tnum text-[14px] text-tan-600">
                      ${priceFor(r.spec.handle).toFixed(0)}
                    </span>
                  </div>

                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                    {r.spec.tagline}
                  </p>

                  {r.reasons.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                      {r.reasons.slice(0, 3).map((reason) => (
                        <li
                          key={reason}
                          className="flex items-center gap-1.5 text-[12.5px] text-ink-muted"
                        >
                          <Check
                            size={12}
                            weight="bold"
                            className="shrink-0 text-tan-600"
                          />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Link
                  href={`/build?model=${r.spec.handle}`}
                  className="btn btn-primary shrink-0"
                >
                  Build this
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 border-l-2 border-tan-500 bg-paper-deep/50 px-4 py-3 text-[13.5px] leading-relaxed text-ink-muted">
          This is a starting point, not a prescription. Every saddle is shaped
          to your horse&apos;s tracings — send them in and we&apos;ll tell you
          honestly which of these we&apos;d build for you.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/fitting" className="btn btn-ghost">
            How fitting works
          </Link>
          <Link href="/compare" className="btn btn-ghost">
            Compare all eight
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-2">
        {QUESTIONS.map((q, i) => (
          <span
            key={q.id}
            className={`h-[3px] flex-1 transition-colors duration-500 ${
              i <= step ? "bg-tan-600" : "bg-leather-900/12"
            }`}
          />
        ))}
      </div>

      <div className="mt-8">
        <p className="label text-[10px] text-tan-600">{question.kicker}</p>
        <h2 className="font-display mt-3 max-w-[24ch] text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold leading-tight text-leather-900">
          {question.title}
        </h2>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {question.options.map((opt) => (
          <li key={opt.value}>
            <button
              type="button"
              onClick={() => choose(opt.value)}
              className="group flex w-full items-start gap-3 border border-leather-900/15 bg-paper-card px-5 py-4 text-left transition-all duration-300 hover:border-leather-900 hover:bg-paper-deep/40"
            >
              <span className="mt-1 h-4 w-4 shrink-0 rounded-full border border-leather-900/30 transition-colors group-hover:border-tan-600" />
              <span>
                <span className="font-display block text-[17px] leading-tight text-leather-900">
                  {opt.label}
                </span>
                <span className="mt-1 block text-[13px] leading-relaxed text-ink-muted">
                  {opt.sub}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {step > 0 && (
        <button
          type="button"
          onClick={back}
          className="label mt-7 inline-flex items-center gap-2 text-[10px] text-ink-muted transition-colors hover:text-leather-900"
        >
          <ArrowLeft size={13} weight="bold" />
          Back
        </button>
      )}
    </div>
  );
}
