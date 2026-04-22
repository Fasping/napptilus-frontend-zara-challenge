import { Link } from 'react-router-dom';
import { ProductListItem } from '../types';

interface ProductCardProps {
  product: ProductListItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image" 
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <div className="product-details">
          <span className="product-brand">{product.brand}</span>
          <span className="product-name">{product.name}</span>
        </div>
        <span className="product-price">{product.basePrice} EUR</span>
      </div>
    </Link>
  );
}
