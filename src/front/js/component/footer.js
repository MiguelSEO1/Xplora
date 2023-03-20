import React, { Component } from "react";

export const Footer = () => (
  <footer className="text-center text-lg-start bg-white text-muted ">
    <section className="alert alert-secondary">
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-3  mx-auto mb-4">
            <div className="row text-start d-flex">
              <h6 className="text-uppercase fw-bold mb-4">

                <i className="fas fa-gem me-2 text-secondary justify-content-start"></i>XPLORA
              </h6>
            </div>
            <div className="row ps-3 pe-2">
              Bienvenido a la comunidad de encuentra tesoros más grande del
              Planeta Tierra.

            </div>

          </div>
          <div className="col-3  mx-auto mb-4">
            <div className="row">
              <h6 className="text-uppercase fw-bold mb-4">Sobre Xplora</h6>
            </div>
            <div className="row">
              <a href="#!" className="text-reset">
                Preguntas frecuentes
              </a>
            </div>
            <div className="row">
              <a href="#!" className="text-reset">
                Empleo
              </a>
            </div>
            <div className="row">
              <a href="#!" className="text-reset">
                Prensa
              </a>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Redes Sociales</h6>

            <a href="" className="me-4 link-secondary">
              <i className="fab fa-facebook-f"></i>
            </a>

            <a href="" className="me-4 link-secondary">
              <i className="fab fa-twitter"></i>
            </a>

            <a href="" className="me-4 link-secondary">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="" className="me-4 link-secondary">
              <i className="fab fa-linkedin"></i>
            </a>

          </div>
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
            <p>
              <i className="fas fa-home me-3 text-secondary"></i>España
            </p>
            <p>
              <i className="fas fa-envelope me-3 text-secondary"></i>
              info@example.com
            </p>
          </div>
        </div>
      </div>
    </section>
  </footer>
);
