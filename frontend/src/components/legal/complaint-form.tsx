"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Printer } from "lucide-react";
import {
  COMPLAINT_REASONS,
  complaintMessage,
  validateComplaint,
  type ComplaintErrors,
  type ComplaintInput,
} from "@/lib/complaint";
import { createReference } from "@/lib/reference";
import { whatsappTextLink } from "@/lib/contact";
import { BUSINESS } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { SelectMenu } from "@/components/ui/filter-select";

const empty: ComplaintInput = {
  name: "",
  idNumber: "",
  address: "",
  phone: "",
  invoice: "",
  reason: "",
  description: "",
  request: "",
};

const fields: {
  key: keyof ComplaintInput;
  label: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  max: number;
  hint?: string;
}[] = [
  { key: "name", label: "Nombre completo", required: true, autoComplete: "name", max: 100 },
  { key: "idNumber", label: "Cédula o documento de identidad", required: true, max: 20, hint: "Ejemplo: 001-010190-0001A" },
  { key: "address", label: "Domicilio", required: true, autoComplete: "street-address", max: 200 },
  { key: "phone", label: "Teléfono", required: true, type: "tel", autoComplete: "tel", max: 20 },
  { key: "invoice", label: "Número de factura o referencia del pedido", max: 40, hint: "Opcional. Ejemplo: P-261105-7KQ2" },
];

type Receipt = { reference: string; date: string; message: string; data: ComplaintInput };

/**
 * Builds the complaint receipt in the browser. Nothing is sent to the
 * store's server: the shopper keeps the receipt and sends it by WhatsApp.
 */
export function ComplaintForm() {
  const [values, setValues] = useState(empty);
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState<ComplaintErrors>({});
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  // Move focus to the receipt once it is rendered (the submit button unmounts).
  useEffect(() => {
    if (receipt) receiptRef.current?.focus();
  }, [receipt]);
  const set = (key: keyof ComplaintInput, value: string) =>
    setValues((v) => ({ ...v, [key]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const { data, errors } = validateComplaint(values, privacy);
    setErrors(errors);
    if (Object.keys(errors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const now = new Date();
    const reference = createReference("R", now);
    const date = new Intl.DateTimeFormat("es-NI", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Managua",
    }).format(now);
    const merchant = `${BUSINESS.storeName} (${BUSINESS.ownerName}), ${BUSINESS.address ?? `${BUSINESS.city}, ${BUSINESS.country}`}`;
    setReceipt({ reference, date, data, message: complaintMessage(data, reference, date, merchant) });
  };

  if (receipt)
    return (
      <div ref={receiptRef} tabIndex={-1} className="complaint-receipt" aria-live="polite">
        <p className="commerce-kicker">COMPROBANTE DE RECLAMO</p>
        <h3>Reclamo {receipt.reference}</h3>
        <p>
          Este comprobante puede imprimirse o guardarse como PDF. El reclamo
          queda presentado cuando se <strong>envía por WhatsApp</strong> con el
          botón de abajo; la recepción se confirma en el chat.
        </p>
        <pre className="complaint-text">{receipt.message}</pre>
        <div className="consent-actions complaint-actions">
          <a
            className="consent-button complaint-whatsapp"
            href={whatsappTextLink(receipt.message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon className="h-5 w-5" /> Enviar reclamo por WhatsApp
          </a>
          <button type="button" className="consent-button consent-button-quiet" onClick={() => window.print()}>
            <Printer size={18} aria-hidden="true" /> Imprimir o guardar PDF
          </button>
          <button
            type="button"
            className="consent-button consent-button-quiet"
            onClick={() => {
              setReceipt(null);
              setValues(receipt.data);
            }}
          >
            Corregir datos
          </button>
        </div>
      </div>
    );

  const errorList = Object.entries(errors).filter(([, message]) => message);
  return (
    <form className="complaint-form" noValidate onSubmit={submit}>
      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="complaint-errors">
          <p>Hay datos por revisar:</p>
          <ul>
            {errorList.map(([key, message]) => (
              <li key={key}>
                <a href={`#reclamo-${key}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {fields.map((f) => (
        <label key={f.key} className="complaint-field">
          <span>
            {f.label}
            {f.required && <abbr title="obligatorio" aria-hidden="true"> *</abbr>}
          </span>
          <input
            id={`reclamo-${f.key}`}
            type={f.type ?? "text"}
            autoComplete={f.autoComplete ?? "off"}
            required={f.required}
            maxLength={f.max}
            value={values[f.key]}
            aria-invalid={errors[f.key] ? true : undefined}
            aria-describedby={errors[f.key] ? `reclamo-${f.key}-error` : f.hint ? `reclamo-${f.key}-hint` : undefined}
            onChange={(e) => set(f.key, e.target.value)}
          />
          {errors[f.key] ? (
            <small id={`reclamo-${f.key}-error`} className="complaint-error">{errors[f.key]}</small>
          ) : f.hint ? (
            <small id={`reclamo-${f.key}-hint`}>{f.hint}</small>
          ) : null}
        </label>
      ))}
      <div className="complaint-field">
        <span id="reclamo-reason-label">Motivo<abbr title="obligatorio" aria-hidden="true"> *</abbr></span>
        <SelectMenu
          value={values.reason}
          onValueChange={(value) => set("reason", value)}
          placeholder="Seleccionar motivo"
          options={COMPLAINT_REASONS.map((r) => ({ value: r, label: r }))}
          className="complaint-select"
          triggerProps={{
            id: "reclamo-reason",
            "aria-labelledby": "reclamo-reason-label",
            "aria-invalid": errors.reason ? true : undefined,
            "aria-describedby": errors.reason ? "reclamo-reason-error" : undefined,
          }}
        />
        {errors.reason && <small id="reclamo-reason-error" className="complaint-error">{errors.reason}</small>}
      </div>
      <label className="complaint-field complaint-wide">
        <span>Descripción de lo ocurrido<abbr title="obligatorio" aria-hidden="true"> *</abbr></span>
        <textarea
          id="reclamo-description"
          required
          rows={5}
          maxLength={1500}
          value={values.description}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? "reclamo-description-error" : undefined}
          onChange={(e) => set("description", e.target.value)}
        />
        {errors.description && <small id="reclamo-description-error" className="complaint-error">{errors.description}</small>}
      </label>
      <label className="complaint-field complaint-wide">
        <span>Solución solicitada</span>
        <textarea
          id="reclamo-request"
          rows={2}
          maxLength={500}
          value={values.request}
          aria-invalid={errors.request ? true : undefined}
          onChange={(e) => set("request", e.target.value)}
        />
        <small>Opcional. Por ejemplo: cambio del producto o reembolso.</small>
      </label>
      <label className="complaint-check complaint-wide">
        <input
          id="reclamo-privacy"
          type="checkbox"
          checked={privacy}
          aria-invalid={errors.privacy ? true : undefined}
          onChange={(e) => setPrivacy(e.target.checked)}
        />
        <span>
          Leída la <Link href="/legal/privacidad">política de privacidad</Link>:
          estos datos no se envían a la tienda hasta que el reclamo se manda
          por WhatsApp, y se usan solo para atenderlo.
        </span>
      </label>
      <button type="submit" className="consent-button complaint-submit complaint-wide">
        Generar comprobante
      </button>
    </form>
  );
}
