"use client";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export function SearchForm({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const currentParams = useSearchParams();
  return (
    <form
      action="/tienda"
      className={className}
      aria-busy={pending}
      onSubmit={(event) => {
        event.preventDefault();
        if (pending) return;
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
  );
}
