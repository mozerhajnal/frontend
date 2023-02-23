import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

export default function ProductItem({ id, imageUrl, name, price }) {
  const { user } = useContext(AuthContext);

  return (
    <Col>
      <Link to={user ? `/termekek/${id}` : '/bejelentkezes'}>
        <Card className="shadow-lg p-3 mb-5 bg-body rounded">
          <div className="image-container h-70">
            {' '}
            <Card.Img variant="top" src={imageUrl} />
          </div>
          <Card.Body className="item">
            <div className="pb-1">
              <h5 className="text-center mt-3">{name}</h5>
              <p className="card-text text-center mb-3">
                {new Intl.NumberFormat('hu-HU', {
                  style: 'currency',
                  currency: 'HUF',
                  maximumFractionDigits: 0,
                }).format(price)}
              </p>
              <p className="text-center">
                <button type="submit" className="btn btn-success fw-bold p-3">
                  MEGVESZEM
                </button>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
