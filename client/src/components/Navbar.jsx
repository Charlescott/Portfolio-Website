import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="nav-wrap">
      <nav className="container nav">
        <NavLink to="/" className="brand">
          Scott Fairdosi
        </NavLink>
        <div className="nav-links">
          <NavLink to="/music">Music</NavLink>
          <NavLink to="/engineering">Engineering</NavLink>
        </div>
      </nav>
    </header>
  );
}
