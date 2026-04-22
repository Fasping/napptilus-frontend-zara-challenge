import { ProductListItem, ProductDetail } from '../types';

function getApiConfig() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error('Missing VITE_API_URL or VITE_API_KEY in environment variables');
  }

  return { apiUrl, apiKey };
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const { apiUrl, apiKey } = getApiConfig();

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  };

  const response = await fetch(`${apiUrl}${endpoint}`, { headers });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

export async function getProducts(search?: string, limit?: number, offset?: number): Promise<ProductListItem[]> {
  const params = new URLSearchParams();
  
  if (search) params.append('search', search);
  if (limit !== undefined) params.append('limit', limit.toString());
  if (offset !== undefined) params.append('offset', offset.toString());

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return fetchApi<ProductListItem[]>(`/products${queryString}`);
}

export async function getProductById(id: string): Promise<ProductDetail> {
  return fetchApi<ProductDetail>(`/products/${id}`);
}
