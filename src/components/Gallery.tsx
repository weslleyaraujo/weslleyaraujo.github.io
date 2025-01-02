import type { SanityAssetDocument } from "@sanity/client";
import { imageBuilder } from "../sanity/lib/url-for-image";
import Picture from "./Picture";

interface Props {
  images: SanityAssetDocument[];
}

export default function Gallery({ images }: Props) {
  const chunks = images.reduce<(typeof images)[]>((acc, current, index) => {
    const chunkIndex = Math.floor(index / 4);
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(current);
    return acc;
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-max">
        {chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="grid gap-4 auto-rows-max">
            {chunk.map((image, index) => (
              <div key={index}>
                <Picture
                  url={imageBuilder.image(image).url()}
                  dimensions={[800, 1400, 1920]}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
