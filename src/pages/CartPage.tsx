import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, cartTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2 className="section-title">CART</h2>
        <p>Your shopping cart is empty.</p>
        <Link to="/" className="continue-shopping-link">CONTINUE SHOPPING</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="section-title">CART</h2>
      
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={`${item.productId}-${item.color}-${item.storage}`} className="cart-item">
            <div className="cart-item-image-container">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            </div>
            
            <div className="cart-item-details">
              <div className="cart-item-header">
                <span className="cart-item-brand">{item.brand}</span>
                <span className="cart-item-name">{item.name}</span>
              </div>
              
              <div className="cart-item-options">
                <span className="cart-item-option">{item.storage} | {item.color}</span>
                <span className="cart-item-price">{item.price} EUR</span>
                <span className="cart-item-quantity">QUANTITY: {item.quantity}</span>
              </div>
              
              <button 
                className="cart-item-remove"
                onClick={() => removeFromCart(item.productId, item.color, item.storage)}
              >
                REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-total">
          <span>TOTAL</span>
          <span>{cartTotalPrice} EUR</span>
        </div>
        <div className="cart-actions">
          <Link to="/" className="continue-shopping-link">CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  );
}
