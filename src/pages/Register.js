import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import InputField from '../components/InputField';
import Alert from '../components/Alert';

function Register() {
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const registerSchema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Felhasználónév, email valamint jelszó megadása kötelező.',
      'string.empty': 'Felhasználónév, email valamint jelszó megadása kötelező.',
    }),
    password: Joi.string().min(8).required().messages({
      'any.required': 'Felhasználónév, email valamint jelszó megadása kötelező.',
      'string.empty': 'Felhasználónév, email valamint jelszó megadása kötelező.',
      'string.min': 'Jelszó hossza legalább 8 karakter kell legyen.',
    }),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'string.email': 'Érvénytelen email cím.',
        'string.empty': 'Felhasználónév, email valamint jelszó megadása kötelező.',
        'any.required': 'Felhasználónév, email valamint jelszó megadása kötelező.',
      }),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'any.required': 'Kérlek add meg ismét a jelszavad.',
        'string.empty': 'Kérlek add meg ismét a jelszavad.',
        'any.only': "Jelszó és az imételten megadott jelszó nem egyforma",
      }),
  });

  function handleOnChange(event) {
    const inputElement = event.target;
    setFormData({
      ...formData,
      [inputElement.name]: inputElement.value,
    });
  }

  function validateForm() {
    const result = registerSchema.validate(formData);
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

  function handleOnSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      const url = `${process.env.REACT_APP_API_SERVER}/register`;

      const options = {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(url, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.message) {
            setAlertMessage({
              className: 'alert-danger',
              value: data.message,
            });
          } else {
            setAlertMessage({
              className: 'alert-success',
              value: 'Sikeres regisztráció.',
            });
            setFormData({});
            navigate('/bejelentkezes');
          }
        })
        .catch(() => {
          setAlertMessage({
            className: 'alert-danger',
            value:
              "Hálózati probléma kérlek próbáld meg később.",
          });
        });
    }
  }

  return (
    <section className="mb-5">
      <div className="container login">
        <form
          onSubmit={handleOnSubmit}
          noValidate
          className="align-middle mx-auto d-flex flex-column justify-content-center"
        >
          <h2 className="mt-3 mb-3 text-center">Regisztráció</h2>
          {alertMessage.value && (
            <Alert
              className={alertMessage.className}
              value={alertMessage.value}
            />
          )}
          <InputField
            type="text"
            name="name"
            id="name"
            placeholder="Felhasználónév"
            value={formData.name}
            onChange={(e) => handleOnChange(e)}
            iconClass="bi bi-person-fill"
          />

          <InputField
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleOnChange(e)}
            iconClass="bi bi-envelope"
          />

          <InputField
            type="password"
            name="password"
            id="password"
            placeholder="Jelszó"
            value={formData.password}
            onChange={(e) => handleOnChange(e)}
            iconClass="bi bi-asterisk"
          />

          <InputField
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Jelszó ismétlés"
            value={formData.passwordConfirm}
            onChange={(e) => handleOnChange(e)}
            iconClass="bi bi-asterisk"
          />

          <button
            type="submit"
            className="btn btn-success w-100 mt-3 mb-2 mx-auto fw-bold"
          >
            Regisztráció
          </button>
        </form>
        <div className="text-center">
          <Link to="/bejelentkezes" className="text-center">
            Ha már rendelkezel felhasználói fiókkal akkor kattints ide!
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
