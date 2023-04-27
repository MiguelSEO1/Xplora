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
                <p className="text-center mb-5">Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
            </div>
            <div className=" container mx-auto text-center">
                <h2 className="text-center mt-5 my-4">Comienza a Explorar</h2>
                <p className="mb-5">Entra en el emocionante mundo del geocaching. Descubre tesoros ocultos y vive una experiencia única en cada rincón del planeta. ¡Comienza tu aventura hoy mismo.</p>
                <div className="container row row-cols-lg-3 gx-3 mx-auto mb-5">
                    <ClustersCaches link="/caches/Andalucía" image={Andalucia} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Aragón" image={Aragon} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Islas canarias" image={Canarias} onClick={() => window(0, 0)} />
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
                    <ClustersCaches link="/caches/Principado de asturias" image={PrincipadoAsturias} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Ceuta" image={Ceuta} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Melilla" image={Melilla} onClick={() => window(0, 0)} />


                </div>
            </div>
            <div className="container mx-auto text-center">
                <h2 className="text-center mb-4 mt-5">Accede a los Cachés por Ubicación más Populares entre Nuestra Comunidad</h2>
                <p className="text-center mb-5">¡No te pierdas la oportunidad de descubrir los tesoros escondidos de la comunidad! Selecciona los cachés más populares y explora los lugares más interesantes alrededor de ti. ¡Te aseguramos una aventura inolvidable llena de sorpresas y descubrimientos!</p>
                <div className="container mb-5 row row-cols-lg-3 mx-auto gx-3 gy-4">
                    {store.caches.slice(0, mostrarTarjetas).map((cache) => {
                        return (
                            <div className="col-sm-1 col-md-4 ">
                                <div className=" esquinaCarta card " key={cache.id}>
                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-title">{cache.state}</h4>
                                        <h5 className="card-title">{cache.city}</h5>
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