import { NavLink } from 'react-router-dom';

export default function NavItem({ endpoint, children, onclick }) {
  return (
    <NavLink
      to={endpoint}
      className="nav-link px-2 text-decoration-none"
      onClick={onclick}
    >
      {children}
    </NavLink>
  );
}
