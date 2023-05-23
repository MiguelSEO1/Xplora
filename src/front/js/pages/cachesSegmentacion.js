import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ClustersCaches } from "../component/clustersCaches";
import { Context } from "../store/appContext";
import "../../styles/clusters.css";
import Almeria from "../../img/almeria.png";
import Granada from "../../img/granada.png";
import Malaga from "../../img/malaga.png";
import Jaen from "../../img/jaen.png";
import Cordoba from "../../img/cordoba.png";
import Sevilla from "../../img/sevilla.png";
import Huelva from "../../img/huelva.png";
import Cadiz from "../../img/cadiz.png";
import Tenerife from "../../img/tenerife.png";
import Laspalmas from "../../img/laspalmas.png";
import Barcelona from "../../img/barcelona.png";
import Lerida from "../../img/lerida.png";
import Madridprovincia from "../../img/madridprovincia.png";
import Gerona from "../../img/gerona.png";
import Tarragona from "../../img/tarragona.png";
import Lacoruna from "../../img/lacoruna.png";
import Orense from "../../img/orense.png";
import Pontevedra from "../../img/pontevedra.png";
import Lugo from "../../img/lugo.png";
import Alicante from "../../img/alicante.png";
import Castellon from "../../img/castellon.png";
import Valenciaprovincia from "../../img/valenciaprovincia.png";
import Avila from "../../img/avila.png";
import Segovia from "../../img/segovia.png";
import Salamanca from "../../img/salamanca.png";
import Soria from "../../img/soria.png";
import Burgos from "../../img/burgos.png";
import Leon from "../../img/leon.png";
import Palencia from "../../img/palencia.png";
import Valladolid from "../../img/valladolid.png";
import Guipuzkoa from "../../img/guipuzkoa.png";
import Alava from "../../img/alava.png";
import Vizcaya from "../../img/vizcaya.png";
import Toledo from "../../img/toledo.png";
import Guadalajara from "../../img/guadalajara.png";
import Ciudadreal from "../../img/ciudadreal.png";
import Cuenca from "../../img/cuenca.png";
import Albacete from "../../img/albacete.png";
import Murcia from "../../img/murcia.png";
import Huesca from "../../img/huesca.png";
import Teruel from "../../img/teruel.png";
import Zaragoza from "../../img/zaragoza.png";
import Palmamallorca from "../../img/palmamallorca.png";
import Caceres from "../../img/caceres.png";
import Asturiasprovincia from "../../img/asturiasprovincia.png";
import Badajoz from "../../img/badajoz.png";
import Ceutaprovincia from "../../img/ceutaprovincia.png";
import Melillaprovincia from "../../img/melillaprovincia.png";
import Navarraprovincia from "../../img/navarraprovincia.png";
import Cantabriaprovincia from "../../img/cantabriaprovincia.png";
import Lariojaprovincia from "../../img/lariojaprovincia.png";
import Zamora from "../../img/zamora.png";
import { shuffle } from 'lodash';
import { Cluster } from "../component/cluster";
import Ubicacion from "../../img/ubicacion.png"
import Dificultad from "../../img/dificultad.png"
import Tamano from "../../img/tamano.png"


