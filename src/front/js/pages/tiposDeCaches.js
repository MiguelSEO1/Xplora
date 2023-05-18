import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import Ubicacion from "../../img/ubicacion.png"
import Dificultad from "../../img/dificultad.png"
import Tamano from "../../img/tamano.png"
import { shuffle } from 'lodash';


export const TiposDeCaches = () => {
    const { store, actions } = useContext(Context);
    const [mostrarTarjetas, setMostrarTarjetas] = useState(6);
    const shuffledCaches = shuffle(store.caches.filter(cache => cache.is_approved));


    const mostrarMasTarjetas = () => {
        setMostrarTarjetas(mostrarTarjetas + 3);
    };

    return (

        <div className="cuerpo container mb-5 text-center">

            <div className="container arriba" >
                <h1 className="text-center mt-5 mb-4">Tipos de Cachés</h1>
                <p className="mb-5">¡Bienvenido a nuestra sección de tipos de caches! Aquí encontrarás opciones emocionantes para explorar lugares únicos en todo el mundo. Podrás elegir caches por ubicación, tamaño y dificultad, desde los pequeños micro caches escondidos en la ciudad hasta los más grandes caches en plena naturaleza. ¡No esperes más y comienza tu búsqueda de aventuras ahora mismo!</p>
            </div>
            <div className=" container mx-auto text-center">
                <h2 className="text-center my-4">Comienza a Explorar</h2>
                <p className="mb-5">Desde emocionantes rutas de senderismo, pasando por exploraciones urbanas, tenemos todo lo que necesitas para satisfacer tu espíritu aventurero. ¡No esperes más, comienza a explorar nuestros cachés ahora mismo y descubre lo que el mundo tiene para ofrecer!</p>
                <div className="container mb-5 row row-cols-lg-3 mx-auto my-5">
                    <Cluster link="/caches-ubicacion" classboton="d-none" cardTitle="Ubicación" image={Ubicacion} onClick={() => window(0, 0)} />
                    <Cluster link="/caches-dificultad" classboton="d-none" cardTitle="Dificultad" image={Dificultad} onClick={() => window(0, 0)} />
                    <Cluster link="/caches-tamano" classboton="d-none" cardTitle="Tamaño" image={Tamano} onClick={() => window(0, 0)} />
                </div>
            </div>
            <div className="container mx-auto text-center mt-5">
                <h2 className="text-center mb-4 ">Accede a los Cachés más Populares entre Nuestra Comunidad</h2>
                <p>¡Accede a los caches más populares entre nuestra comunidad y descubre por qué son tan populares! Explora y descubre lugares increíbles en todo el mundo a través de los ojos de otros entusiastas. ¡No esperes más, accede a los caches más populares ahora mismo y únete a la diversión!</p>
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
