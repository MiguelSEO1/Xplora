import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const checkScroll = () => {
    const elements = document.getElementsByClassName('scroll-animation');

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

        // Guardar el estado del elemento en localStorage
        localStorage.setItem(`scrollElement-${i}`, 'visible');
      }
    }
  };

  window.addEventListener('scroll', checkScroll);




  return (
    <div className=" gradiente">
      <section class="banner" style={styles}>
        <div>
          <h1 className="xplora">XPLORA</h1>
          <p className="pxplora">Comunidad de Buscadores de Tesoros Geolocalizados.</p>
          <Link to="/register">
            <button className="botonaventura border border-dark border-opacity-75 border border-3 btn btn-outline-dark my-3">Comienza tu Aventura  </button>
          </Link>
        </div>
      </section>

      <div className=" animaciones justify-content-center container mt-5 ">
        <h1 className="title mt-5 text-center mb-5 ">3 Pasos para Comenzar tu Aventura</h1>
        <div class=" row d-flex align-items-center scroll-animation ">
          <div class="col-4 text-end mb-5 ">
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
          <div class="col-4 text-center mb-5 ">
            <img src={theWay} class="card-img-top w-50 mb-3" alt="..." />
          </div>
        </div>
        <div class="row d-flex align-items-center scroll-animation ">
          <div class="col-4 text-end mb-3 ">
            <img src={banderapirata} class=" card-img-top w-50 " alt="..." />
          </div>
          <div class="col-6 text-center mb-3 scroll-animation elemento">
            <h2 class="title mt-2">3. Comparte tu experiencia</h2>
            <p>Cuando encuentres el geocaché, abre el código QR y registra tu Hallazgo.</p>
          </div>
        </div>
      </div>
      <div className=" container mt-5 d-block d-md-none">
        <h1 className="title mt-2 text-center mb-5 ">3 Pasos para Comenzar tu Aventura</h1>
        <div class="row mb-5 ">
          <div class="col-md-6 text-center mb-3 mx-auto scroll-animation">
            <div class="d-flex flex-column align-items-center mx-auto">
              <img src={mapainicio} class="card-img-top w-50 mb-3" alt="..." />
              <h2 class="title mt-2 elemento me-2">1. Elige tu Caché</h2>
              <p className=" me-2">Crea una cuenta en línea para ver los mapas de los geocachés más cercanos.</p>
            </div>
          </div>
        </div>
        <div className="row mb-5 ">
          <div className=" col-md-6 text-center mb-3 mx-auto scroll-animation">
            <div className="d-flex flex-column align-items-center">
              <img src={theWay} className="  card-img-top w-50 mb-3" alt="..." />
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2 className="elemento title mt-2 me-2">2. Encuentra un geocaché</h2>
              <p className=" me-2">Usa la app para navegar a un geocaché cercano.</p>
            </div>

          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6 text-center mx-auto scroll-animation">
            <div className="d-flex flex-column align-items-center">
              <img src={banderapirata} className="card-img-top w-50 mb-3" alt="..." />
              <h2 className="elemento title mt-2 me-2">3. Comparte tu experiencia</h2>
              <p className=" me-2">Cuando encuentres el geocaché, abre el código QR y registra tu Hallazgo.</p>
            </div>
          </div>
        </div>


      </div>
      <section className="mx-auto homesection mt-5" >
        <div className=" container py-5">
          <h1 className="title mt-4 text-center mb-5" >La épica búsqueda de tesoros ocultos</h1>
          <p>Desde tiempos inmemoriales, los seres humanos han sentido una fascinación por la búsqueda de tesoros ocultos. Ya sea por la promesa de riqueza o por la emoción de la aventura, la idea de descubrir algo valioso que está escondido es un atractivo universal.</p>
          <img className=" imagenhome d-block mx-auto my-5 " src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Kazimierz_Nowak_in_jungle_2.jpg"></img>
          <p>A lo largo de los años, esta búsqueda ha tomado muchas formas diferentes. Desde los cazadores de tesoros que buscaban oro y plata en el Salvaje Oeste hasta los arqueólogos que exploran las antiguas tumbas egipcias, la humanidad siempre ha estado en busca de lo oculto.</p>
          <p>Pero en los últimos tiempos, la búsqueda de caches se ha convertido en una forma popular y emocionante de encontrar tesoros ocultos. A diferencia de los cazadores de tesoros del pasado, los buscadores de caches utilizan la tecnología moderna para encontrar los tesoros escondidos.</p>
          <p >La búsqueda de caches comenzó como un juego entre amigos en el año 2000. Utilizando tecnología GPS, un grupo de amigos escondió un tesoro y compartió las coordenadas con otros amigos en línea. La idea rápidamente se extendió y hoy en día, millones de personas en todo el mundo buscan caches escondidos en lugares remotos.</p>
          <img className=" imagenhome d-block mx-auto my-5 " id="history-section" src="https://garmin.com.pe/wp-content/uploads/2020/10/OVERLANDER.jpg"></img>
          <p>La emoción de la búsqueda, la satisfacción de encontrar el tesoro y la emoción de compartir tus descubrimientos con otros buscadores de caches hacen que esta actividad sea realmente épica. ¿Te unirás a la búsqueda?</p>
        </div>
      </section >
      <section className="mx-auto mt-5"  >
        <h1 className="title mt-2 text-center mb-4"  >Preguntas frecuentes sobre la búsqueda de cachés</h1>
        <div class=" container accordion" id="accordionExample">
          <div className="  accordion-item">
            <h2 class="text-center accordion-header" >
              <button className="  accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                ¿Qué es la búsqueda de cachés?
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                La búsqueda de cachés es una actividad en la que los participantes utilizan dispositivos GPS para encontrar contenedores escondidos, conocidos como cachés, en diferentes lugares del mundo.            </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="faqs-section" >
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                ¿Cómo encuentro una caché?
              </button>
            </h2>
            <div  id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                Primero debes buscar la ubicación de la cache utilizando las coordenadas proporcionadas en la página web de geocaching. Luego, debes caminar hacia el lugar y buscar el caché en las cercanías utilizando las pistas y descripciones proporcionadas en la página.            </div>
            </div>
          </div>
          <div class=" accordion-item" id="faqs-section">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                ¿Qué objetos puedo encontrar en un caché?
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                Los objetos en una caché varían, pero suelen ser pequeños objetos como llaveros, monedas o juguetes. También puedes encontrar registros para firmar y fechar tu visita.            </div>
            </div>
          </div>
          <div class=" accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                ¿Puedo dejar mi propio objeto en un caché?</button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                Sí, siempre y cuando el objeto que dejes sea seguro, apropiado y no sea ilegal. Asegúrate de seguir las reglas del caché y de no dejar nada que pueda dañar el medio ambiente.            </div>
            </div>
          </div>
          <div class=" accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                ¿Puedo llevarme un objeto del caché?</button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                Sí, siempre y cuando dejes algo de igual o mayor valor en su lugar. Asegúrate de seguir las reglas del caché y de no tomar nada que pueda dañar el medio ambiente.</div>
            </div>
          </div>
          <div class=" accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                ¿Es gratis buscar cachés?</button>
            </h2>
            <div id="collapseSix" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                No, la mayoría de los caches son gratuitos. Sin embargo, algunos sitios pueden requerir una tarifa de entrada o puede haber costos asociados con la compra de un dispositivo GPS.</div>
            </div>
          </div>
          <div class=" accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseThree">
                ¿Puedo buscar cachés en todo el mundo?</button>
            </h2>
            <div id="collapseSeven" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                Sí, la búsqueda de cachés es una actividad global y puedes buscar cachés en cualquier parte del mundo. Sin embargo, asegúrate de seguir las leyes y regulaciones locales y respetar la cultura y la propiedad privada.</div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto homesection my-5">
        <div className="container py-5 text-center">
          <h1 className="title my-4">¡Únete a la aventura!</h1>
          <p>¿Estás listo para comenzar la emocionante búsqueda de tesoros ocultos? ¡Regístrate ahora y únete a nuestra comunidad de buscadores de caches! Conviértete en un explorador moderno y descubre lugares increíbles que nunca imaginaste que existieran.</p>
          <p>Con la ayuda de la tecnología GPS, podrás encontrar caches escondidos en todo el mundo y compartir tus descubrimientos con otros buscadores. No hay nada más emocionante que la sensación de encontrar un tesoro oculto y convertirte en un verdadero cazador de tesoros.</p>
          <Link to="/register">
            <button className="btn btn-dark my-3">Comienza tu Aventura  <i class="fa-solid fa-skull-crossbones"></i></button>
          </Link>
          <p>¡No pierdas la oportunidad de vivir una aventura épica! Regístrate ahora y comienza la búsqueda de tesoros ocultos.</p>
        </div>
      </section>
    </div>

  );

};
