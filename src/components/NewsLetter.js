import { useState } from 'react';
import Joi from 'joi';
import Alert from './Alert';
import ModalItem from './Modaltem';
import makeAxiosRequest from '../api/axiosInstance';

export default function NewsLetter() {
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
  });
  const [show, setShow] = useState(false);

  const NewsLetterSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'string.email': 'Érvénytelen email cím.',
        'string.empty': 'Email cím megadása kötelező.',
        'any.required': 'Email cím megadása kötelező.',
      }),
  });

  function validateForm() {
    const result = NewsLetterSchema.validate(formData);
    const { error } = result;
    if (error) {
      setAlertMessage({
        className: 'alert-danger',
        value: result.error.message,
      });
      return false;
    }
    return true;
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      try {
        const res = await makeAxiosRequest(
          'POST',
          `/newsletter`,
          null,
          formData
        );
        if (res.id) {
          setFormData({});
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 5000);
        }
      } catch (error) {
        setAlertMessage({
          className: 'alert-danger',
          value: error.message,
        });
      }
    }
  }

  function handleOnChange(event) {
    const inputElement = event.target;
    setFormData({
      ...formData,
      [inputElement.name]: inputElement.value,
    });
  }

  return (
    <section className="mt-5 mb-5 pt-5 text-black" id="footer">
      <form
        onSubmit={handleOnSubmit}
        noValidate
        className="align-middle mx-auto d-flex flex-column justify-content-center"
      >
        <div className="container d-flex justify-content-center">
          <div className="col-md-6 col-sm-8 col-12 text-center">
            <h4 className="font-weight-bold">Hírlevél felíratkozás</h4>
            <p>Iratkozz fel hírlevelünkre, hogy elsőként értesülj újdonságainkról és akcióinkról!</p>
            {alertMessage.value && (
              <Alert
                className={alertMessage.className}
                value={alertMessage.value}
              />
            )}
            <div className="form-group input-group">
              <input
                type="email"
                name="email"
                className="form-control mr-2"
                aria-describedby="emailHelp"
                placeholder="Add meg az email címed!"
                value={formData.email || ''}
                onChange={(e) => handleOnChange(e)}
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  className="btn btn-success text-white btn-lg fw-bold btn-block"
                >
                  Csatlakozom
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
      <ModalItem
        show={show}
        setShow={setShow}
        text="Üdvözöllek! Elsőként fogsz értesülni az új dizájnokról,
        kampányokról és ajánlatokról!"
      />
    </section>
  );
}
