import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import jwtDecode from 'jwt-decode';

import axios from 'axios';
import InputField from '../components/InputField';
import Alert from '../components/Alert';
import { AuthContext } from '../context/AuthProvider';
import { handleChange } from '../utils';

function Profile() {
  const [formData, setFormData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: jwtDecode(user).name,
      email: jwtDecode(user).email,
    });
  }, []);

  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Legalább egy mező kitöltése kötelező.',
      'string.empty': 'Legalább egy mező kitöltése kötelező.',
    }),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        'string.email': 'Érvénytelen email cím.',
        'string.empty': 'Legalább egy mező kitöltése kötelező.',
        'any.required': 'Legalább egy mező kitöltése kötelező.',
      }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Legalább egy mező kitöltése kötelező.',
      'string.empty': 'Legalább egy mező kitöltése kötelező.',
      'string.min': 'Jelsző legalább 8 karakter hosszú kell legyen.',
    }),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'any.required': 'Jelszó megerősítése kötelező.',
        'string.empty': 'Jelszó megerősítése kötelező.',
        'any.only': "Jelszó és az imételten megadott jelszó nem egyforma.",
      }),
  });

  function validateForm() {
    const result = schema.validate(formData);
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

  const putUser = async () => {
    const authAxios = axios.create({
      baseURL: process.env.REACT_APP_API_SERVER,
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });
    try {
      const { name, email, password } = formData;
      const userData = {
        name,
        email,
        password,
      };
      const res = await authAxios.patch('/users', userData);
      if (res.data.message) {
        setAlertMessage({
          className: 'alert-danger',
          value: res.data.message,
        });
      } else {
        const accessToken = res.data.token;
        setUser(accessToken);
        localStorage.setItem('user', JSON.stringify(accessToken));
        setAlertMessage({
          className: 'alert-success',
          value: 'Sikeres módosítás.',
        });
        setFormData({});
        navigate('/');
      }
    } catch (err) {
      setAlertMessage({
        className: 'alert-danger',
        value: "Hálózati probléma kérlek próbáld meg később.",
      });
    }
  };

  function handleOnSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      putUser();
    }
  }

  return (
    <section className="mb-5 pb-5">
    <div className="container login mb-5 pb-5 mt-5 pt-5">
      <form
        onSubmit={handleOnSubmit}
        noValidate
        className="align-middle mx-auto d-flex flex-column justify-content-center text-center"
      >
        <h2 className="mt-3 mb-3">Profil módosítása</h2>
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
          onChange={(e) => handleChange(e, formData, setFormData)}
          iconClass="bi bi-person-fill"
        />

        <InputField
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange(e, formData, setFormData)}
          iconClass="bi bi-envelope"
        />

        <InputField
          type="password"
          name="password"
          id="password"
          placeholder="Jelszó"
          value={formData.password}
          onChange={(e) => handleChange(e, formData, setFormData)}
          iconClass="bi bi-asterisk"
        />

        <InputField
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Jelszó ismétlés"
          value={formData.passwordConfirm}
          onChange={(e) => handleChange(e, formData, setFormData)}
          iconClass="bi bi-asterisk"
        />

        <button
          type="submit"
          className="btn btn-success mt-3 w-100 mb-2 mx-auto fw-bold"
        >
          Módosítás
        </button>
      </form>
    </div>
    </section>
  );
}

export default Profile;
