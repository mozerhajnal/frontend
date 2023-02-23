import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import makeAxiosRequest from '../../../api/axiosInstance';
import Alert from '../../../components/Alert';
import ListingItem from './ListingItem';
import { AuthContext } from '../../../context/AuthProvider';

export default function Listings() {
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const { user } = useContext(AuthContext);

  const getProducts = async () => {
    try {
      const res = await makeAxiosRequest('GET', '/products');
      setProducts(res.products);
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [user]);

  async function handleDelete(id) {
    try {
      await makeAxiosRequest('DELETE', `/admin/products/${id}`, user);
      getProducts();
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
    }
  }

  return (
    <section className="container mt-5">
      <div>
        <Link
          to="/admin/addproduct"
          className="btn btn-success text-white fw-bold mt-3 p-3"
        >
          <h3>ADD NEW PRODUCT</h3>
        </Link>
      </div>
      <div className="admin-main ps-3 pe-3 mt-5">
        <h1 className="text-center mt-5 mb-5">All Products</h1>
        {alertMessage.value && (
          <Alert
            classNameName={alertMessage.classNameName}
            value={alertMessage.value}
          />
        )}
        <div className="row mt-md-5 mt-3 pr-md-5 text-center">
          <div className=" col-md-2 fw-bold d-none d-md-block fs-4">Image</div>
          <div className=" col-md-3 fw-bold d-none d-md-block fs-4">Name</div>
          <div className=" col-md-2 fw-bold d-none d-md-block fs-4">SKU</div>
          <div className=" col-md-1 fw-bold d-none d-md-block fs-4">Price</div>
          <div className=" col-md-2 fw-bold d-none d-md-block fs-4">Quantity</div>
          <div className=" col-md-2 fw-bold d-none d-md-block fs-4">Mod./Del.</div>
        </div>
        {products &&
          products.map((product) => {
            const { sku, name, price, quantity } = product;
            const id = product._id;
            const imgUrl = product.productImage[0];
            return (
              <ListingItem
                key={id}
                id={id}
                name={name}
                price={price}
                sku={sku}
                imgUrl={imgUrl}
                quantity ={quantity}
                handleDelete={() => handleDelete(id)}
              />
            );
          })}
      </div>
    </section>
  );
}
