import Image from "next/image";

const categoryImages: Record<string, string> = {
  paletas: "raquetas",
  gomas: "gomas",
  pelotas: "pelotas",
  pega: "pega",
  accesorios: "accesorios",
  "fundas-de-raqueta": "fundas-de-raqueta",
  robots: "robots",
  "productos-seminuevos": "productos-seminuevos",
};

export function CategoryArt({
  category,
  className = "",
}: {
  category: string;
  className?: string;
}) {
  const image = categoryImages[category];
  if (!image) return null;

  return (
    <Image
      src={`/category-art/${image}.png`}
      alt=""
      width={1024}
      height={1024}
      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 50vw"
      className={className}
    />
  );
}
