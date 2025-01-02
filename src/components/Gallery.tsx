import type { SanityAssetDocument } from "@sanity/client";
import { imageBuilder } from "../sanity/lib/url-for-image";
import Picture from "./Picture";

interface Props {
  images: SanityAssetDocument[];
}

export default function Gallery({ images }: Props) {
  const imagesPerRow = 3;
  const chunkCount = Math.ceil(images.length / imagesPerRow);

  // Distribute images in a round-robin fashion
  const chunks: (typeof images)[] = Array.from(
    { length: chunkCount },
    () => []
  );
  images.forEach((image, index) => {
    const chunkIndex = index % chunkCount; // Cyclically distribute images
    chunks[chunkIndex].push(image);
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-max">
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
  );
}
