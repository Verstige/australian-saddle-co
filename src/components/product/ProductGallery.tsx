"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { asset } from "@/lib/site";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="media flex aspect-4/5 items-center justify-center border border-leather-900/10">
        <div className="text-center">
          <p className="label text-[9px] text-ink-faint">Photography</p>
          <p className="font-display mt-2 text-[17px] text-ink-muted">
            Available in store
          </p>
        </div>
      </div>
    );
  }

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div>
      {/* Main frame */}
      <div className="relative">
        <div className="media aspect-4/5 border border-leather-900/10">
          <img
            src={asset(images[index])}
            alt={`${title} — photo ${index + 1} of ${images.length}`}
            className="h-full w-full object-cover"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-paper-card/90 text-leather-900 backdrop-blur-sm transition-all hover:bg-paper-card active:scale-95"
              aria-label="Previous photo"
            >
              <ArrowLeft size={17} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-paper-card/90 text-leather-900 backdrop-blur-sm transition-all hover:bg-paper-card active:scale-95"
              aria-label="Next photo"
            >
              <ArrowRight size={17} weight="bold" />
            </button>

            <span className="tnum absolute bottom-3 right-3 bg-leather-900/78 px-2.5 py-1 text-[10.5px] text-paper-deep">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="no-bar mt-3 flex gap-2.5 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              className={`media h-[78px] w-[78px] shrink-0 border transition-all duration-300 ${
                i === index
                  ? "border-tan-600"
                  : "border-leather-900/12 opacity-65 hover:opacity-100"
              }`}
              aria-label={`View photo ${i + 1}`}
            >
              <img src={asset(src)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
