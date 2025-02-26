import type { SanityAssetDocument } from "@sanity/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useEventListener, useMediaQuery, useScrollLock } from "usehooks-ts";
import { imageBuilder } from "../sanity/lib/url-for-image";
import Picture from "./Picture";

const CHUNK_CONFIG = {
  sm: 1,
  md: 2,
  lg: 3,
};

interface Props {
  images: SanityAssetDocument[];
}

export default function Gallery({ images }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    ref.current = document.body;
  }, []);

  const chunks = useChunks({ images });
  const { current, open, next, prev, close, isLoading, setIsLoading } =
    useLightbox({ images });

  const lightBoxMarkup =
    current !== null ? (
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="fixed inset-0 bg-slate-900/75 transition-opacity">
          <div className="relative flex items-center justify-center h-screen">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-8 border-2 border-white/20 border-t-white/100 rounded-full animate-spin" />
              </div>
            )}
            <img
              src={imageBuilder.image(current).url()}
              className={`h-auto w-auto max-h-screen max-w-full object-contain transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsLoading(false)}
            />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4">
              <button
                onClick={prev}
                className="p-2 hover:bg-slate-900/50 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
              </button>
              <button
                onClick={next}
                className="p-2 hover:bg-slate-900/50 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 stroke-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={close}
              className="fixed top-2 right-2 md:absolute md:top-4 md:right-4 p-2 bg-slate-900/50 hover:bg-slate-900/75 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <LockBodyScroll />
      </div>
    ) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-max">
      {chunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="grid gap-2 auto-rows-max w-full">
          {chunk.map((image, index) => (
            <div key={index} role="button" onClick={() => open(image)}>
              <Picture
                url={imageBuilder.image(image).url()}
                dimensions={[800, 1400, 1920]}
              />
            </div>
          ))}
        </div>
      ))}
      {ref.current ? createPortal(lightBoxMarkup, ref.current) : null}
    </div>
  );
}

function useLightbox({ images }: { images: SanityAssetDocument[] }) {
  const [current, setCurrent] = useState<SanityAssetDocument | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isOpened = current !== null;

  // Preload next and previous images
  useEffect(() => {
    if (!current) return;
    const index = images.indexOf(current);
    const nextImage = images[index + 1] || images[0];
    const prevImage = images[index - 1] || images[images.length - 1];

    const preloadImage = (image: SanityAssetDocument) => {
      const img = new Image();
      img.src = imageBuilder.image(image).url();
    };

    preloadImage(nextImage);
    preloadImage(prevImage);
  }, [current, images]);

  function next() {
    if (!isOpened) return;
    setIsLoading(true);
    const index = images.indexOf(current);
    setCurrent(images[index + 1] ? images[index + 1] : images[0]);
  }

  function prev() {
    if (!isOpened) return;
    setIsLoading(true);
    const index = images.indexOf(current);
    setCurrent(images[index - 1] ? images[index - 1] : images.at(-1)!);
  }

  function close() {
    setCurrent(null);
    setIsLoading(false);
  }

  function open(image: SanityAssetDocument) {
    setIsLoading(true);
    setCurrent(images[images.indexOf(image)]);
  }

  useEventListener("keydown", (event) => {
    if (!isOpened) return;
    switch (event.key) {
      case "Escape":
        close();
        break;
      case "ArrowRight":
        next();
        break;
      case "ArrowLeft":
        prev();
        break;
    }
  });

  return {
    current,
    next,
    prev,
    open,
    close,
    isLoading,
    setIsLoading,
  };
}

function LockBodyScroll() {
  useScrollLock();
  return null;
}

function useChunks({ images }: { images: SanityAssetDocument[] }) {
  const isSm = useMediaQuery("(max-width: 767px)", { defaultValue: false });
  const isMd = useMediaQuery("(min-width: 768px) and (max-width: 1023px)", {
    defaultValue: false,
  });
  const isLg = useMediaQuery("(min-width: 1024px)", { defaultValue: false });

  const chunkCount = useMemo(() => {
    if (isSm) return CHUNK_CONFIG.sm;
    if (isMd) return CHUNK_CONFIG.md;
    return CHUNK_CONFIG.lg;
  }, [isSm, isMd, isLg]);

  const chunks = useMemo(() => {
    const chunkSize = Math.ceil(images.length / chunkCount);
    const chunks: (typeof images)[] = Array.from(
      { length: chunkCount },
      (_, index) => images.slice(index * chunkSize, (index + 1) * chunkSize)
    );
    return chunks;
  }, [images, chunkCount]);

  return chunks;
}
