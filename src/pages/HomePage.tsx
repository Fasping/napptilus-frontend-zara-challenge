import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { ProductListItem } from '../types';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';

export default function HomePage() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts(debouncedSearchQuery || undefined, 20);
        setProducts(data);
      } catch (err) {
        setError('No se pudieron cargar los productos. Por favor, inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [debouncedSearchQuery]);

  return (
    <div>
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a smartphone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="search-info">
          <div className="results-count">
            {products.length} RESULTS
          </div>
          <div className="filter-label">
            FILTRAR
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Cargando resultados...</div>
      ) : error ? (
        <div className="error-state">{error}</div>
      ) : products.length === 0 ? (
        <div className="empty-state">No products found</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
