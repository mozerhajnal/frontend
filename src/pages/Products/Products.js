import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import makeAxiosRequest from '../../api/axiosInstance';
import Alert from '../../components/Alert';
import './Products.scss';
import ProductItem from './ProductItem';
import Loading from '../../components/Loading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await makeAxiosRequest('GET', '/products');
      setProducts(res.products);
      setIsLoading(false);
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="mt-5">
      {alertMessage.value && (
        <Alert className={alertMessage.className} value={alertMessage.value} />
      )}
         <Loading isLoading={isLoading}>
      <div className="container mt-5">
      <Row xs={1} md={3} lg={4} className="g-4">
          {products &&
            products.map((product) => {
              const { productImage, name, price } = product;
              const id = product._id;
              return (
                <ProductItem
                  key={id}
                  id ={id}
                  imageUrl={productImage[0]}
                  name={name}
                  price={price}
                />
              );
            })}
        </Row>
      </div>
      </Loading>
    </section>
  );
}
