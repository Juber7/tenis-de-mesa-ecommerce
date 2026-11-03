"use client";
import { useState } from "react";
import type { Product } from "@/types/product";

export function ProductGallery({ images }: { images: Product["gallery"] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  return (
    <div className="product-gallery-group">
      <div className="product-gallery">
        <img className="h-full w-full object-contain" src={current.src} alt={current.alt} />
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
              <img src={image.thumb} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
