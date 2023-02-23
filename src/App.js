import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { MenuProvider } from './context/MenuProvider';
import Profile from './pages/Profile';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Listings from './pages/Admin/Listings/Listings';
import AddProduct from './pages/Admin/AddProduct';
import EditProduct from './pages/Admin/EditProduct/EditProduct';
import Cart from './pages/Cart/Cart';
import NotFoundPage from './pages/NotFoundPage';
import Unauthorized from './pages/Unauthorized';
import Purchases from './pages/Purchases/Purchases';
import Navigation from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const PageLayout = () => (
  <>
    <Navigation />
    <Footer />
  </>
);

function App() {
  const lastLoggedInUser = JSON.parse(localStorage.getItem('user'));

  return (
    <BrowserRouter>
      <AuthProvider initialUserData={lastLoggedInUser}>
        <CartProvider>
          <MenuProvider>
            <Routes>
              <Route element={<PageLayout />}>
                <Route index element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/registracio" element={<Register />} />
                <Route path="/bejelentkezes" element={<Login />} />
                <Route path="/termekek" element={<Products />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/profilom" element={<Profile />} />
                  <Route
                    path="/termekek/:productId"
                    element={<ProductDetails />}
                  />
                  <Route path="/kosar" element={<Cart />} />
                  <Route path="/rendeleseim" element={<Purchases />} />
                  <Route element={<AdminRoute />}>
                  <Route path="/admin/listings" element={<Listings />} />
                  <Route path="/admin/addproduct" element={<AddProduct />} />
                  <Route
                    path="/admin/editproduct/:productId"
                    element={<EditProduct />}
                  />
                  </Route>
                </Route>
              </Route>
              <Route path="*" element={<NotFoundPage/>} />
              <Route path="/unauthorized" element={<Unauthorized/>} />
            </Routes>
          </MenuProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
