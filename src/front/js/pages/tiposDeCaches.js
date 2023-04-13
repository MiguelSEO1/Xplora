import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import CachesUbicacion from "../../img/cachesUbicacion.png"
import CachesDificultad from "../../img/cahesDificultad.png"
import CachestTamano from "../../img/cachestTamano.png"

export const TiposDeCaches = () => {
    const { store, actions } = useContext(Context);
    const [mostrarTarjetas, setMostrarTarjetas] = useState(6);

    const mostrarMasTarjetas = () => {
        setMostrarTarjetas(mostrarTarjetas + 3);
    };

    return (

        <div className="cuerpo container mb-5 text-center">

            <div className="container arriba" >
                <h1 className="text-center mt-5 mb-4">Tipos de Cachés</h1>
                <p className="mb-5">Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
            </div>
            <div className=" container mx-auto text-center">
                <h2 className="text-center my-4">Comienza a Explorar</h2>
                <p className="mb-5">Entra en el emocionante mundo del geocaching. Descubre tesoros ocultos y vive una experiencia única en cada rincón del planeta. ¡Comienza tu aventura hoy mismo.</p>
                <div className="container row row-cols-lg-3 g-3 mx-auto mb-4">
                    <div className=" ju card text-bg-dark border-0 ">
                        <Link to="/caches-ubicacion" className="text-decoration-none" onClick={() => window(0, 0)}>
                            <img src={CachesUbicacion} className="card-img border-dark border border-1" alt="..." />
                        </Link>
                    </div>
                    <div className=" card text-bg-dark border-0 rounded-4">
                        <Link to="/caches-dificultad" className="text-decoration-none" onClick={() => window(0, 0)}>
                            <img src={CachesDificultad} className="card-img border-dark border border-1 " alt="..." />
                        </Link>
                    </div>
                    <div className=" card text-bg-dark border-0 ">
                        <Link to="/caches-tamano" className="text-decoration-none" onClick={() => window(0, 0)}>
                            <img src={CachestTamano} className="card-img border border-dark border border-1 " alt="..." />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mx-auto text-center mt-5">
                <h2 className="text-center mb-4 ">Accede a los Cachés más Populares entre Nuestra Comunidad</h2>
                <p>¡No te pierdas la oportunidad de descubrir los tesoros escondidos de la comunidad! Selecciona los cachés más populares y explora los lugares más interesantes alrededor de ti. ¡Te aseguramos una aventura inolvidable llena de sorpresas y descubrimientos!</p>
                <div className="container mt-3 mb-5 row row-cols-lg-3 mx-auto gx-4, gy-4">
                    {store.caches.slice(0, mostrarTarjetas).map((cache) => {
                        return (
                            <div className="col-sm-1 col-md-4 ">
                                <div className=" esquinaCarta card " key={cache.id}>
                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-title">{cache.state}</h4>
                                        <h5 className="card-title">{cache.city}</h5>
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
                    })
                    }

                </div>
                <button onClick={mostrarMasTarjetas} className="btn btn-primary mb-5">
                    Mostrar más tarjetas
                </button>
            </div>

        </div>
    );
}
