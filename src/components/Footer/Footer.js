import { Link } from 'react-router-dom';

import logo from '../Navbar/icons/logo-designer.svg';
import Icon from '../Icon';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="mt-5 pt-5 container footer">
        <div className="row box-container">
          <div className="box col-sm-12 col-lg-6 border">
            <Link className="" to="/">
              <h3>ARTSHOP</h3>
              <img
                className="logo"
                width="150"
                height="150"
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="box col-sm-12 col-lg-6 border">
            <a href="tel:+36-65-988-1678">
            <Icon className="bi bi-telephone m-3" />
              +36-65-988-1678
            </a>
            <a href="mailto:info@artshop.hu?subject=Új kapcsolatfelvétel!&body=Kedves ArtShop! Az alábbiakban kérném a segítségét">
            <Icon className="bi bi-envelope m-3" />
              info@artshop.hu
            </a>
          </div>
      </div>
      <p className="text-center mt-md-5">
        <small>© saki</small>
      </p>
    </footer>
  );
}
