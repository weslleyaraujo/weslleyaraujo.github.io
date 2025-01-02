import type { SanityAssetDocument } from "@sanity/client";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  useEventListener,
  useIsClient,
  useMediaQuery,
  useScrollLock,
} from "usehooks-ts";
import { imageBuilder } from "../sanity/lib/url-for-image";
import Picture from "./Picture";

const CHUNK_CONFIG = {
  sm: 1,
  md: 3,
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
  const { current, open, next, prev, close } = useLightbox({ images });

  const lightBoxMarkup =
    current !== null ? (
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="grid grid-cols-[min-content_1fr_min-content] gap-4 min-w-full fixed inset-0 bg-slate-900/75 transition-opacity">
          <div className="flex h-screen p-3 md:p-4 align-middle">
            <button onClick={next}>
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
          </div>
          <div className="flex items-center justify-center h-screen">
            <img
              src={imageBuilder.image(current).url()}
              className="h-auto w-auto max-h-screen"
            />
          </div>
          <div className="flex min-h-screen p-3 md:p-4 align-middle">
            <div className="absolute top-4 right-4">
              <button onClick={close}>
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
            <button onClick={prev}>
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
        </div>
        <LockBodyScroll />
      </div>
    ) : null;

  return (
    <div className={`grid grid-cols-${chunks.length} gap-4 auto-rows-max`}>
      {chunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="grid gap-4 auto-rows-max w-full">
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
  const isOpened = current !== null;
  function next() {
    if (!isOpened) return;
    const index = images.indexOf(current);
    setCurrent(images[index + 1] ? images[index + 1] : images[0]);
  }

  function prev() {
    if (!isOpened) return;
    const index = images.indexOf(current);
    setCurrent(images[index - 1] ? images[index - 1] : images.at(-1)!);
  }

  function close() {
    setCurrent(null);
  }

  function open(image: SanityAssetDocument) {
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
  };
}

function LockBodyScroll() {
  useScrollLock();
  return null;
}

function useChunks({ images }: { images: SanityAssetDocument[] }) {
  const isSm = useMediaQuery("(max-width: 760px)", { defaultValue: false });
  const chunkCount = useMemo(() => {
    if (isSm) return CHUNK_CONFIG.sm;
    return CHUNK_CONFIG.md;
  }, [isSm]);

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
