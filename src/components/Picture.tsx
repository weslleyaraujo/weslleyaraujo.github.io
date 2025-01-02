import React from "react";

interface Props {
  url: string;
  dimensions: number[];
}

export default function Picture({ url, dimensions }: Props) {
  return (
    <picture className="h-auto max-w-full rounded-lg object-cover object-center">
      <source
        type="image/webp"
        srcSet={generateSrcSet(url, dimensions, "webp")}
        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <img
        src={`${url}?w=${dimensions[0]}`}
        srcSet={generateSrcSet(url, dimensions, "jpg")}
        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt="Responsive image"
        className="h-auto max-w-full rounded-lg object-cover object-center"
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function generateSrcSet(url: string, dimensions: number[], format: string) {
  return dimensions
    .map((width) => `${url}?w=${width}&fm=${format} ${width}w`)
    .join(", ");
}
