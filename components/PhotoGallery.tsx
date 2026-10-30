"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length],
  );
  const next = useCallback(
    () => setOpen((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = open !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <figure key={photo.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block w-full cursor-zoom-in rounded-[3px] border border-rule bg-plate p-2 transition-colors hover:border-accent/60 sm:p-2"
              aria-label={`View photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 256px, (min-width: 640px) 50vw, 100vw"
                className="h-48 w-full object-cover"
              />
            </button>
            {photo.caption && (
              <figcaption className="mt-2 text-[0.88rem] leading-snug text-muted">{photo.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
          onClick={close}
        >
          {/* counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-white/50 uppercase select-none">
            {open + 1} / {photos.length}
          </p>

          {/* close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>

          {/* prev */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* image */}
          <div
            className="flex max-h-[85vh] max-w-[88vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[open].src}
              alt={photos[open].alt}
              width={photos[open].width}
              height={photos[open].height}
              sizes="88vw"
              className="max-h-[80vh] w-auto object-contain"
              priority
            />
            {photos[open].caption && (
              <p className="mt-3 text-center text-[0.9rem] text-white/55">{photos[open].caption}</p>
            )}
          </div>

          {/* next */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg className="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
