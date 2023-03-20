import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Cluster } from "../component/cluster";
import { Buscador } from "../component/buscador";
import CachesOK from "../../img/CachesOK.png"
import RANKINGok from "../../img/RANKINGok.png"
import BLOGok from "../../img/BLOGok.png"



export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [city, setCity] = useState("");
	const [name, setName] = useState("");
	const [favoriteCaches, setfavoriteCaches] = useState([]);
	const [id, setId] = useState("");

	useEffect(() => {
		setId(store.caches.id);
		setName(store.caches.name);
		setCity(store.caches.city);
	}, [store.caches])

	return (


		<div>

			<div className="container">
				<h1 className="text-center mt-4 mb-3">Geocaching: Descubre tesoros alrededor del Mundo </h1>
				<p>Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
			</div>
			<div className="container">
				<h2 className="text-center mb-3 mt-4">Comienza a Explorar</h2>
				<p>Entra en el emocionante mundo del geocaching. Descubre tesoros ocultos y vive una experiencia única en cada rincón del planeta. ¡Comienza tu aventura hoy mismo.</p>
				<div className="container mb-5 row row-cols-lg-3 mx-auto my-5">
					<Cluster link="/tipos-de-caches" classboton="d-none" image={CachesOK} />
					<Cluster link="/blog" classboton="d-none" image={BLOGok} />
					<Cluster link="/ranking-usuario" classboton="d-none" image={RANKINGok} />
				</div>
			</div>

			<div className="container mx-auto text-center">
				<h2 className="text-center mb-3 mt-4">Accede a los Cachés más Populares entre Nuestra Comunidad</h2>
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
									}} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(cache.id) ? "btn btn-outline-danger mx-1" : "btn btn-outline-warning mx-1"} ><i class="fa-solid fa-heart"></i></button>
								</div>
							</div>
						)
					})}
				</div>

			</div>


		</div>
	);
};
