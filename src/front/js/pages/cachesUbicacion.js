import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ClustersCaches } from "../component/clustersCaches";
import { Context } from "../store/appContext";
import "../../styles/clusters.css";
import Andalucia from "../../img/andalucia.png";;
import Aragon from "../../img/aragon.png";
import Canarias from "../../img/canarias.png";
import Cantabria from "../../img/cantabria.png";
import CastillaLeon from "../../img/castillaLeon.png";
import CastillaMancha from "../../img/castillaMancha.png";
import Cataluna from "../../img/cataluna.png";
import ComunidadNavarra from "../../img/comunidadNavarra.png";
import ComunidadValenciana from "../../img/comunidadValenciana.png";
import Extremadura from "../../img/extremadura.png";
import Galicia from "../../img/galicia.png";
import IslasBaleares from "../../img/islasBaleares.png";
import LaRioja from "../../img/laRioja.png";
import Madrid from "../../img/madrid.png";
import PaisVasco from "../../img/paisVasco.png";
import RegionMurcia from "../../img/regionMurcia.png";
import PrincipadoAsturias from "../../img/principadoAsturias.png";


export const CachesUbicacion = () => {


    const { store, actions } = useContext(Context);

    return (

        <div>

            <div className="container">
                <h1 className="text-center mt-4 mb-3">Cachés por Ubicación</h1>
                <p>Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
            </div>
            <div className=" container mx-auto text-center">
                <h2 className="text-center my-4">Comienza a Explorar</h2>
                <p className="mb-4">Entra en el emocionante mundo del geocaching. Descubre tesoros ocultos y vive una experiencia única en cada rincón del planeta. ¡Comienza tu aventura hoy mismo.</p>
                <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                    <ClustersCaches link="/caches/Andalucía" image={Andalucia} />
                    <ClustersCaches link="/caches/Aragón" image={Aragon} />
                    <ClustersCaches link="/caches/Islas Canarias" image={Canarias} />
                    <ClustersCaches link="/caches/Comunidad de Cantabria" image={Cantabria} />
                    <ClustersCaches link="/caches/Castilla y Leon" image={CastillaLeon} />
                    <ClustersCaches link="/caches/Castilla y La Mancha" image={CastillaMancha} />
                    <ClustersCaches link="/caches/Cataluña" image={Cataluna} />
                    <ClustersCaches link="/caches/Comunidad Foral de Navarra" image={ComunidadNavarra} />
                    <ClustersCaches link="/caches/Comunidad Valenciana" image={ComunidadValenciana} />
                    <ClustersCaches link="/caches/Extremadura" image={Extremadura} />
                    <ClustersCaches link="/caches/Galicia" image={Galicia} />
                    <ClustersCaches link="/caches/Islas Baleares" image={IslasBaleares} />
                    <ClustersCaches link="/caches/Comunidad de La Rioja" image={LaRioja} />
                    <ClustersCaches link="/caches/Madrid" image={Madrid} />
                    <ClustersCaches link="/caches/País Vasco" image={PaisVasco} />
                    <ClustersCaches link="/caches/Region de Murcia" image={RegionMurcia} />
                    <ClustersCaches link="/caches/Principado de Asturias" image={PrincipadoAsturias} />
                    <ClustersCaches link="/caches/Ciudad Autónoma de Ceuta" image={PrincipadoAsturias} />
                    <ClustersCaches link="/caches/Ciudad Autónoma de Melilla" image={PrincipadoAsturias} />


                </div>
            </div>
            <div className="container mx-auto text-center">
                <h2 className="text-center mb-3 mt-4">Accede a los Cachés por Ubicación más Populares entre Nuestra Comunidad</h2>
                <p>¡No te pierdas la oportunidad de descubrir los tesoros escondidos de la comunidad! Selecciona los cachés más populares y explora los lugares más interesantes alrededor de ti. ¡Te aseguramos una aventura inolvidable llena de sorpresas y descubrimientos!</p>
                <div className="container mb-5 row row-cols-lg-4 mx-auto gx-3">
                    {store.caches.map((cache) => {
                        return (
                            <div className="card" key={cache.id}>
                                <img src="https://thumbs.dreamstime.com/z/ciudad-de-mapas-con-ruta-gps-y-geo-navegaci%C3%B3n-para-entrega-en-la-calle-ubicaci%C3%B3n-app-map-road-town-park-river-cartograf%C3%ADa-229179316.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h4 className="card-title">{cache.state}</h4>
                                    <h5 className="card-title">{cache.city}</h5>
                                    <p className="card-text">{cache.name}</p>
                                    <Link to={"/perfil-cache/" + cache.id} className="text-decoration-none">
										<a href="#" className="btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
									</Link>
                                    <button onClick={() => {
										actions.createFavoritesCaches(cache.id);
									}} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(cache.id) ? "btn btn-outline-danger mx-1" : "btn btn-outline-warning mx-1"} ><i className="fa-solid fa-heart"></i></button>
                                </div>
                            </div>
                        )
                    })}

                </div>

            </div>

        </div>
    );
}