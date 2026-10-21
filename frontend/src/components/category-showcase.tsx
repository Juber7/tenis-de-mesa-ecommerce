import Image from "next/image";

const showcaseImages = {
  raquetas: ["raquetas-1", "raquetas-2", "raquetas-3", "raquetas-4"],
  gomas: ["gomas-1", "gomas-2", "gomas-3", "gomas-1"],
  pelotas: ["pelotas-1", "pelotas-2", "pelotas-3", "pelotas-1"],
} as const;

type ShowcaseCategory = keyof typeof showcaseImages;

export function ProductShowcase({ category, label }: { category: ShowcaseCategory; label: string }) {
  const images = showcaseImages[category];
  const slides = [...images, images[0]];

  return (
    <span className="hero-product-showcase" aria-hidden="true">
      <span className="hero-product-showcase-track">
        {slides.map((image, index) => (
          <span className="hero-product-showcase-slide" key={`${image}-${index}`}>
            <Image
              src={`/category-art/showcase/${image}.png`}
              alt={`${label}, producto ${index + 1}`}
              width={720}
              height={720}
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 35vw, 22vw"
            />
          </span>
        ))}
      </span>
    </span>
  );
}
