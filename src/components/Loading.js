import { Spinner } from 'react-bootstrap';

function Loading({ children, isLoading }) {
  return isLoading ? (
    <Spinner animation="border" variant="primary" />
  ) : children;
}

export default Loading;