"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="shell py-20">
      <h1 className="font-display text-5xl">Algo no salió como esperábamos.</h1>
      <p className="my-6">
        No pudimos cargar esta sección. Tu carrito sigue guardado en este
        dispositivo.
      </p>
      <Button onClick={reset}>Volver a intentar</Button>
    </section>
  );
}
