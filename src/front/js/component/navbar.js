import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg navbar-light alert alert-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </ button>
        <Link className="navbar-brand" to="#">
          <img
            src="https://www.theredlionpreston.co.uk/wp-content/uploads/Logo_Geocaching_Horiz_Emerald.png"
            height="15"
            alt="GeoCaching logo"
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Tienda online
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Preguntas Frecuentes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div className="container">
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            {store.userActive ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={async () => {
                  if (await actions.logout()) {
                    navigate("/");
                  }
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="First group"
                >
                  <Link to="/login">
                    <button type="button" className="btn btn-primary">
                      Login
                    </button>
                  </Link>
                </div>
                <div
                  className="btn-group me-2"
                  role="group"
                  aria-label="Second group"
                >
                  <Link to="/register">
                    <button type="button" className="btn btn-success">
                      Register
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
