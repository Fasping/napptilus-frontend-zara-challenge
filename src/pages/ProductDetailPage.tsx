import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { ProductDetail, ColorOption, StorageOption } from '../types';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);
  
  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        setSelectedColor(null);
        setSelectedStorage(null);
        
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Could not load product details.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-state">Loading product...</div>;
  if (error || !product) return <div className="error-state">{error || 'Product not found.'}</div>;

  const currentImage = selectedColor?.imageUrl || product.colorOptions?.[0]?.imageUrl || product.imageUrl;
  const currentPrice = product.basePrice + (selectedStorage?.price || 0);
  const canAddToCart = selectedColor && selectedStorage;

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">BACK</Link>
      
      <div className="product-detail-layout">
        <div className="product-image-section">
          <img src={currentImage} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-info-section">
          <div className="product-detail-header">
            <h1 className="product-detail-name">{product.name}</h1>
            <span className="product-detail-price">{currentPrice} EUR</span>
          </div>

          <div className="product-options">
            <div className="option-group">
              <span className="option-label">COLOR: {selectedColor?.name || ''}</span>
              <div className="color-options">
                {product.colorOptions.map((color) => (
                  <button
                    key={color.hexCode}
                    className={`color-btn ${selectedColor?.hexCode === color.hexCode ? 'selected' : ''}`}
                    style={{ backgroundColor: color.hexCode }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color.name}`}
                  />
                ))}
              </div>
            </div>

            <div className="option-group">
              <span className="option-label">STORAGE: {selectedStorage?.capacity || ''}</span>
              <div className="storage-options">
                {product.storageOptions.map((storage) => (
                  <button
                    key={storage.capacity}
                    className={`storage-btn ${selectedStorage?.capacity === storage.capacity ? 'selected' : ''}`}
                    onClick={() => setSelectedStorage(storage)}
                  >
                    {storage.capacity}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            className="add-to-cart-btn"
            disabled={!canAddToCart}
            onClick={() => alert('Add to cart (placeholder)')}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      
      <div className="product-specs-section">
        <h2 className="section-title">SPECIFICATIONS</h2>
        <ul className="specs-list">
          <li className="spec-item">
            <span className="spec-name">BRAND</span>
            <span className="spec-value">{product.brand}</span>
          </li>
          <li className="spec-item">
            <span className="spec-name">DESCRIPTION</span>
            <span className="spec-value">{product.description}</span>
          </li>
          {Object.entries(product.specs).map(([key, value]) => (
            <li key={key} className="spec-item">
              <span className="spec-name">{key}</span>
              <span className="spec-value">{value}</span>
            </li>
          ))}
        </ul>
      </div>

      {product.similarProducts.length > 0 && (
        <div className="similar-products-section">
          <h2 className="section-title">SIMILAR PRODUCTS</h2>
          <div className="product-grid">
            {product.similarProducts.map((similar) => (
              <ProductCard key={similar.id} product={similar} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
