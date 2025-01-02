import type { SanityAssetDocument, SanityDocument } from "@sanity/client";
import { imageBuilder } from "../sanity/lib/url-for-image";
import Picture from "./Picture";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLockBodyScroll } from "@uidotdev/usehooks";

interface Props {
  images: SanityAssetDocument[];
}

const IMAGES_PER_ROW = 3;

export default function Gallery({ images }: Props) {
  const chunks = useMemo(() => {
    const count = Math.ceil(images.length / IMAGES_PER_ROW);
    const chunks: (typeof images)[] = Array.from({ length: count }, () => []);
    images.forEach((image, index) => chunks[index % count].push(image));
    return chunks;
  }, [images]);

  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    ref.current = document.body;
  }, []);

  const { current, open } = useLightbox({ images });

  const lightBoxMarkup =
    current !== null ? (
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="grid grid-cols-[min-content_1fr_min-content] gap-4 min-w-full">
          <div className="bg-gray-200 h-screen p-4">
            <button>*</button>
          </div>
          <div className="bg-gray-400 h-screen p-4 flex justify-center">
            <img
              src={imageBuilder.image(current).url()}
              className="h-auto max-w-full max-h-screen justify-center "
            />
          </div>
          <div className="bg-gray-200 min-h-screen p-4">
            <button>*</button>
          </div>
        </div>
        <LockBodyScroll />
      </div>
    ) : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-max">
      {chunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="grid gap-4 auto-rows-max">
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
  function next() {}
  function prev() {}

  function close() {
    setCurrent(null);
  }

  function open(image: SanityAssetDocument) {
    setCurrent(images[images.indexOf(image)]);
  }

  return {
    current,
    next,
    prev,
    open,
  };
}

function LockBodyScroll() {
  useLockBodyScroll();
  return null;
}
