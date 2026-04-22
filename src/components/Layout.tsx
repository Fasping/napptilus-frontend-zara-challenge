import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="header-logo">
          ZARA
        </Link>
        <div className="header-cart">
          <Link to="/cart">Cart (0)</Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
