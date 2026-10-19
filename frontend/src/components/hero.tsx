"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowLeft, Pause, Play } from "lucide-react";
import { photos } from "@/lib/demo";
import { Button } from "@/components/ui/button";

const slides = [
  {
    eyebrow: "PRECISIÓN EN CADA GOLPE",
    title: "TU JUEGO.",
    accent: "AL SIGUIENTE NIVEL.",
    description:
      "Raquetas, gomas y todo lo que necesitas para dar lo mejor de ti en cada punto.",
    image: photos.paddle,
    alt: "Raqueta de tenis de mesa",
    category: "paletas",
    label: "Encuentra tu raqueta",
  },
  {
    eyebrow: "CADA PUNTO CUENTA",
    title: "ENTRENA HOY.",
    accent: "SUPÉRATE MAÑANA.",
    description:
      "Pelotas para entrenar, competir y disfrutar cada intercambio. Tu próxima gran partida empieza aquí.",
    image: photos.balls,
    alt: "Pelotas de tenis de mesa",
    category: "pelotas",
    label: "Explora las pelotas",
  },
  {
    eyebrow: "PASIÓN POR EL JUEGO",
    title: "TU PASIÓN.",
    accent: "NUESTRO DEPORTE.",
    description:
      "Encuentra el equipo para tu estilo. Nosotros te acompañamos para que tú te concentres en jugar.",
    image: photos.action,
    alt: "Partida de tenis de mesa en acción",
    category: "",
    label: "Explorar la tienda",
  },
];
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (paused || hovered || reduced) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6500,
    );
    return () => clearInterval(timer);
  }, [paused, hovered, reduced]);
  const slide = slides[index];
  const advance = (direction: number) => {
    setIndex((i) => (i + direction + slides.length) % slides.length);
    setPaused(true);
  };
  return (
    <section
      aria-label="Destacados"
      aria-roledescription="carrusel"
      className="bg-[#F4F8FC]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative isolate overflow-hidden">
        <div className="shell relative z-10 grid items-center md:min-h-[520px] md:grid-cols-[1.1fr_1fr] lg:min-h-[560px]">
          <div className="py-10 md:py-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="my-3 max-w-2xl font-display text-[clamp(2.625rem,6vw,5.25rem)] font-bold leading-[.96] tracking-[-.02em]">
                  {slide.title}
                  <br />
                  <span className="text-[#285486]">{slide.accent}</span>
                </h1>
                <p className="max-w-md text-base leading-7 text-charcoal/75">
                  {slide.description}
                </p>
                <Button asChild className="mt-7">
                  <Link
                    href={`/tienda${slide.category ? `?categoria=${slide.category}` : ""}`}
                  >
                    {slide.label}
                    <ArrowRight size={17} />
                  </Link>
                </Button>
              </motion.div>
            </AnimatePresence>
            <div className="mt-9 flex items-center gap-2">
              <button
                type="button"
                onClick={() => advance(-1)}
                aria-label="Diapositiva anterior"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-sand transition-colors hover:border-electric hover:text-electric"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="px-3 text-xs tabular-nums">
                0{index + 1}{" "}
                <span className="text-muted">/ 0{slides.length}</span>
              </span>
              <button
                type="button"
                onClick={() => advance(1)}
                aria-label="Diapositiva siguiente"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-sand transition-colors hover:border-electric hover:text-electric"
              >
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Reproducir carrusel" : "Pausar carrusel"}
                className="ml-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-charcoal/70 hover:bg-white"
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
            </div>
          </div>
          <div className="relative -mx-5 h-[260px] sm:h-[340px] md:static md:mx-0 md:h-full">
            <AnimatePresence>
              <motion.img
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.5 }}
                className="absolute inset-0 -z-10 h-full w-full object-cover md:left-[45%] md:w-[55%]"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-transparent to-transparent md:left-[45%] md:bg-gradient-to-r" />
          </div>
        </div>
      </div>
    </section>
  );
}
