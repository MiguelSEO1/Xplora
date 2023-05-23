import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ClustersCaches } from "../component/clustersCaches";
import { Context } from "../store/appContext";
import "../../styles/clusters.css";
import Alta from "../../img/alta.png";;
import Media from "../../img/media.png";
import Baja from "../../img/baja.png";
import { shuffle } from 'lodash';
import { Cluster } from "../component/cluster";
import Ubicacion from "../../img/ubicacion.png"
import Tamano from "../../img/tamano.png"


export const CachesDificultad = () => {
    const { store, actions } = useContext(Context);
    const [mostrarTarjetas, setMostrarTarjetas] = useState(6);
    const [shuffledCaches, setShuffledCaches] = useState([]);

    // Función de efecto para mantener el orden constante
    useEffect(() => {
        const caches = store.caches.filter(cache => cache.is_approved);
        const shuffled = shuffle(caches);
        setShuffledCaches(shuffled);
    }, [store.caches]);

    const mostrarMasTarjetas = () => {
        setMostrarTarjetas(mostrarTarjetas + 3);
    };

    return (

        <div className="cuerpo">

            <div className="container">
                <h1 className="text-center mt-5 mb-4">Cachés por Dificultad</h1>
                <p className="text-center mb-5">¡Prepárate para explorar los tesoros ocultos más desafiantes con nuestra selección de caches por dificultad! Hemos recopilado una lista de opciones emocionantes para explorar, desde los pequeños y sencillos hasta los más desafiantes. ¡No esperes más, comienza a buscar tesoros desafiantes y pon a prueba tus habilidades ahora mismo!</p>
            </div>
            <div className=" container mx-auto text-center">
                <h2 className="text-center mt-5 my-4">Comienza a Explorar</h2>
                <p className="mb-5">Entra en el emocionante mundo del geocaching. Descubre tesoros ocultos y vive una experiencia única en cada rincón del planeta. ¡Comienza tu aventura hoy mismo.</p>
                <div className="container row row-cols-lg-3 g-3 mx-auto mb-5">
                    <ClustersCaches link="/caches/Alta" image={Alta} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Media" image={Media} onClick={() => window(0, 0)} />
                    <ClustersCaches link="/caches/Baja" image={Baja} onClick={() => window(0, 0)} />
                </div>
            </div>
            <div className="container mx-auto text-center">
                <h2 className="text-center mb-4 mt-5">Accede a los Cachés por Dificultad más Populares entre Nuestra Comunidad</h2>
                <p className="text-center mb-5">¡Abre tus ojos a lo desconocido y embárcate en una búsqueda épica de los tesoros escondidos por la comunidad! En nuestra selección de caches más populares encontrarás los lugares más fascinantes para explorar a tu alrededor. </p>
                <div className="container mb-5 mt-3 row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                    {shuffledCaches.slice(0, mostrarTarjetas).map((cache) => {
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
            <div className=" container mx-auto text-center">
                <h2 className="text-center my-4">Otros tipos de Cachés</h2>
                <p className="mb-5">Desde emocionantes rutas de senderismo, pasando por exploraciones urbanas, tenemos todo lo que necesitas para satisfacer tu espíritu aventurero. ¡No esperes más, comienza a explorar nuestros cachés ahora mismo y descubre lo que el mundo tiene para ofrecer!</p>
                <div className="container mb-5 row row-cols-lg-3 mx-auto my-5">
                    <Cluster link="/caches-ubicacion" classboton="d-none" cardTitle="Ubicación" image={Ubicacion} onClick={() => window(0, 0)} />
                    <Cluster link="/caches-tamano" classboton="d-none" cardTitle="Tamaño" image={Tamano} onClick={() => window(0, 0)} />
                </div>
            </div>
        </div>
    );
}