import { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../../context/AuthProvider';
import makeAxiosRequest from '../../api/axiosInstance';
import PurchasesItem from './PurchasesItem';
import Alert from '../../components/Alert';

export default function Purchases() {
  const { user } = useContext(AuthContext);
  const { userId } = jwtDecode(user);
  const [purchases, setPurchases] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const getPurchases = async () => {
    try {
      const res = await makeAxiosRequest('GET', `/purchases/${userId}`, user);
      setPurchases(res.purchases);
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
    }
  };

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <section className="container mt-5 mb-5">
      <h1 className="mt-5 text-center mb-5 pb-5">Rendeléseim</h1>
      {alertMessage.value && (
        <Alert className={alertMessage.className} value={alertMessage.value} />
      )}
      <Container>
        <div className="container mt-5 mb-5 pb-5">
          <Row xs={1} md={3} className="g-4">
            {purchases &&
              purchases.map((purchase) => {
                const { _id, paidDate, paidAmount, productId } = purchase;
                const imgUrl = purchase.productId.productImage[0];
                const { name } = productId;
                return (
                  <PurchasesItem
                    key={_id}
                    name={name}
                    paidDate={paidDate}
                    paidAmount={paidAmount}
                    imgUrl={imgUrl}
                  />
                );
              })}
          </Row>
        </div>
      </Container>
    </section>
  );
}
