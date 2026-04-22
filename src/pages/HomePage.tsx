import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { ProductListItem } from '../types';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setError(null);
        const data = await getProducts(undefined, 20);
        setProducts(data);
      } catch (err) {
        setError('No se pudieron cargar los productos. Por favor, inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading-state">Cargando resultados...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
