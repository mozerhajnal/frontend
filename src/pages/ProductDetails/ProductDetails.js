import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import makeAxiosRequest from '../../api/axiosInstance';
import Alert from '../../components/Alert';
import './ProductDetails.scss';
import ProductDetailsItem from './ProductDetailsItem';
import Loading from '../../components/Loading';

export default function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const res = await makeAxiosRequest('GET', `/products/${productId}`);
      setProduct(res.product);
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
    getProduct();
  }, []);

  return (
    <section className="mt-5">
      {alertMessage.value && (
        <Alert className={alertMessage.className} value={alertMessage.value} />
      )}
        <Loading isLoading={isLoading}>
      <div className="container mt-5">
        <div className="row mt-5 no-gutters">
          {product && (
            <ProductDetailsItem
              id={product._id}
              name={product.name}
              price={product.price}
              imgUrl={product.productImage}
              quantity={product.quantity}
              description={product.description}
            />
          )}
        </div>
      </div>
      </Loading>
    </section>
  );
}
