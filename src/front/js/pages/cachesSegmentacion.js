import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
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


export const CachesSegmentacion = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [cacheUbicacion, setCacheUbicacion] = useState({});



    return (

        <div>

            <div className="container">
                <h1 className="text-center mt-4 mb-3">
                    {store.caches.some(cache => cache.state === params.tipos) ? `Cachés en ${params.tipos}` : null}
                    {store.caches.some(cache => cache.size === params.tipos) ? `Cachés ${params.tipos}s` : null}
                    {store.caches.some(cache => cache.difficulty === params.tipos) ? `Cachés con dificultad ${params.tipos}` : null}
                </h1>
                <p>Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
            </div>
            <div className="container mb-5 row row-cols-lg-4 mx-auto gx-3">
                {store.caches.filter(
                    cache =>
                        cache.size === params.tipos ||
                        cache.difficulty === params.tipos).map((cache) => {
                            return (
                                <div class="card " key={cache.id}>
                                    <img src="https://thumbs.dreamstime.com/z/ciudad-de-mapas-con-ruta-gps-y-geo-navegaci%C3%B3n-para-entrega-en-la-calle-ubicaci%C3%B3n-app-map-road-town-park-river-cartograf%C3%ADa-229179316.jpg" class="card-img-top" alt="..." />
                                    <div class="card-body text-center">
                                        <h4 className="card-title">{cache.state}</h4>
                                        <h5 class="card-title">{cache.city}</h5>
                                        <p class="card-text">{cache.name}</p>
                                        <Link to={"/perfil-cache/" + cache.id} className="text-decoration-none">
                                            <a href="#" className="btn btn-primary"><i class="fa-solid fa-earth-americas"></i></a>
                                        </Link>
                                        <button onClick={() => {
                                            actions.createFavoritesCaches(cache.id);
                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(cache.id) ? "btn btn-outline-danger mx-1" : "btn btn-outline-warning mx-1"} ><i class="fa-solid fa-heart"></i></button>

                                    </div>
                                </div>
                            )
                        })}

            </div>

            <div className=" container mx-auto text-center">
                <h2 className="text-center  mb-5">
                    {store.caches.some(cache => cache.state === params.tipos) ? `Cachés en provincias de ${params.tipos}` : null}
                </h2>
                {params.tipos === "Andalucía" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Almería" image={Andalucia} />
                        <ClustersCaches link="/caches-provincias/Granada" image={Andalucia} />
                        <ClustersCaches link="/caches-provincias/Malaga" image={Andalucia} />
                        <ClustersCaches link="/caches-provincias/Jaen" image={Andalucia} />
                        <ClustersCaches link="/caches-provincias/Córdoba" image={Andalucia} />
                        <ClustersCaches link="/caches-provincias/Sevilla" image={Andalucia} />
                        <ClustersCaches link="/caches-provincias/Cádiz" image={Andalucia} />
                        <ClustersCaches link="/caches-provincias/Huelva" image={Andalucia} />
                    </div>
                ) : null}
                {params.tipos === "Islas Canarias" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Santa Cruz de Tenerife" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Las Palmas" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Cataluña" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Barcelona" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Gerona" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Lerida" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Taragona" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Madrid" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Madrid" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Galicia" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/La Coruña" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Lugo" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Orense" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Pontevedra" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Comunidad Valenciana" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Alicante" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Castellón" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Valencia" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Castilla y Leon" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Ávila" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Burgos" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/León" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Palencia" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Salamanca" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Segovia" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Soria" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Valladolid" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "País Vasco" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Guipuzkoa" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Álava" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Vizcaya" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Castilla y La Mancha" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Albacete" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Ciudad Real" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Cuenca" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Guadalajara" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Toledo" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Region de Murcia" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Murcia" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Aragón" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Huesca" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Teruel" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Zaragoza" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Islas Baleares" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Palma de Mallorca" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Extremadura" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Cáceres" image={Canarias} />
                        <ClustersCaches link="/caches-provincias/Badajoz" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Principado de Asturias" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Asturias" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Comunidad Foral de Navarra" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Navarra" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Comunidad de Cantabria" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Cantabria" image={Canarias} />
                    </div>
                ) : null}
                {params.tipos === "Comunidad de La Rioja" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/La rioja" image={Canarias} />
                    </div>
                ) : null}{params.tipos === "Ciudad Autónoma de Ceuta" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Ceuta" image={Canarias} />
                    </div>
                ) : null}{params.tipos === " Ciudad Autónoma de Melilla" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Melilla" image={Canarias} />
                    </div>
                ) : null}

            </div>

            <div className="container mx-auto text-center">
                <h2 className="text-center mb-3 mt-5">
                    {store.caches.some(cache => cache.size === params.tipos) ? `Accede a los Cachés ${params.tipos}s más Populares entre Nuestra Comunidad` : null}
                    {store.caches.some(cache => cache.difficulty === params.tipos) ? `Accede a los Cachés con dificultad ${params.tipos} más Populares entre Nuestra Comunidad ` : null}
                    {store.caches.some(cache => cache.city === params.tipos) ? `Accede a los Cachés de ${params.tipos} más Populares entre Nuestra Comunidad ` : null}

                </h2>
                <p>¡No te pierdas la oportunidad de descubrir los tesoros escondidos de la comunidad! Selecciona los cachés más populares y explora los lugares más interesantes alrededor de ti. ¡Te aseguramos una aventura inolvidable llena de sorpresas y descubrimientos!</p>
                <div className="container mb-5 row row-cols-lg-4 mx-auto gx-3">
                    {store.caches.filter(
                        cache => cache.state === params.tipos ||
                            cache.size === params.tipos ||
                            cache.difficulty === params.tipos).map((cache) => {
                                return (
                                    <div className="card" key={cache.id}>
                                        <img src="https://thumbs.dreamstime.com/z/ciudad-de-mapas-con-ruta-gps-y-geo-navegaci%C3%B3n-para-entrega-en-la-calle-ubicaci%C3%B3n-app-map-road-town-park-river-cartograf%C3%ADa-229179316.jpg" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h4 className="card-title">{cache.state}</h4>
                                            <h5 className="card-title">{cache.city}</h5>
                                            <p className="card-text">{cache.name}</p>
                                            <Link to={"/perfil-cache/" + cache.id} className="text-decoration-none">
                                                <a href="#" className="btn btn-primary"><i class="fa-solid fa-earth-americas"></i></a>
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