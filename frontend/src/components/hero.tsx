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
    title: "TU JUEGO.\nAL SIGUIENTE\nNIVEL.",
    description:
      "Encuentra la paleta que conecta con tu estilo. Más control, más confianza, más juego.",
    image: photos.paddle,
    alt: "Paleta y pelota de tenis de mesa",
    category: "paletas",
    label: "Encuentra tu paleta",
  },
  {
    eyebrow: "CADA PUNTO CUENTA",
    title: "PEQUEÑAS.\nGRANDES\nPARTIDAS.",
    description:
      "Pelotas para entrenar, competir y disfrutar cada intercambio.",
    image: photos.balls,
    alt: "Equipo de tenis de mesa con pelotas",
    category: "pelotas",
    label: "Explora las pelotas",
  },
  {
    eyebrow: "PASIÓN POR EL JUEGO",
    title: "VIVE\nCADA\nPUNTO.",
    description:
      "El equipo para tu próxima partida está aquí. Nosotros te ayudamos a elegir.",
    image: photos.action,
    alt: "Partida de tenis de mesa en acción",
    category: "",
    label: "Explorar la tienda",
  },
];
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (paused || reduced) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % 3), 6500);
    return () => clearInterval(timer);
  }, [paused, reduced]);
  const slide = slides[index];
  return (
    <section
      aria-label="Destacados"
      aria-roledescription="carrusel"
      className="shell py-7 md:py-10"
    >
      <div className="hero-grid overflow-hidden bg-cream">
        <div className="relative flex flex-col justify-center px-7 py-12 md:px-12 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: reduced ? 0 : 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="eyebrow flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-paddle" />
                {slide.eyebrow}
              </p>
              <h1 className="my-6 whitespace-pre-line font-display text-[64px] font-bold leading-[.89] tracking-[-.025em] lg:text-[92px]">
                {slide.title}
              </h1>
              <p className="max-w-sm text-sm leading-7 text-charcoal/70">
                {slide.description}
              </p>
              <Button asChild className="mt-7">
                <Link
                  href={`/tienda${slide.category ? "?categoria=" + slide.category : ""}`}
                >
                  {slide.label}
                  <ArrowRight size={17} />
                </Link>
              </Button>
            </motion.div>
          </AnimatePresence>
          <div className="mt-12 flex items-center gap-3">
            <span className="mr-3 text-xs tabular-nums">
              0{index + 1} <span className="text-muted">/ 03</span>
            </span>
            {slides.map((s, i) => (
              <button
                key={s.eyebrow}
                aria-label={`Mostrar diapositiva ${i + 1}`}
                aria-pressed={i === index}
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                className={`h-1 w-8 ${i === index ? "bg-paddle" : "bg-sand"}`}
              />
            ))}
            <button
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Reproducir carrusel" : "Pausar carrusel"}
              className="ml-3 p-2"
            >
              {paused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          </div>
        </div>
        <div className="relative min-h-[350px] overflow-hidden bg-[#242924]">
          <AnimatePresence>
            <motion.img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              initial={{ opacity: 0, scale: reduced ? 1 : 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          <span className="absolute left-6 top-6 rounded-full border border-white/50 px-4 py-2 text-[10px] tracking-widest text-white">
            EL DEPORTE NOS CONECTA
          </span>
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white">
            <p className="font-display text-3xl uppercase leading-none">
              Tu próxima
              <br />
              gran partida.
            </p>
            <div className="flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  aria-label={
                    d < 0 ? "Diapositiva anterior" : "Diapositiva siguiente"
                  }
                  onClick={() => {
                    setIndex((index + d + 3) % 3);
                    setPaused(true);
                  }}
                  className="rounded-full border border-white/50 p-3 hover:bg-white/20"
                >
                  {d < 0 ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
