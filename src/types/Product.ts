export type ProductCategory = "Skincare" | "Makeup" | "Perfume";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  image?: string;
  description: string;
  rating: number;
  isFavourite: boolean;
}
