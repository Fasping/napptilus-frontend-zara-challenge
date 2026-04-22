import { Outlet, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Layout() {
  const { cartTotalItems } = useCart();

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header-logo">
          ZARA
        </Link>
        <div className="header-cart">
          <Link to="/cart">Cart ({cartTotalItems})</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
