"use client";
import { useState } from "react";
import type { Product } from "@/types/product";

export function ProductGallery({ images }: { images: Product["gallery"] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  return (
    <div className="product-gallery-group">
      <div className="product-gallery">
        <img
          className="h-full w-full object-contain"
          src={current.src}
          srcSet={[600, 900, 1200].map((w) => `${current.src.replace("w=1200", `w=${w}`)} ${w}w`).join(", ")}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={current.alt}
          width={1200}
          height={1200}
          fetchPriority="high"
        />
      </div>
      {images.length > 1 && (
        <div className="product-thumbs">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className="product-thumb"
              aria-label={`Ver foto ${index + 1} de ${images.length}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              <img src={image.thumb} alt="" width={200} height={200} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
