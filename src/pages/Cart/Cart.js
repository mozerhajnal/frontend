import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { CartContext } from '../../context/CartProvider';
import makeAxiosRequest from '../../api/axiosInstance';
import Alert from '../../components/Alert';
import ModalItem from '../../components/Modaltem';
import Loading from '../../components/Loading';
import CartItem from './CartItem';


export default function Cart() {
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  const { userId } = jwtDecode(user);
  const [alertMessage, setAlertMessage] = useState('');
  const [totalToPay, setTotalToPay] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const initialValue = 0;

  const getOrders = async () => {
    try {
      const res = await makeAxiosRequest('GET', `/orders/${userId}`, user);
      if (res.orders) {
        setCart(res.orders);
        setIsLoading(false);
      }
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    setTotalToPay(
      cart
        .map((item) => parseInt(item.price * item.quantity, 10))
        .reduce((prev, next) => prev + next, initialValue)
    );
  }, [cart]);

  const removeAllOrder = async () => {
    try {
      const res = await makeAxiosRequest('DELETE', `/orders/`, user);
      if (res.deleted) setCart([]);
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
    }
  };
  const buyOrder = async () => {
    try {
      const sendData = {
        totalPaid: totalToPay,
      };
      const res = await makeAxiosRequest(
        'PATCH',
        `/orders/${userId}`,
        user,
        sendData
      );
      if (res.purchases) {
        setShow(true);
        setTimeout(() => {
          setShow(false);
          setCart([]);
          navigate('/rendeleseim');
        }, 5000);
      }
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
    }
  };

  return (
    <div className="container text-center text-black">
      {alertMessage.value && (
        <Alert className={alertMessage.className} value={alertMessage.value} />
      )}
      <Loading isLoading={isLoading}>
        <div className="row mt-5">
          <h1>
            {cart.length > 0
              ? `${cart.length} termék van a kosárban.`
              : 'Üres a kosarad.'}
          </h1>
        </div>
        <div className="w-100 mt-5">
                <Link
                  to="/termekek"
                  className="btn btn-light btn-outline-success btn-sm fw-bold p-3"
                >
                  TOVÁBB VÁSÁROLOK
                </Link>
              </div>
        {cart.length > 0 && (
          <div className="row">
            <div className="col-md-8 col-12 border">
              <div className="row mt-5 border-top border-bottom border-style pt-3 pb-3 ">
                <div className="col-md-5 col-12 d-none d-md-block">
                  <div>
                    <h3 className="fw-bold">Termékek</h3>
                  </div>
                </div>
                <div className="col-md-7 col-12 d-md-flex d-none d-md-block">
                  <div className="col me-3">
                    <h3 className="fw-bold">Darab</h3>
                  </div>
                  <div className="col me-3">
                    <h3 className="fw-bold">Ár</h3>
                  </div>
                  <div className="col me-3">
                    <h3 className="fw-bold">Részösszeg</h3>
                  </div>
                </div>
                {!isLoading &&
                  cart.length > 0 &&
                  cart.map((item) => {
                    const {
                      id,
                      productId,
                      productImage,
                      name,
                      price,
                      quantity,
                    } = item;
                    return (
                      <CartItem
                        key={id}
                        orderId={id}
                        productId={productId}
                        imageUrl={productImage[0]}
                        quantity={quantity}
                        name={name}
                        price={price}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="col-md-4 col-12 mt-5 pr-5 pt-5">
              <div className="shadow-lg rounded pt-5 mt-5 border">
                <div className="mt-3">
                  <div className=" d-flex justify-content-end">
                    <button
                      type="submit"
                      onClick={removeAllOrder}
                      className="btn-light mb-5 me-5"
                    >
                    Töröl
                    </button>
                  </div>
                  <h4 className="fw-bold">
                    Összeg:{' '}
                    <span className="">
                      {new Intl.NumberFormat('hu-HU', {
                        style: 'currency',
                        currency: 'HUF',
                        maximumFractionDigits: 0,
                      }).format(totalToPay)}
                    </span>
                  </h4>
                  <div className=" d-flex justify-content-center">
                    <button
                      type="submit"
                      onClick={() => buyOrder()}
                      className="btn-success btn-lg mt-3 mb-5 w-50 text-center"
                    >
                      Megrendelés
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <ModalItem
          show={show}
          text="Megkaptuk a rendelésedet! Értesíteni fogunk, ha postáztuk."
        />
      </Loading>
    </div>
  );
}
