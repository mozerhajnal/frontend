import Icon from './Icon';

function ImagesGallery({ images, onClick }) {
  return (
    <div className="row">
      {images.map((url, index) => {
        return (
          <div className="col-2 mt-5 mb-5" key={url}>
            <div className="card">
              <img src={url} alt="preview" />
              <button
                type="button"
                className="btn btn-light btn-sm"
                data-id={index}
                onClick={onClick}
              >
                <Icon className="bi bi-trash" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ImagesGallery;
