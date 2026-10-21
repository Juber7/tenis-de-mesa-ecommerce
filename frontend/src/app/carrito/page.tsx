import { CartView } from "@/components/cart/cart-view";
export const metadata = { title: "Mi carrito" };
export default function CartPage() {
  return (
    <section className="commerce-page">
      <div className="shell cart-page">
        <CartView />
      </div>
    </section>
  );
}
