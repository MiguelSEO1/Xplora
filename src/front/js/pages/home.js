import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import mapaPirata from "../../img/mapaPirata.png";
import mapainicio from "../../img/mapainicio.png";
import theWay from "../../img/theWay.png";
import banderapirata from "../../img/banderapirata.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const styles = {
    backgroundImage: `url(${mapaPirata})`,
  };

  const elements = document.querySelectorAll('.scroll-animation');

  function checkScroll() {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const position = element.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;
      if (position < screenHeight * 0.8) {
        element.classList.add('scroll-triggered');
        if (i % 2 === 0) {
          element.classList.add('left');
        } else {
          element.classList.add('right');
        }
      }
    }
  }

  window.addEventListener('scroll', checkScroll);

  

  return (
    <div className=" gradiente">
      <section class="banner" style={styles}>
        <div>
          <h1 className="xplora">XPLORA</h1>
          <p className="pxplora">Comunidad de Aventureros y Buscadores de Tesoros.</p>
        </div>
      </section>

      <div className=" animaciones justify-content-center container mt-5 ">
        <h1 className="title mt-5 text-center mb-5 ">3 Pasos para Comenzar tu Aventura</h1>
           <div class=" row d-flex align-items-center scroll-animation ">
            <div class="col-4 text-end mb-3 ">
              <img src={mapainicio} class="card-img-top w-50 mb-3" alt="..." />
            </div>
            <div class="col-6 text-center mb-3 scroll-animation elemento">
              <h2 class="title mt-2">1. Elige tu Caché</h2>
              <p>Crea una cuenta en línea para ver los mapas de los geocachés más cercanos.</p>
            </div>
          </div>
        <div class="row d-flex justify-content-center align-items-center scroll-animation ">
          <div class="col-6 text-end mb-3 scroll-animation elemento">
            <h2 class="title mt-2">2. Encuentra un geocaché</h2>
            <p>Usa la app para navegar a un geocaché cercano.</p>
          </div>
          <div class="col-4 text-center mb-3 ">
            <img src={theWay} class="card-img-top w-50 mb-3" alt="..." />
          </div>
        </div>
        <div class="row d-flex align-items-center scroll-animation ">
          <div class="col-4 text-end mb-3 ">
            <img src={banderapirata} class="card-img-top w-50 mb-3" alt="..." />
          </div>
          <div class="col-6 text-center mb-3 scroll-animation elemento">
            <h2 class="title mt-2">3. Comparte tu experiencia</h2>
            <p>Cuando encuentres el geocaché, abre el código QR y registra tu Hallazgo.</p>
          </div>
        </div>
      </div>
      <div className=" container mt-5 d-block d-md-none">
        <h1 className="title mt-2 text-center mb-5 ">3 Pasos para Comenzar tu Aventura</h1>
        <div class="row mb-3 ">
          <div class="col-md-6 text-center mb-3 mx-auto scroll-animation">
            <div class="d-flex flex-column align-items-center mx-auto">
              <img src={mapainicio} class="card-img-top w-50 mb-3" alt="..." />
              <h2 class="title mt-2 elemento me-2">1. Elige tu Caché</h2>
              <p className=" me-2">Crea una cuenta en línea para ver los mapas de los geocachés más cercanos.</p>
            </div>
          </div>
        </div>
        <div className="row mb-3 ">
          <div className=" col-md-6 text-center mb-3 mx-auto scroll-animation">
            <div className="d-flex flex-column align-items-center">
              <img src={theWay} className="card-img-top w-50 mb-3" alt="..." />
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2 className="title mt-2 me-2">2. Encuentra un geocaché</h2>
              <p className=" me-2">Usa la app para navegar a un geocaché cercano.</p>
            </div>

          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 text-center mx-auto scroll-animation">
            <div className="d-flex flex-column align-items-center">
              <img src={banderapirata} className="card-img-top w-50 mb-3" alt="..." />
              <h2 className="title mt-2  me-2">3. Comparte tu experiencia</h2>
              <p className=" me-2">Cuando encuentres el geocaché, abre el código QR y registra tu Hallazgo.</p>
            </div>
          </div>
        </div>


      </div>

    </div>

  );
};
