import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { handleChange } from '../utils';
import InputField from '../components/InputField';
import Alert from '../components/Alert';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthProvider';

export default function Login() {
  const { setUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let err = '';

    if (!userData.email || !userData.password) {
      err = 'Összes mező kitöltése kötelező.';
      setAlertMessage(err);
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      const { email, password } = userData;
      const options = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(`${process.env.REACT_APP_API_SERVER}/login`, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setAlertMessage(data.message);
          } else if (data.token) {
            const accessToken = data.token;
            setUser(accessToken);
            localStorage.setItem('user', JSON.stringify(accessToken));
            navigate('/');
          }
        })
        .catch(() => {
          setAlertMessage(
            'Hálózati probléma kérlek próbáld meg később',
          );
        });

      setUserData({});
      setAlertMessage('');
    }
  };

  return (
    <section className="pb-5 mb-5">
    <div className="container login mb-5 pb-5">
      {alertMessage && <Alert className="alert-danger" value={alertMessage} />}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="align-middle mx-auto d-flex flex-column justify-content-center"
      >
        <InputField
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => handleChange(e, userData, setUserData)}
          iconClass="bi bi-envelope"
        />
        <InputField
          type="password"
          name="password"
          id="password"
          placeholder="Jelszó"
          value={userData.password}
          onChange={(e) => handleChange(e, userData, setUserData)}
          iconClass="bi bi-asterisk"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          className="btn btn-success mt-3 w-100 mb-2 mx-auto fw-bold"
          value="Bejelentkezés"
        />
        <Link to="/registracio" className="text-center">
          Ha nem rendelkezel felhasznlói fiókkal akkor regisztrálj!
        </Link>
      </form>
    </div>
    </section>
  );
}
