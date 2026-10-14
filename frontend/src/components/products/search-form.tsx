"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PaddleLoader } from "@/components/ui/paddle-loader";
export function SearchForm({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const reduced = useReducedMotion();
  const currentParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const shownAt = useRef(0);
  useEffect(() => {
    // Fast/cached searches do not flash a loader. Once shown, keep it readable.
    if (pending && !visible) {
      const timer = setTimeout(() => {
        shownAt.current = performance.now();
        setVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    }
    if (!pending && visible) {
      const timer = setTimeout(
        () => setVisible(false),
        Math.max(0, 2000 - (performance.now() - shownAt.current)),
      );
      return () => clearTimeout(timer);
    }
  }, [pending, visible]);
  return (
    <>
      <form
        action="/tienda"
        className={className}
        aria-busy={pending || visible}
        onSubmit={(event) => {
          event.preventDefault();
          if (pending || visible) return;
          const data = new FormData(event.currentTarget);
          const params = new URLSearchParams();
          data.forEach((value, key) => {
            if (
              typeof value === "string" &&
              value.trim() &&
              !(["categoria", "orden"].includes(key) && value === "all")
            )
              params.set(key, value.trim());
          });
          const current = new URLSearchParams(currentParams.toString());
          for (const [key, value] of Array.from(current.entries())) {
            if (!value || (key === "pagina" && value === "1"))
              current.delete(key);
          }
          current.sort();
          params.sort();
          if (current.toString() === params.toString()) return;
          startTransition(() => {
            router.push(`/tienda?${params}`, { scroll: false });
          });
        }}
      >
        {children}
      </form>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="search-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-cream/95 text-charcoal backdrop-blur-sm"
          >
            <PaddleLoader />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
