import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-6 col-xl-11">
            <div className="card text-black rounded-25px">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-6 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sajnáljuk!
                    </p>
                    <p className="text-center h6  mb-2 mx-1 mt-4">
                      Nincs jogosultságod az oldal megtekintéséhez :(
                    </p>
                    <p className="text-center h6  mb-2 mx-1  mt-1">
                      Navigálj vissza:
                    </p>
                    <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-1">
                      <NavLink
                        to="/"
                        className="h3 m-5 p-5 text-decoration-none bg-success text-white"
                      >
                        ARTSHOP
                      </NavLink>
                    </div>
                    <p className="text-center h6  mb-4 mx-1 mt-2">Kezdő oldalára.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
