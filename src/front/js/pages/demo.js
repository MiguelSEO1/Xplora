import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Cluster } from "../component/cluster";




export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [mostrarTarjetas, setMostrarTarjetas] = useState(6);




	return (


		<div className="container cuerpo">

			<div className="text-center">
				<h1 className=" mt-5 mb-3">Geocaching: Descubre tesoros alrededor del Mundo </h1>
				<p>Bienvenido a nuestro sitio web sobre geocaching, donde podrás vivir una experiencia única y emocionante mientras exploras el mundo en busca de tesoros escondidos. Conviértete en parte de una extensa comunidad de descubridores; todo ello combinando senderismo, emoción de un juego, tesoros ocultos y momentos inolvidables. ¡Comienza tu aventura ahora!</p>
			</div>
			<div className="text-center">
				<h2 className="text-center mb-3 mt-5">Comienza a Explorar</h2>
				<p>Entra en el emocionante mundo del geocaching. Descubre tesoros ocultos y vive una experiencia única en cada rincón del planeta. ¡Comienza tu aventura hoy mismo.</p>
				<div className="container mb-5 row row-cols-lg-3 mx-auto my-5">
					<Cluster link="/tipos-de-caches" classboton="d-none" cardTitle="Cachés" image="https://media.traveler.es/photos/613769fabf63e581e0100e3d/master/w_1600%2Cc_limit/150236.jpg" onClick={() => window(0, 0)} />
					<Cluster link="/blog" classboton="d-none" cardTitle="Blog" image="https://i.blogs.es/199e7b/simon-english-672450-unsplash/840_560.jpeg" onClick={() => window(0, 0)} />
					<Cluster link="/ranking-usuario" classboton="d-none" cardTitle="Ranking" image="https://unomasunoteam.com/wp-content/uploads/2020/03/en-busca-del-tesoro-team-buildng-main-min.jpg" onClick={() => window(0, 0)} />
				</div>
			</div>

			<div className=" mx-auto text-center">
				<h2 className="text-center mb-3 mt-5">Accede a los Cachés más Populares entre Nuestra Comunidad</h2>
				<p>¡No te pierdas la oportunidad de descubrir los tesoros escondidos de la comunidad! Selecciona los cachés más populares y explora los lugares más interesantes alrededor de ti. ¡Te aseguramos una aventura inolvidable llena de sorpresas y descubrimientos!</p>
				<div className="container mb-5 mt-3 row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
					{store.caches.filter(cache => cache.is_approved).slice(0, mostrarTarjetas).map((cache) => {
						return (
							<div className=" ">
								<div className=" esquinaCarta card " key={cache.id}>
									<img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
									<div className="card-body">
										<h3 className="card-title">{cache.state}</h3>
										<h4 className="card-title">{cache.city}</h4>
										<p className="card-text">{cache.name}</p>
										<Link to={"/perfil-cache/" + cache.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
											<a href="#" className="botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
										</Link>


										<button onClick={() => {
											actions.createFavoritesCaches(cache.id);
										}} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(cache.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
									</div>
								</div>
								
							</div>
							
						)


					}


					)}
				</div>
				<Link to="/tipos-de-caches" className=" altaLogin nav-link active" aria-current="page" onClick={() => window(0, 0)}>
					<button className="btn btn-primary mb-5">
						Mostrar más tarjetas
					</button>
				</Link>


			</div>
		</div>
	);
};
