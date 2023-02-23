import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import makeAxiosRequest from '../../../api/axiosInstance';
import ImagesGallery from '../../../components/ImagesGallery';
import InputField from '../../../components/InputField';
import SelectField from '../../../components/SelectField';
import { AuthContext } from '../../../context/AuthProvider';
import Alert from '../../../components/Alert';
import './EditProduct.scss';

export default function editproduct() {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const { user } = useContext(AuthContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await makeAxiosRequest('GET', `/products/${productId}`);
      const { name, price, sku, description, quantity, type, productImage } =
        res.product;
      setFormData({
        productImage,
        name,
        price,
        sku,
        description,
        quantity,
        category: type,
      });
      setImages(productImage);
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const sendData = new FormData();
    Object.values(files).forEach((file) => {
      sendData.append('uploadImages', file);
    });
    sendData.append('name', formData.name);
    sendData.append('image', formData.productImage);
    sendData.append('description', formData.description);
    sendData.append('sku', formData.sku);
    sendData.append('price', formData.price);
    sendData.append('quantity', formData.quantity);
    sendData.append('category', formData.category);

    try {
      const res = await makeAxiosRequest(
        'PATCH',
        `/admin/editproducts/${productId}`,
        user,
        sendData
      );
      if (res.id) {
        setAlertMessage({
          className: 'alert-success',
          value: 'Product has been modified successfully.',
        });
        setFormData({});
        navigate('/admin/listings');
      }
    } catch (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: error.message,
      });
    }
  };

  const handleMultipleImages = (evnt) => {
    const selectedFiles = [];
    const targetFiles = evnt.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFiles.push(URL.createObjectURL(file));
    });
    setImages(selectedFiles);
    setFiles(evnt.target.files);
  };

  function handleOnChange(event) {
    const inputElement = event.target;
    setFormData({
      ...formData,
      [inputElement.name]: inputElement.value,
    });
  }

  function deleteImg(e) {
    e.preventDefault();
    const imgIndex = parseInt(e.target.getAttribute('data-id'), 2);
    images.splice(imgIndex, 1);
    setImages((oldState) =>
      oldState.filter((item, index) => index !== imgIndex)
    );
  }

  return (
    <section>
      <div className="ms-3 me-3 mt-3">
        <h1 className="text-center">Edit Product</h1>
        <form onSubmit={handleOnSubmit}>
          {alertMessage.value && (
            <Alert
              className={alertMessage.className}
              value={alertMessage.value}
            />
          )}
          <div className="form-row d-flex justify-content-center mt-3">
            <div className="form-group col-md-10 mt-5 border shadow-lg">
              <div className="row mb-5">
                <div className="d-flex align-items-center justify-content-center ms-5">
                  <div>
                    <h2 className="mt-5 ms-3">Edit photos</h2>
                    <div className="form-group my-3 mx-3 mb-5 text-center pb-5">
                      <ImagesGallery
                        images={images}
                        onClick={(e) => deleteImg(e)}
                      />
                      <label htmlFor="files">
                        <span
                          type="button"
                          className="p-3 btn btn-primary text-white fs-5 fw-bold mt-5"
                        >
                          Upload photos
                        </span>
                        <input
                          id="files"
                          type="file"
                          name="files"
                          onChange={handleMultipleImages}
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-row d-flex justify-content-center mt-3">
            <div className="form-group col-md-10 border mx-auto shadow-lg">
              <h4 className="mt-5 mb-5 col-md-10 ps-5">Listing Details</h4>
              <div className="form-group mt-3 col-md-11 mx-auto px-5">
                <InputField
                  type="text"
                  name="name"
                  id="name"
                  label="Name:"
                  placeholder="Name"
                  iconClass="bi bi-tag"
                  value={formData.name}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="form-group col-md-11 mx-auto mt-4 px-5">
                <div className="col-md-12">
                  <textarea
                    name="description"
                    id="description"
                    label="Description:"
                    rows="10"
                    cols="500"
                    className="form-control"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </div>
              <div className="form-row col-md-11 mx-auto mt-4 px-5">
                <div className="col-md-6">
                  <InputField
                    type="number"
                    name="price"
                    id="price"
                    label="Price:"
                    placeholder="Price"
                    iconClass="bi bi-tag"
                    value={formData.price}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </div>
              <div className="form-row col-md-11 mx-auto mt-4 px-5">
                <div className="col-md-6">
                  <InputField
                    type="text"
                    name="sku"
                    id="sku"
                    label="SKU:"
                    placeholder="SKU"
                    iconClass="bi bi-tag"
                    value={formData.sku}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </div>
              <div className="form-row col-md-11 mx-auto mt-4 px-5">
                <div className="col-md-6">
                  <InputField
                    type="number"
                    name="quantity"
                    id="quantity"
                    label="Quantity:"
                    placeholder="Quantity"
                    iconClass="bi bi-tag"
                    value={formData.quantity}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </div>
              <div className="form-row col-md-11 mx-auto mt-4 px-5">
                <div className="col-md-6">
                  <SelectField
                    id="category"
                    name="category"
                    label="Category"
                    options={['Choose!', 'ring', 'necklace', 'ringbox']}
                    onChange={(e) => handleOnChange(e)}
                    value={formData.category}
                  />
                </div>
              </div>
              <div className="form-row col-md-11 mx-auto mt-4 mb-4">
                <div className="col-md-6" />
              </div>
            </div>
          </div>
          <div className="form-group d-flex justify-content-center mt-5 mb-5">
            <input
              type="submit"
              name="publish"
              className="btn btn-primary btn-lg btn-block col-md-3"
              value="Update"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
