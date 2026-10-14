import { CartView } from "@/components/cart/cart-view";
export const metadata = { title: "Mi carrito" };
export const dynamic = "force-dynamic";
export default function CartPage() {
  return (
    <section className="shell py-12">
      <CartView />
    </section>
  );
}
