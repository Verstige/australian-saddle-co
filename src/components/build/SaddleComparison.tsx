"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { saddleSpecs, specLabels, priceFor } from "@/data/saddles";
import { products } from "@/data/catalog";
import { asset } from "@/lib/site";

export function SaddleComparison() {
  // Which models the user has selected to compare.
  const [picked, setPicked] = useState<string[]>([
    saddleSpecs[0].handle,
    saddleSpecs[5].handle,
    saddleSpecs[7].handle,
  ]);

  const shown = saddleSpecs.filter((s) => picked.includes(s.handle));

  function toggle(handle: string) {
    setPicked((p) =>
      p.includes(handle)
        ? p.length > 1
          ? p.filter((h) => h !== handle)
          : p
        : [...p, handle],
    );
  }

  return (
    <div>
      {/* Model toggles */}
      <div className="flex flex-wrap gap-2">
        {saddleSpecs.map((s) => {
          const on = picked.includes(s.handle);
          return (
            <button
              key={s.handle}
              type="button"
              onClick={() => toggle(s.handle)}
              className={`relative border px-3.5 py-2 text-[13px] transition-all duration-300 ${
                on
                  ? "border-leather-900 bg-leather-900 text-paper"
                  : "border-leather-900/20 text-ink-muted hover:border-leather-900 hover:text-leather-900"
              }`}
            >
              {s.name}
              {on && (
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-tan-500 text-leather-900">
                  <Check size={9} weight="bold" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Comparison table */}
      <div className="no-bar mt-10 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr>
              <th className="w-[160px] border-b-2 border-leather-900 pb-4 pr-6 text-left align-bottom">
                <span className="label text-[9.5px] text-ink-faint">
                  Specification
                </span>
              </th>
              {shown.map((s) => {
                const p = products.find((x) => x.handle === s.handle);
                return (
                  <th
                    key={s.handle}
                    className="border-b-2 border-leather-900 px-4 pb-4 text-left align-bottom"
                  >
                    <div className="media mb-3 aspect-4/3 border border-leather-900/10">
                      {p?.images[0] && (
                        <img
                          src={asset(p.images[0])}
                          alt={s.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="font-display block text-[19px] leading-tight text-leather-900">
                      {s.name}
                    </span>
                    <span className="tnum mt-1.5 block text-[13px] text-tan-600">
                      ${priceFor(s.handle).toFixed(0)}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {specLabels.map((row) => (
              <tr key={row.label} className="group">
                <th
                  scope="row"
                  className="border-b border-leather-900/10 py-4 pr-6 text-left align-top"
                >
                  <span className="label text-[9.5px] text-ink-faint">
                    {row.label}
                  </span>
                </th>
                {shown.map((s) => {
                  const value = s[row.key];
                  return (
                    <td
                      key={s.handle}
                      className="border-b border-leather-900/10 px-4 py-4 align-top text-[13.5px] leading-relaxed text-leather-900"
                    >
                      {typeof value === "number" ? `${value} lbs` : value}
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr>
              <th
                scope="row"
                className="border-b-2 border-leather-900 py-4 pr-6 text-left align-top"
              >
                <span className="label text-[9.5px] text-ink-faint">Action</span>
              </th>
              {shown.map((s) => {
                const p = products.find((x) => x.handle === s.handle);
                return (
                  <td
                    key={s.handle}
                    className="border-b-2 border-leather-900 px-4 py-4 align-top"
                  >
                    <Link
                      href={`/build?model=${s.handle}`}
                      className="label inline-flex items-center gap-1.5 text-[9.5px] text-tan-600 transition-colors hover:text-tan-700"
                    >
                      Build this one
                      <ArrowRight size={12} weight="bold" />
                    </Link>
                    {p && (
                      <Link
                        href={`/shop/${p.collection}/${p.handle}`}
                        className="label mt-2 block text-[9.5px] text-ink-faint transition-colors hover:text-leather-900"
                      >
                        Full specs
                      </Link>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-[12.5px] leading-relaxed text-ink-faint">
        Weights are without fittings. Seat depth and knee pad figures are taken
        from each saddle&apos;s published specification. Tooling adds $200 to
        the Mustermaster and the Survivor Poley.
      </p>
    </div>
  );
}
