export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; thumb: string; alt: string }[];
  price: number;
  regularPrice: number;
  currency: string;
  minorUnit: number;
  categories: { name: string; slug: string }[];
  inStock: boolean;
  purchasable: boolean;
  hasOptions: boolean;
  maxQuantity: number;
  onSale: boolean;
  /** Exchange rate used to convert the dollar price to córdobas. */
  fx?: ExchangeRate;
};
import type { ExchangeRate } from "@/lib/exchange-rate";
export type CartItem = { product: Product; quantity: number };
