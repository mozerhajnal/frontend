import { Card, Col } from 'react-bootstrap';
import moment from 'moment';

export default function PurchasesItem({ paidDate, paidAmount, imgUrl, name }) {
  return (
    <Col>
      <Card className="shadow-lg p-3 mb-5 bg-body rounded">
        <div className="image-container h-70">
          {' '}
          <Card.Img variant="top" src={imgUrl} />
        </div>
        <Card.Body className="item">
          <div className="pb-1">
            <h4 className="text-center mt-3 mb-3">{name}</h4>
            <p className="card-text text-center fs-4 fw-bold mb-3 mt-3 p-4">
              {' '}
              Összeg:{' '}
              {new Intl.NumberFormat('hu-HU', {
                style: 'currency',
                currency: 'HUF',
                maximumFractionDigits: 0,
              }).format(paidAmount)}
            </p>
            <p className="card-text text-center mb-3 mt-3 p-4">
              {' '}
              Dátum: {moment(paidDate).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
