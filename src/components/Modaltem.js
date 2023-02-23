import Modal from 'react-bootstrap/Modal';

export default function ModalItem({ show, setShow, text }) {
  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="pt-5 vh-50"
      onHide={() => setShow(false)}
    >
      <Modal.Header closeButton />
      <Modal.Body className="mt-5 mb-5 text-center container">
        <div className="fs-1 text-center fst-italic fw-bold lh-lg ">{text}</div>
      </Modal.Body>
    </Modal>
  );
}
