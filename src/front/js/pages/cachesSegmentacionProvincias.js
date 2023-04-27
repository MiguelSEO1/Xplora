import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/clusters.css";


export const CachesSegmentacionProvincias = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [cacheUbicacion, setCacheUbicacion] = useState({});
    const [mostrarTarjetas, setMostrarTarjetas] = useState(6);


    const mostrarMasTarjetas = () => {
        setMostrarTarjetas(mostrarTarjetas + 3);
    };
    
    

    return (

        <div className="cuerpo">

            <div className="container">
                <h1 className="text-center mt-5 mb-4">
                    {store.caches.some(cache => cache.city === params.tipos) ? `Cachés en ${params.tipos}` : null}
                </h1>
                <p className="text-center mb-5">Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
            </div>
            <div className="container mx-auto text-center">
                <h2 className="text-center mt-5 my-4">Accede a los Cachés más Populares de la provincia de {params.tipos}</h2>
                <p className="mb-5">¡No te pierdas la oportunidad de descubrir los tesoros escondidos de la comunidad! Selecciona los cachés más populares y explora los lugares más interesantes alrededor de ti. ¡Te aseguramos una aventura inolvidable llena de sorpresas y descubrimientos!</p>
                <div className="container mb-5 mt-3 row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                    {store.caches.filter(
                        cache => cache.city === params.tipos).slice(0, mostrarTarjetas).map((cache) => {
                            return (
                                <div className="">
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