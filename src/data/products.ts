import { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: "1",
    name: "Hydrating Moisturiser",
    brand: "CeraVe",
    category: "Skincare",
    price: 18.99,
    description: "A moisturiser for everyday skin hydration.",
    rating: 4.8,
    isFavourite: false
  },
  {
    id: "2",
    name: "Dior Sauvage",
    brand: "Dior",
    category: "Perfume",
    price: 89.99,
    description: "A fresh and woody fragrance.",
    rating: 4.7,
    isFavourite: false
  },
  {
    id: "3",
    name: "Lip Gloss",
    brand: "NYX",
    category: "Makeup",
    price: 9.99,
    description: "A glossy finish for everyday makeup.",
    rating: 4.5,
    isFavourite: false
  }
];
