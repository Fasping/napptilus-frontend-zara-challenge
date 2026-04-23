import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, cartTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2 className="cart-title">CART</h2>
        <div className="cart-empty-actions">
          <Link to="/" className="cart-continue-btn">CONTINUE SHOPPING</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">CART <span>({cartItems.length})</span></h2>

      <div className="cart-items-list">
        {cartItems.map((item, index) => (
          <div key={`${item.productId}-${item.color}-${item.storage}-${index}`} className="cart-item">
            <div className="cart-item-image-container">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            </div>

            <div className="cart-item-details">
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-option">
                  {item.storage} | {item.color}{item.quantity > 1 ? ` | x${item.quantity}` : ''}
                </span>
                <span className="cart-item-price">{item.price} EUR</span>
              </div>

              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.productId, item.color, item.storage)}
                aria-label={`Remove ${item.name} in ${item.color} ${item.storage} from cart`}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        {/* Mobile: total shown above buttons */}
        <div className="cart-total">
          <span>TOTAL</span>
          <span>{cartTotalPrice} EUR</span>
        </div>

        <div className="cart-actions-row">
          <Link to="/" className="cart-continue-btn">CONTINUE SHOPPING</Link>
          <div className="cart-total-pay">
            {/* Desktop: total shown inline with PAY */}
            <div className="cart-total">
              <span>TOTAL</span>
              <span>{cartTotalPrice} EUR</span>
            </div>
            <button className="cart-pay-btn">PAY</button>
          </div>
        </div>
      </div>
    </div>
  );
}
