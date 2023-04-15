import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import "../../styles/clusters.css";
import Guiaprincipiantes from "../../img/guiaprincipiantes.png";
import Aventurafamilia from "../../img/aventurafamilia.png";
import Crearuncache from "../../img/crearuncache.png";
import Cachesurbanos from "../../img/cachesurbanos.png";
import Herramientas from "../../img/herramientas.png";
import Cachesraros from "../../img/cachesraros.png";
import Peligros from "../../img/peligros.png";
import Enigmas from "../../img/enigmas.png";




export const Blog = () => {


    const { store, actions } = useContext(Context);

    return (

        <div>
            
            <div className=" cuerpo container">
                <h1 className="text-center mt-5 mb-4">Bienvenido al Blog de Xplora</h1>
                <p>El geocaching es una actividad al aire libre que consiste en buscar tesoros ocultos (cachés) utilizando dispositivos GPS o aplicaciones móviles. Es una forma emocionante de explorar nuevos lugares, descubrir curiosidades y retar tus habilidades y destrezas. En este blog encontrarás información, consejos, historias y recursos sobre el geocaching, así como una comunidad de aficionados apasionados por esta actividad</p>
            </div>
            <div className="container ">
                <h2 className="text-center mb-3 mt-5">Nuestros Mejores Post sobre la Búsqueda de Cachés</h2>
                <p className="mb-5">Entra en el emocionante mundo del geocaching y conviertete en todo un experto. Descubre todo lo necesario para sacar el máximo jugo a la gran aventura de búsqueda de tesoros alrededor del mundo ¡A disfrutar!.</p>
                <div className="container mb-5 row row-cols-lg-4 mx-auto my-5">
					<Cluster link="/como-empezar-a-buscar-caches-Guia-para-principiantes" classboton="d-none" cardTitle="Guía para Principiantes" image={Guiaprincipiantes} onClick={() => window(0, 0)} />
					<Cluster link="/como-involucrar-a-los-mas-pequenos-en-la-busqueda-de-caches" classboton="d-none" cardTitle="Aventura en familia" image={Aventurafamilia} onClick={() => window(0, 0)} />
					<Cluster link="/como-crear-un-cache-Consejos-y-trucos" classboton="d-none" cardTitle="Cómo crear un caché" image={Crearuncache} onClick={() => window(0, 0)} />
                    <Cluster link="/como-encontrar-caches-en-entornos-urbanos" classboton="d-none" cardTitle="Buscar cachés urbanos" image={Cachesurbanos} onClick={() => window(0, 0)} />
					<Cluster link="/las-mejores-herramientas-para-la-busqueda-de-caches" classboton="d-none" cardTitle="Mejores herramientas" image={Herramientas} onClick={() => window(0, 0)} />
					<Cluster link="/los-caches-mas-impresionantes-y-raros-del-mundo" classboton="d-none" cardTitle="Cachés más raros" image={Cachesraros} onClick={() => window(0, 0)} />
					<Cluster link="/como-mantenerse-seguro-durante-la-busqueda-de-caches" classboton="d-none" cardTitle="Peligros de la Búsqueda" image={Peligros} onClick={() => window(0, 0)} />
					<Cluster link="/como-resolver-enigmas-en-caches-consejos-y-trucos" classboton="d-none" cardTitle="Cómo Resolver cachés" image={Enigmas} onClick={() => window(0, 0)} />
                </div>
            </div>







        </div>
    );
}