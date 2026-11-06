"use client";
import { CONTACT_NUMBER, contactLink } from "@/lib/contact";

/**
 * WhatsApp contact link whose greeting follows the current time in Managua.
 * The greeting is computed on click so statically rendered pages never show
 * the time the page was built.
 */
export function ContactLink({
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "href" | "target" | "rel">) {
  return (
    <a
      {...props}
      href={`https://wa.me/${CONTACT_NUMBER}`}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        event.currentTarget.href = contactLink();
        props.onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
