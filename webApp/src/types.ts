// Shared TypeScript types for the application

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  date: string;
  status: string;
  items: OrderItem[];
  total: number;
}
