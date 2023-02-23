import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import NavItem from './NavItem';
import { AuthContext } from '../../context/AuthProvider';
import { CartContext } from '../../context/CartProvider';
import { useMenu } from '../../context/MenuProvider';
import { ReactComponent as CartIcon } from './icons/cart-svgrepo-com.svg';
import { ReactComponent as ProfileIcon } from './icons/profile-add-svgrepo-com.svg';
import { ReactComponent as AdminIcon } from './icons/dashboard-svgrepo-com.svg';
import { ReactComponent as LogoutIcon } from './icons/logout-svgrepo-com.svg';
import { ReactComponent as Purchases } from './icons/delivery-svgrepo-com.svg';
import { ReactComponent as Login } from './icons/login-svgrepo-com.svg';
import { ReactComponent as Register } from './icons/registration-desk-svgrepo-com.svg';
import { ReactComponent as Shop } from './icons/shop-svgrepo-com.svg';
import './Navbar.scss';
import logo from './icons/logo-designer.svg';

export default function Navigation() {
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { dispatch } = useMenu();
  const [isAdmin, setIsAdmin] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(jwtDecode(user).isAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    dispatch({ type: 'resetMenu' });
    navigate('/');
  };

  return (
    <>
      <Navbar collapseOnSelect expand="sm" expanded={expanded}>
        <Container>
          <NavLink to="/" className="h1 text-decoration-none text-dark">
            <img
              src={logo}
              width="150"
              height="150"
              className="d-inline-block align-top"
              alt="logo"
            />
          </NavLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end" style={{ flex: 1 }}>
              {user ? (
                <div className="d-flex justify-content-between align-items-sm-end flex-column flex-sm-row mb-3 mt-md-5">
                  {isAdmin ? (
                    <NavItem endpoint="/admin/listings" onclick={() => setExpanded(false)}>
                      <AdminIcon className="svg-icon d-none d-md-block m-3" />
                      <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                        ADMIN
                      </span>
                    </NavItem>
                  ) : (
                    <>
                      <NavItem endpoint="/kosar" onclick={() => setExpanded(false)}>
                        <CartIcon className="svg-icon d-none d-md-block m-3" />
                        <span className="minicart text-center  d-none d-md-block">
                          {cart.length > 0 ? cart.length : 0}
                        </span>
                        <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                          KOSÁR
                        </span>
                      </NavItem>
                      <NavItem endpoint="/termekek" onclick={() => setExpanded(false)}>
                        <Shop className="svg-icon d-none d-md-block m-3" />
                        <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                          TERMÉKEK
                        </span>
                      </NavItem>
                      <NavItem endpoint="/rendeleseim" onclick={() => setExpanded(false)}>
                        <Purchases className="svg-icon d-none d-md-block m-3" />
                        <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                          RENDELÉSEIM
                        </span>
                      </NavItem>
                    </>
                  )}
                  <NavItem endpoint="/profilom" onclick={() => setExpanded(false)}>
                    <ProfileIcon className="svg-icon  d-none d-md-block m-3" />
                    <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                      PROFILOM
                    </span>
                  </NavItem>
                  <NavItem endpoint="/" onclick={() => handleLogout()} >
                    <LogoutIcon className="svg-icon  d-none d-md-block m-3" />
                    <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                      KIJELENTKEZÉS
                    </span>
                  </NavItem>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-sm-end flex-column flex-sm-row ">
                  <NavItem endpoint="/termekek" onclick={() => setExpanded(false)}>
                    <Shop className="svg-icon  d-none d-md-block m-3" />
                    <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                      TERMÉKEK
                    </span>
                  </NavItem>
                  <NavItem endpoint="/bejelentkezes" onclick={() => setExpanded(false)}>
                    <Login className="svg-icon d-none d-md-block m-3" />
                    <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                      BEJELENTKEZÉS
                    </span>
                  </NavItem>
                  <NavItem endpoint="/registracio" onclick={() => setExpanded(false)}>
                    <Register className="svg-icon d-none d-md-block m-3" />
                    <span className="text-start text-md-center d-block fw-bold text-black m-3 fs-6">
                      REGISZTRÁCIÓ
                    </span>
                  </NavItem>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
