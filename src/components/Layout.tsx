import { Outlet, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Layout() {
  const { cartTotalItems } = useCart();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header-logo" aria-label="Zara Home">
          ZARA
        </Link>
        {!isCartPage && (
          <div className="header-cart">
            <Link to="/cart" aria-label={`View cart with ${cartTotalItems} items`}>Cart ({cartTotalItems})</Link>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
