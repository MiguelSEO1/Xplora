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
import Ceuta from "../../img/ceuta.png";
import PrincipadoAsturias from "../../img/principadoAsturias.png";
import Melilla from "../../img/melilla.png";


export const CachesUbicacion = () => {
    const { store, actions } = useContext(Context);
    const [mostrarTarjetas, setMostrarTarjetas] = useState(6);

    const mostrarMasTarjetas = () => {
        setMostrarTarjetas(mostrarTarjetas + 3);
    };

    return (

        <div className="cuerpo">

            <div className="container">
                <h1 className="text-center mt-5 mb-4">Cachés por Ubicación</h1>
                <p className="text-center mb-5">¡Descubre los mejores tesoros ocultos con nuestra selección de caches por ubicación! Desde caches en la más pura naturaleza hasta caches en la ciudad, hemos recopilado una lista de opciones emocionantes para explorar. Ya sea que estés buscando una aventura en la naturaleza o un desafío urbano, tenemos algo para todos. ¡No esperes más, comienza a buscar tesoros en tu ubicación favorita ahora mismo!</p>
            </div>
            <div className=" container mx-auto text-center">
                <h2 className="text-center mt-5 my-4">Comienza a Explorar</h2>
                <p className="mb-5">¡Tenemos todo lo que necesitas para satisfacer tu espíritu aventurero! Ya sea que prefieras explorar rutas de senderismo emocionantes o sumergirte en exploraciones urbanas, nuestros cachés te llevarán a descubrir lugares únicos en todo el mundo. No esperes más, comienza a explorar nuestros tesoros ocultos ahora mismo y descubre lo que el mundo tiene para ofrecer. ¡La aventura te espera!</p>
                <div className="container row row-cols-lg-3 gx-3 mx-auto mb-5">
                    <ClustersCaches link="/caches/Andalucía" image={Andalucia} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Aragón" image={Aragon} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Canarias" image={Canarias} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Cantabria" image={Cantabria} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Castilla y león" image={CastillaLeon} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Castilla-la mancha" image={CastillaMancha} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Cataluña" image={Cataluna} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Navarra" image={ComunidadNavarra} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Comunidad valenciana" image={ComunidadValenciana} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Extremadura" image={Extremadura} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Galicia" image={Galicia} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Islas baleares" image={IslasBaleares} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/La rioja" image={LaRioja} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Madrid" image={Madrid} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/País vasco" image={PaisVasco} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Murcia" image={RegionMurcia} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Principado de Asturias" image={PrincipadoAsturias} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Ceuta" image={Ceuta} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Melilla" image={Melilla} onClick={() => window(0, 0)} />


                </div>
            </div>
            <div className="container mx-auto text-center">
                <h2 className="text-center mb-4 mt-5">Accede a los Cachés por Ubicación más Populares entre Nuestra Comunidad</h2>
                <p className="text-center mb-5">¡No te pierdas la oportunidad de descubrir los tesoros ocultos por la comunidad! En nuestra selección de caches más populares encontrarás los lugares más interesantes para explorar a tu alrededor. Prepárate para una aventura inolvidable llena de sorpresas y descubrimientos emocionantes. ¡Únete a la búsqueda de tesoros ahora y descubre qué tesoro te espera a la vuelta de la esquina!</p>
                <div className="container mb-5 mt-3 row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                    {store.caches.filter(cache => cache.is_approved).slice(0, mostrarTarjetas).map((cache) => {
                        return (
                            <div className="">
                                <div className=" esquinaCarta card " key={cache.id}>
                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                    <div className="card-body">
                                        <h3 className="card-title">{cache.state}</h3>
                                        <h4 className="card-title">{cache.city}</h4>
                                        <p className="card-text">{cache.name}</p>
                                        <Link to={"/perfil-cache/" + cache.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                                            <a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
                                        </Link>

                                        <button onClick={() => {
                                            actions.createFavoritesCaches(cache.id);
                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(cache.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <button onClick={mostrarMasTarjetas} className="btn btn-primary mb-5">
                    Mostrar más tarjetas
                </button>
            </div>

        </div>
    );
}