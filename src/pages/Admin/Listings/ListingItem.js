import { Link } from 'react-router-dom';

export default function ListingItem({
  id,
  imgUrl,
  sku,
  quantity,
  name,
  price,
  handleDelete,
}) {
  return (
    <>
      <div className="row mt-md-3 mb-3 pr-md-5 text-md-center text-lg-center fs-5">
        <div className="col-12 col-md-2 mb-md-0 mb-3 text-center">
          <img className="img-fluid" src={imgUrl} alt="" />
        </div>
        <div className=" col-md-3  text-start text-md-center">
          <span className="d-md-none fw-bold">Name: </span>
          {name}
        </div>
        <div className=" col-md-2  text-start text-md-center">
          <span className="d-md-none fw-bold">SKU: </span>
          {sku}
        </div>
        <div className=" col-md-1 text-start text-md-center">
          <span className="d-md-none fw-bold">Price:</span> {price}
        </div>
        <div className=" col-md-2  text-start text-md-center">
          <span className="d-md-none fw-bold">Quantity: </span>
          {quantity}
        </div>
        <div className=" col-md-2 pr-0">
          <div className="d-flex flex-column">
            <Link
              to={`/admin/editproduct/${id}`}
              className="btn btn-warning text-black fw-bold mt-3 fs-5"
            >
              Edit
            </Link>
            <button
              type="submit"
              className="btn btn-danger text-black fw-bold w-100 mt-3 fs-5"
              onClick={handleDelete}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
