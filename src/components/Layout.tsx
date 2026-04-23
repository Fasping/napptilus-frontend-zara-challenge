import { Outlet, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Layout() {
  const { cartTotalItems } = useCart();
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header-logo">
          ZARA
        </Link>
        {!isCartPage && (
          <div className="header-cart">
            <Link to="/cart">Cart ({cartTotalItems})</Link>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