export const CachesSegmentacion = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [cacheUbicacion, setCacheUbicacion] = useState({});
    const [mostrarTarjetas, setMostrarTarjetas] = useState(6);
    const [mostrarTarjetas2, setMostrarTarjetas2] = useState(6);
    const [shuffledCaches, setShuffledCaches] = useState([]);

    const mostrarMasTarjetas = () => {
        setMostrarTarjetas(mostrarTarjetas + 3);
    };

    const mostrarMasTarjetas2 = () => {
        setMostrarTarjetas2(mostrarTarjetas2 + 3);
    };



    // Función de efecto para mantener el orden constante
    useEffect(() => {
        const caches = store.caches.filter(
            cache =>
                cache.is_approved === true &&
                (cache.state === params.tipos ||
                    cache.size === params.tipos ||
                    cache.difficulty === params.tipos)
        );
        const shuffled = shuffle(caches);
        setShuffledCaches(shuffled);
    }, [store.caches]);



    return (

        <div className="cuerpo">

            <div className="container">
                <h1 className="text-center mt-5 mb-4">
                    {store.caches.some(cache => cache.state === params.tipos) ? `Cachés en ${params.tipos}` : null}
                    {store.caches.some(cache => cache.size === params.tipos) ? `Cachés ${params.tipos}s` : null}
                    {store.caches.some(cache => cache.difficulty === params.tipos) ? `Cachés con dificultad ${params.tipos}` : null}
                </h1>
                <p className="text-center mb-3">Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
            </div>
            <div className="container mb-5 mt-3 row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                {shuffledCaches.slice(0, mostrarTarjetas).map((cache) => {
                    return (
                        <div className="">
                            <div className=" esquinaCarta card text-center" key={cache.id}>
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
            <div className=" container mx-auto text-center" >
                <button onClick={mostrarMasTarjetas} className="btn btn-primary mb-5">
                    Mostrar más tarjetas
                </button>
            </div>

            <div className=" container mx-auto text-center">
                <h2 className="text-center mb-5">
                    {store.caches.some(cache => cache.state === params.tipos) ? `Cachés en provincias de ${params.tipos}` : null}
                </h2>
                {params.tipos === "Andalucía" ? (
                    <div className="container row row-cols-lg-3 gx-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Almería" image={Almeria} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Granada" image={Granada} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Málaga" image={Malaga} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Jaén" image={Jaen} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Córdoba" image={Cordoba} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Sevilla" image={Sevilla} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Cádiz" image={Cadiz} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Huelva" image={Huelva} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Canarias" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Santa cruz de tenerife" image={Tenerife} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Las palmas" image={Laspalmas} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Cataluña" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Barcelona" image={Barcelona} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Gerona" image={Gerona} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Lérida" image={Lerida} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Taragona" image={Tarragona} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Madrid" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Comunidad de madrid" image={Madridprovincia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Galicia" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/La coruña" image={Lacoruna} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Lugo" image={Lugo} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Orense" image={Orense} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Pontevedra" image={Pontevedra} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Comunidad valenciana" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Alicante" image={Alicante} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Castellón" image={Castellon} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Valencia" image={Valenciaprovincia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Castilla y león" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Ávila" image={Avila} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Burgos" image={Burgos} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/León" image={Leon} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Palencia" image={Palencia} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Salamanca" image={Salamanca} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Segovia" image={Segovia} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Soria" image={Soria} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Valladolid" image={Valladolid} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Zamora" image={Zamora} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "País vasco" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Guipúzcoa" image={Guipuzkoa} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Álava" image={Alava} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Vizcaya" image={Vizcaya} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Castilla-la mancha" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Albacete" image={Albacete} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Ciudad real" image={Ciudadreal} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Cuenca" image={Cuenca} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Guadalajara" image={Guadalajara} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Toledo" image={Toledo} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Murcia" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Región de murcia" image={Murcia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Aragón" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Huesca" image={Huesca} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Teruel" image={Teruel} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Zaragoza" image={Zaragoza} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Islas baleares" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-palma-de-mallorca//Islas baleares" image={Palmamallorca} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Extremadura" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Cáceres" image={Caceres} onClick={() => window(0, 0)} />
                        <ClustersCaches link="/caches-provincias/Badajoz" image={Badajoz} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Principado de asturias" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Principado de asturias" image={Asturiasprovincia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Navarra" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Comunidad foral de navarra" image={Navarraprovincia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "Cantabria" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Cantabria" image={Cantabriaprovincia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}
                {params.tipos === "La rioja" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/La rioja" image={Lariojaprovincia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}{params.tipos === "Ceuta" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Ceuta" image={Ceutaprovincia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}{params.tipos === "Melilla" ? (
                    <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                        <ClustersCaches link="/caches-provincias/Melilla" image={Melillaprovincia} onClick={() => window(0, 0)} />
                    </div>
                ) : null}

            </div>

            <div className="container mx-auto text-center mt-5">
                <h2 className="text-center ">
                    {store.caches.some(cache => cache.size === params.tipos) ? `Accede a los Cachés ${params.tipos}s más Populares entre Nuestra Comunidad` :
                        store.caches.some(cache => cache.difficulty === params.tipos) ? `Accede a los Cachés con dificultad ${params.tipos} más Populares entre Nuestra Comunidad` :
                            `Accede a los Cachés de ${params.tipos} más Populares entre Nuestra Comunidad`}
                </h2>

                <p className="text-center mb-4 mt-4">¡No te pierdas la oportunidad de descubrir los tesoros escondidos de la comunidad! Selecciona los cachés más populares y explora los lugares más interesantes alrededor de ti. ¡Te aseguramos una aventura inolvidable llena de sorpresas y descubrimientos!</p>
                <div className="container mb-5 mt-3 row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                    {shuffledCaches.slice(0, mostrarTarjetas2).map((cache) => {
                        return (
                            <div className="">
                                <div className=" esquinaCarta card " key={cache.id}>
                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                    <div className="card-body">
                                        <h3 className="card-title">{cache.state}</h3>
                                        <h4 className="card-title">{cache.city}</h4>
                                        <p className="card-text">{cache.name}</p>
                                        <Link to={"/perfil-cache/" + cache.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)} >
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
                <button onClick={mostrarMasTarjetas2} className="btn btn-primary mb-5">
                    Mostrar más tarjetas
                </button>
            </div>


            {params.tipos === "Andalucía" || params.tipos === "Aragón" || params.tipos === "Canarias" || params.tipos === "Cantabria" || params.tipos === "Castilla y león" || params.tipos === "Castilla-la mancha" || params.tipos === "Cataluña" || params.tipos === "Comunidad valenciana" || params.tipos === "Extremadura" || params.tipos === "Galicia" || params.tipos === "Islas baleares" || params.tipos === "La rioja" || params.tipos === "Madrid" || params.tipos === "Aragón" || params.tipos === "Pais vasco" || params.tipos === "Murcia" || params.tipos === "Principado de Asturias" || params.tipos === "Ceuta" || params.tipos === "Melilla" ? (
                <div className=" container mx-auto text-center">
                    <h2 className="text-center my-4">Otros cachés por ubicación</h2>
                    <p className="mb-5">Desde emocionantes rutas de senderismo, pasando por exploraciones urbanas, tenemos todo lo que necesitas para satisfacer tu espíritu aventurero. ¡No esperes más, comienza a explorar nuestros cachés ahora mismo y descubre lo que el mundo tiene para ofrecer!</p>
                    <div className="container row row-cols-lg-3 gx-3 mx-auto mb-4">
                        <Cluster link="/caches-ubicacion" classboton="d-none" cardTitle="Ubicación" image={Ubicacion} onClick={() => window(0, 0)} />
                    </div>
                </div>
            ) : params.tipos === "Alta" || params.tipos === "Media" || params.tipos === "Baja" ? (
                <div className=" container mx-auto text-center">
                    <h2 className="text-center my-4">Otros cachés por Dificultad</h2>
                    <p className="mb-5">Desde emocionantes rutas de senderismo, pasando por exploraciones urbanas, tenemos todo lo que necesitas para satisfacer tu espíritu aventurero. ¡No esperes más, comienza a explorar nuestros cachés ahora mismo y descubre lo que el mundo tiene para ofrecer!</p>
                    <div className="container row row-cols-lg-3 gx-3 mx-auto mb-4">
                        <Cluster link="/caches-dificultad" classboton="d-none" cardTitle="Dificultad" image={Dificultad} onClick={() => window(0, 0)} />
                    </div>
                </div>
            ) : params.tipos === "Grande" || "Mediano" || "Pequeño" ? (
                <div className=" container mx-auto text-center">
                    <h2 className="text-center my-4">Otros cachés por Tamaño</h2>
                    <p className="mb-5">Desde emocionantes rutas de senderismo, pasando por exploraciones urbanas, tenemos todo lo que necesitas para satisfacer tu espíritu aventurero. ¡No esperes más, comienza a explorar nuestros cachés ahora mismo y descubre lo que el mundo tiene para ofrecer!</p>
                    <div className="container row row-cols-lg-3 gx-3 mx-auto mb-4">
                        <Cluster link="/caches-tamano" classboton="d-none" cardTitle="Tamaño" image={Tamano} onClick={() => window(0, 0)} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}