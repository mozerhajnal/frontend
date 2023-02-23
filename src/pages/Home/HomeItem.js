import { Link } from "react-router-dom";

export default function HomeItem({
    colName,
    imgUrl,
    alt
  }) {
    return (
        <div className= {`collection col-12 ${colName}`}>
        <div className="image-container">
          <Link to="/termekek">
            <img
              className="img-fluid fit-image"
              src={imgUrl}
              alt={alt}
            />
            <div className="shopnow">
              <span>VÁSÁROLJ</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }