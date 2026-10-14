export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  price: number;
  regularPrice: number;
  currency: string;
  minorUnit: number;
  categories: { id: number; name: string; slug: string }[];
  inStock: boolean;
  purchasable: boolean;
  hasOptions: boolean;
  maxQuantity: number;
  onSale: boolean;
};
export type CartItem = { product: Product; quantity: number };
