export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'popularity';

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
}
