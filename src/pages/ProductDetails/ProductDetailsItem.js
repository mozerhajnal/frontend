import { nanoid } from 'nanoid';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import ControlledCarousel from '../../components/ControlledCarousel';
import { AuthContext } from '../../context/AuthProvider';
import { CartContext } from '../../context/CartProvider';
import SelectField from '../../components/SelectField';
import makeAxiosRequest from '../../api/axiosInstance';
import Alert from '../../components/Alert';

export default function ProductDetailsItem({
  id,
  imgUrl,
  name,
  price,
  quantity,
  description,
}) {
  const { user } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const availableQuantity = Array.from({ length: quantity }, (v, k) => k + 1);
  const [selectedQuantity, setSelectedQuantity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const { userId } = jwtDecode(user);
  const navigate = useNavigate();

  function handleOnChange(e) {
    setSelectedQuantity(e.target.value);
  }

  const addToCart = async () => {
    setCart((curr) => [...curr, { quantity: selectedQuantity }]);
    const sendData = {
      productId: id,
      quantity: selectedQuantity || 1,
    };
    try {
      const res = await makeAxiosRequest(
        'POST',
        `/orders/${userId}`,
        user,
        sendData
      );
      if (res.orders.id) {
        setAlertMessage({
          className: 'alert-success',
          value: 'Termék sikeresen hozzáadva a kosárhoz.',
        });
        navigate('/kosar');
      }
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
    }
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="row no-gutters">
        <div className="col-md-1 d-none d-lg-block pr-3">
          <div className="small-pic-side">
            {imgUrl &&
              imgUrl.map((image) => {
                return (
                  <div key={nanoid()} className="mb-1 carousel__small">
                    <img className="img-fluid" src={image} alt="" />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-lg-7 col-12">
          {imgUrl && <ControlledCarousel imgUrl={imgUrl} />}
        </div>
        <div className="col-lg-4 col-12">
          <div className="text-center">
            <h3 className="mt-5 mt-lg-0 text-center fs-3">{name}</h3>
            <p className="mt-3 fs-3" id="price">
              {new Intl.NumberFormat('hu-HU', {
                style: 'currency',
                currency: 'HUF',
                maximumFractionDigits: 0,
              }).format(price)}
            </p>
            <div className="form-group mt-5 mb-5 d-flex flex-column justify-content-center">
              <div className="w-50 mx-auto">
                <SelectField
                  id="quantity"
                  name="quantity"
                  label="Darab"
                  options={availableQuantity}
                  onChange={(e) => handleOnChange(e)}
                  value={selectedQuantity}
                />
              </div>
              <div className="mx-auto mb-5">
                <button
                  onClick={() => addToCart(id)}
                  type="submit"
                  className="btn btn-success btn-block btn-lg mt-5 fw-bold p-3"
                >
                  KOSÁRBA RAKOM
                </button>
              </div>
              <div className="w-100 mt-5">
                <Link
                  to="/termekek"
                  className="btn btn-light btn-outline-success btn-sm fw-bold p-3"
                >
                  TOVÁBB VÁSÁROLOK
                </Link>
              </div>
            </div>
            {alertMessage.value && (
              <Alert
                className={alertMessage.className}
                value={alertMessage.value}
              />
            )}
          </div>
        </div>
      </div>
      <div className="row mt-5 pt-5 text-justify">
        <div className="col-12">
          <p className="text-center fst-italic lh-lg fs-4">{description}</p>
        </div>
      </div>
    </div>
  );
}
