import { Product } from '@/types/product';
import { fetchAuthenticated } from './apiClient';
import { CartItem } from '@/context/CartContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginCredentials {
  username?: string;
  password?: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterCredentials {
  email?: string;
  password?: string;
  // Ajoutez d'autres champs si nécessaire pour l'inscription
}

interface RegisterResponse {
  message: string;
  user?: {
    email: string;
    roles: string[];
  };
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  
  // Symfony souvent encapsule les collections dans un membre, ex: "hydra:member"
  // On vérifie cette possibilité. Adaptez si le nom est différent.
  return data['hydra:member'] || data;
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login_check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Identifiants invalides');
  }

  return response.json();
}

export async function registerUser(credentials: RegisterCredentials): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    // Symfony retourne un champ 'error' dans notre cas
    throw new Error(data.error || 'Erreur lors de l\'inscription');
  }

  return data;
}

// --- Cart API ---

export async function getCart(): Promise<CartItem[]> {
    const data = await fetchAuthenticated('/cart');
    // Transformer les données de l'API pour correspondre à notre type CartItem
    return data.products.map((p: any) => ({
        ...p,
        id: p.id,
        title: p.name, // L'API retourne 'name', on le mappe vers 'title'
        image: p.image ? `${API_BASE_URL}${p.image}` : null,
    }));
}

export async function addProductToCart(productId: number): Promise<any> {
  return fetchAuthenticated(`/cart/products/${productId}`, { method: 'POST' });
}

export async function removeProductFromCart(productId: number): Promise<any> {
  return fetchAuthenticated(`/cart/products/${productId}`, { method: 'DELETE' });
}

export async function validateCart(): Promise<any> {
  return fetchAuthenticated('/cart/validate', { method: 'POST' });
} 