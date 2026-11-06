import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
export const metadata: Metadata = {
  title: "Mi carrito",
  robots: { index: false, follow: true },
};
export default function CartPage() {
  return (
    <section className="commerce-page">
      <div className="shell cart-page">
        <CartView />
      </div>
    </section>
  );
}
