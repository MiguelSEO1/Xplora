import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div className="card text-bg-dark">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Wetterstein_mountains_banner.jpg"
          className="card-img mw-50"
          alt="Mountain"
          height=""
        />

      </div >
      <div className="container row row-col-lg-3 row-col-sm-1 mx-auto my-5 align-items-center">
        <div className="card-group  text-center ">
          <div className="card border-0 align-items-center">
            <img
              src="https://www.geocaching.com/play/Content/images/lohp/illustrations/signal.svg"
              className="card-img-top w-25 align-items-center"
              alt="..."
            />
            <div className="card-body ">
              <h5 className="card-title">1. Elige tu Caché</h5>
              <p className="card-text">
                Crea una cuenta en línea para ver los mapas de los geocachés más cercanos.
              </p>
            </div>
          </div>
          <div className="card border-0 align-items-center ">
            <img
              src="https://www.geocaching.com/play/Content/images/lohp/illustrations/phoneandpin.svg"
              className="card-img-top w-25"
              alt="..."
            />
            <div className="card-body  ">
              <h5 className="card-title">2. Encuentra un geocaché</h5>
              <p className="card-text">
                Usa la app para navegar a un geocaché cercano.
              </p>
            </div>
          </div>
          <div className="card border-0 align-items-center ">
            <img
              src="https://www.geocaching.com/play/Content/images/lohp/illustrations/notebookpencil.svg"
              className="card-img-top w-25"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">3. Comparte tu experiencia</h5>
              <p className="card-text">
                Cuando encuentres el geocaché, abre el código QR y registra tu Hallazgo.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
