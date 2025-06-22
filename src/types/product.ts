export interface Review {
  id: number;
  user: {
    email: string;
  };
  comment: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string | null;
  reviews?: Review[];
  tag?: string; 
} 