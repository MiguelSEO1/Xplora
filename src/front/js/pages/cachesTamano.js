import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ClustersCaches } from "../component/clustersCaches";
import { Context } from "../store/appContext";
import "../../styles/clusters.css";
import Grandes from "../../img/grandes.png";
import Medianos from "../../img/medianos.png";
import Pequenos from "../../img/pequenos.png";
import { shuffle } from 'lodash';


export const CachesTamano = () => {
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
                <h1 className="text-center mt-5 mb-4">Cachés por Tamaño</h1>
                <p className="text-center mb-5">Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
            </div>
            <div className=" container mx-auto text-center">
                <h2 className="text-center mt-5 my-4">Comienza a Explorar</h2>
                <p className="mb-5">Entra en el emocionante mundo del geocaching. Descubre tesoros ocultos y vive una experiencia única en cada rincón del planeta. ¡Comienza tu aventura hoy mismo.</p>
                <div className="container row row-cols-lg-3 g-3 mx-auto mb-5">
                    <ClustersCaches link="/caches/Grande" image={Grandes} onClick={() => window(0, 0)}/>
                    <ClustersCaches onClick={() => window(0, 0)} link="/caches/Mediano" image={Medianos} />
                    <ClustersCaches link="/caches/Pequeño" onClick={() => window(0, 0)} image={Pequenos} />
                </div>
            </div>
            <div className="container mx-auto text-center">
                <h2 className="text-center mb-4 mt-5">Accede a los Cachés por Tamaño más Populares entre Nuestra Comunidad</h2>
                <p className="text-center mb-5">¡No te pierdas la oportunidad de descubrir los tesoros escondidos de la comunidad! Selecciona los cachés más populares y explora los lugares más interesantes alrededor de ti. ¡Te aseguramos una aventura inolvidable llena de sorpresas y descubrimientos!</p>
                <div className="container mb-5 row row-cols-lg-3 mx-auto gx-3 gy-4container mb-5 mt-3 row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                {shuffledCaches.slice(0, mostrarTarjetas).map((cache) => {
                        return (
                            <div className="">
                                <div className=" esquinaCarta card " key={cache.id}>
                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                    <div className="card-body">
                                        <h3 className="card-title">{cache.state}</h3>
                                        <h4 className="card-title">{cache.city}</h4>
                                        <p className="card-text">{cache.name}</p>
                                        <Link to={"/perfil-cache/" + cache.id} className="text-decoration-none" onClick={() => window.scrollTo(0,0)}>
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