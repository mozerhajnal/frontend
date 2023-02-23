import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartProvider';
import { AuthContext } from '../../context/AuthProvider';
import makeAxiosRequest from '../../api/axiosInstance';
import Alert from '../../components/Alert';
import Icon from '../../components/Icon';

export default function CartItem({
  orderId,
  productId,
  imageUrl,
  quantity,
  name,
  price,
}) {
  const { setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [alertMessage, setAlertMessage] = useState('');

  const removeItem = async () => {
    try {
      const res = await makeAxiosRequest('DELETE', `/orders/${orderId}`, user);
      if (res.orderItem) {
        setCart((prev) => prev.filter((cartItem) => cartItem.id !== orderId));
      }
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.response.message,
      });
    }
  };

  return (
    <>
      <div className="row">
        {alertMessage.value && (
          <Alert
            className={alertMessage.className}
            value={alertMessage.value}
          />
        )}
        <div className="col-md-12 border ms-3 ">
          <div className="row mt-5 text-center">
            <div className="col-md-5 col-12">
              <div className="row">
                <div className="col-md-6">
                  <Link to={`/products/${productId}`} target="_blank">
                    <img src={imageUrl} className="img-fluid mb-5" alt="" />
                  </Link>
                </div>
                <div className="col-md-6 col-12">
                  <div className="removecart mb-5 mb-md-5 text-start text-black">
                  <span className="d-md-none fw-bold fs-3">Name: </span>
                    <Link to={`/products/${productId}`} target="_blank">
                      {name}
                    </Link>
                  </div>
                  <div className="removecart text-start">
                    <button
                      onClick={() => removeItem(orderId)}
                      type="button"
                      className="btn btn-light btn-sm"
                    >
                       <Icon className="bi bi-trash" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-12 d-flex flex-sm-row mb-3 mt-5 mt-md-0">
              <div className="col me-md-3 text-start text-md-center">
              <span className="d-md-none fw-bold">Quantity: </span>
                {quantity}</div>
              <div className="col me-md-3 text-start text-md-center">
              <span className="d-md-none fw-bold">Price: </span>
                {' '}
                {new Intl.NumberFormat('hu-HU', {
                  style: 'currency',
                  currency: 'HUF',
                  maximumFractionDigits: 0,
                }).format(price)}
              </div>
              <div className="col me-md-3 text-start text-md-center">
              <span className="d-md-none fw-bold">Subtotal: </span>
              {new Intl.NumberFormat('hu-HU', {
                        style: 'currency',
                        currency: 'HUF',
                        maximumFractionDigits: 0,
                      }).format(
                        quantity * price,
                      )}</div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
