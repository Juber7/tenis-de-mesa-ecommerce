"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComicBurst } from "@/components/comic-burst";
import { useComicJump } from "@/components/comic-jump";

export type ComicPanel = {
  slug: string;
  name: string;
  price: string;
  regularPrice: string | null;
  image: string;
  imageAlt: string;
  category: { value: string; label: string };
};

/** Table tennis sounds, one per panel. */
const SOUNDS = ["¡ZAS!", "¡PING!", "¡PONG!", "¡PUM!", "¡TOC!", "¡PAF!", "¡BAM!", "¡FIU!"];
const AUTOPLAY_MS = 4500;
/** Matches the 180 ms press transition in comic.css. */
const PRESS_MS = 180;

/**
 * Comic-strip carousel with one product per category. Each panel opens its
 * product through the category listing (see ComicJump), so going back shows
 * the rest of that category.
 */
export function ComicCarousel({ panels }: { panels: ComicPanel[] }) {
  const router = useRouter();
  const start = useComicJump((s) => s.start);
  const track = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const visible = useRef(false);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const [first, second] = el.children as unknown as HTMLElement[];
    const size = second ? second.offsetLeft - first.offsetLeft : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;
    // Wraps around at both ends.
    const left =
      direction > 0 && el.scrollLeft >= max - 4
        ? 0
        : direction < 0 && el.scrollLeft <= 4
          ? max
          : el.scrollLeft + direction * size;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => (visible.current = entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(el);
    const timer = window.setInterval(() => {
      if (visible.current && !paused.current && !document.hidden) step(1);
    }, AUTOPLAY_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  if (!panels.length) return null;
  return (
    <section
      className="home-comic shell"
      aria-labelledby="comic-title"
      aria-roledescription="carrusel"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <div className="home-section-heading">
        <h2 id="comic-title">UNO DE CADA CATEGORÍA</h2>
        <div className="comic-controls">
          <button type="button" className="comic-arrow" aria-label="Productos anteriores" onClick={() => step(-1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="comic-arrow" aria-label="Productos siguientes" onClick={() => step(1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div className="comic-frame">
        <ul className="comic-track" ref={track}>
          {panels.map((panel, index) => {
            const via = `/tienda?categoria=${panel.category.value}`;
            const to = `/producto/${panel.slug}`;
            return (
              <li key={panel.slug} className="comic-panel">
                <Link
                  href={to}
                  className="comic-link"
                  onPointerEnter={() => router.prefetch(via)}
                  onClick={(event) => {
                    // New tab, new window, etc.: a normal link to the product.
                    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    const link = event.currentTarget;
                    if (link.dataset.pressing) return;
                    router.prefetch(via);
                    router.prefetch(to);
                    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                      start({ via, to });
                      return;
                    }
                    // Play the button press before leaving, like the poster buttons.
                    link.dataset.pressing = "true";
                    link.classList.add("is-pressing");
                    window.setTimeout(() => {
                      link.classList.remove("is-pressing");
                      delete link.dataset.pressing;
                      start({ via, to });
                    }, PRESS_MS);
                  }}
                >
                  <span className="comic-caption">{panel.category.label}</span>
                  <ComicBurst>{SOUNDS[index % SOUNDS.length]}</ComicBurst>
                  <span className="comic-photo">
                    {panel.image ? (
                      <img
                        src={panel.image.replace("w=1200", "w=600")}
                        srcSet={`${panel.image.replace("w=1200", "w=400")} 400w, ${panel.image.replace("w=1200", "w=600")} 600w`}
                        sizes="(min-width: 768px) 230px, 55vw"
                        alt={panel.imageAlt}
                        width={600}
                        height={600}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="comic-photo-empty">Sin foto</span>
                    )}
                  </span>
                  <span className="comic-info">
                    <span className="comic-name">{panel.name}</span>
                    <span className="comic-price">
                      {panel.price}
                      {panel.regularPrice && <del>{panel.regularPrice}</del>}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
