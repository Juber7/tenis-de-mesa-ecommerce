"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { onOpenConsentPreferences, saveConsent } from "@/lib/consent";
import { useConsent } from "./use-consent";

const categories = [
  {
    key: "necessary",
    title: "Necesarias",
    text: "Guardan tu carrito y esta preferencia en tu dispositivo. Sin ellas la tienda no funciona, por eso siempre están activas.",
  },
  {
    key: "analytics",
    title: "Analíticas",
    text: "Medirían de forma agregada cómo se usa la tienda. Hoy no usamos ninguna herramienta de este tipo; si la incorporamos, solo se activará con tu permiso.",
  },
  {
    key: "marketing",
    title: "Publicitarias",
    text: "Permitirían mostrar anuncios relacionados con tus intereses. Hoy no usamos ninguna herramienta de este tipo; si la incorporamos, solo se activará con tu permiso.",
  },
] as const;

export function CookieConsent() {
  const consent = useConsent();
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState({ analytics: false, marketing: false });

  useEffect(
    () =>
      onOpenConsentPreferences(() => {
        const current = consent ?? null;
        setChoice({
          analytics: current?.analytics ?? false,
          marketing: current?.marketing ?? false,
        });
        setOpen(true);
      }),
    [consent],
  );

  const decide = (analytics: boolean, marketing: boolean) => {
    saveConsent({ analytics, marketing });
    setOpen(false);
  };
  const configure = () => {
    setChoice({
      analytics: consent?.analytics ?? false,
      marketing: consent?.marketing ?? false,
    });
    setOpen(true);
  };

  return (
    <>
      {/* During SSR and hydration `consent` is undefined: the banner is rendered
          hidden and CSS shows it when the head script found no stored choice. */}
      {(consent === null || consent === undefined) && !open && (
        <section
          className="consent-banner"
          data-ssr={consent === undefined ? "" : undefined}
          role="region"
          aria-label="Aviso de cookies"
        >
          <h2>Tu privacidad</h2>
          <p>
            Usamos almacenamiento técnico necesario para que el carrito y tus
            preferencias funcionen. No usamos cookies analíticas ni
            publicitarias; si en el futuro las incorporamos, solo se activarán
            con tu permiso. Más información en la{" "}
            <Link href="/legal/cookies">política de cookies</Link>.
          </p>
          <div className="consent-actions">
            <button type="button" className="consent-button" onClick={() => decide(false, false)}>
              Rechazar no esenciales
            </button>
            <button type="button" className="consent-button consent-button-quiet" onClick={configure}>
              Configurar
            </button>
            <button type="button" className="consent-button" onClick={() => decide(true, true)}>
              Aceptar todas
            </button>
          </div>
        </section>
      )}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="consent-overlay" />
          <Dialog.Content className="consent-dialog">
            <Dialog.Close className="consent-close" aria-label="Cerrar preferencias">
              <X size={20} />
            </Dialog.Close>
            <Dialog.Title className="consent-dialog-title">
              Preferencias de cookies
            </Dialog.Title>
            <Dialog.Description className="consent-dialog-text">
              Elige qué tecnologías permites. Puedes cambiar tu decisión cuando
              quieras desde el enlace «Preferencias de cookies» al pie de la
              página.
            </Dialog.Description>
            <ul className="consent-list">
              {categories.map((c) => {
                const locked = c.key === "necessary";
                const checked = locked ? true : choice[c.key];
                return (
                  <li key={c.key}>
                    <label className="consent-option">
                      <span>
                        <strong>{c.title}</strong>
                        <small>{c.text}</small>
                      </span>
                      <input
                        type="checkbox"
                        role="switch"
                        checked={checked}
                        disabled={locked}
                        aria-checked={checked}
                        onChange={(event) => {
                          if (!locked)
                            setChoice((s) => ({ ...s, [c.key]: event.target.checked }));
                        }}
                      />
                    </label>
                  </li>
                );
              })}
            </ul>
            <div className="consent-actions">
              <button type="button" className="consent-button" onClick={() => decide(false, false)}>
                Rechazar no esenciales
              </button>
              <button
                type="button"
                className="consent-button consent-button-quiet"
                onClick={() => decide(choice.analytics, choice.marketing)}
              >
                Guardar selección
              </button>
              <button type="button" className="consent-button" onClick={() => decide(true, true)}>
                Aceptar todas
              </button>
            </div>
            <p className="consent-dialog-text">
              Detalles en la <Link href="/legal/cookies" onClick={() => setOpen(false)}>política de cookies</Link>{" "}
              y la <Link href="/legal/privacidad" onClick={() => setOpen(false)}>política de privacidad</Link>.
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
