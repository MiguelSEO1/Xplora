
import { Link } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";

export const Buscador = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [query, setQuery] = useState({ city: '', state: '', size: '', difficulty: '', name: '' });
	const [hasFilters, setHasFilters] = useState(false);
	const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

	const handleCloseAdditionalFilters = () => {
		setShowAdditionalFilters(false);
	};

	const handleShowAdditionalFilters = () => {
		setShowAdditionalFilters(true);
	};

	const handleChange = (event) => {

		const value = event.target.value;
		setQuery({ ...query, [event.target.name]: value });
		const trimmedValue = value.trim();
		if (trimmedValue !== '') {
			setHasFilters(true);
		} else if (query[event.target.name].trim() !== trimmedValue) {
			setHasFilters(true);
		} else {
			setHasFilters(false);
		}

	};




	const filterCaches = () => {
		const normalizedQuery = {
			city: query.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
			size: query.size.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
			difficulty: query.difficulty.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(),
			name: query.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
		};
		const trimmedQuery = {
			city: normalizedQuery.city.trim(),
			size: normalizedQuery.size.trim(),
			difficulty: normalizedQuery.difficulty.trim(),
			name: normalizedQuery.name.trim(),
			state: query.state.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
		};

		return store.caches.filter(
			cache =>
				cache.state.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(trimmedQuery.state) &&
				cache.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(trimmedQuery.city) &&
				cache.size.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(trimmedQuery.size) &&
				cache.difficulty.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(trimmedQuery.difficulty) &&
				cache.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(trimmedQuery.name)
		);
	};


	const cachesToShow = filterCaches();

	return (
		<div className="  buscador buscador container-fluid p-3  ">

			<div className=" row row cols-lg-1 m-5 d-flex justify-content-center ">
				<input className="rounded-pill w-75 mb-2 bg-opacity-10 border border-info rounded py-2 border border-2" placeholder="  Nombre de caché..." type="text" name="name" value={query.name} onChange={handleChange} />
				{showAdditionalFilters ? (
					<div className=" justify-content-center text-center ">
						<input className="rounded-pill bg-opacity-10 border border-danger rounded border border-2 py-2 mb-2 mx-2" placeholder="   CCAA..." type="text" name="state" value={query.state} onChange={handleChange} />
						<input className=" rounded-pill  bg-opacity-10 border border-danger rounded  border border-2 py-2 mb-2 " placeholder="    Provincia ..." type="text" name="city" value={query.city} onChange={handleChange} />
						<input className=" rounded-pill bg-opacity-10 border border-danger rounded border border-2 py-2 mb-2 mx-2" placeholder="    Tamaño ..." type="text" name="size" value={query.size} onChange={handleChange} />
						<input className=" rounded-pill bg-opacity-10 border border-danger rounded  border border-2 py-2 mb-2 " placeholder="    Dificultad ..." type="text" name="difficulty" value={query.difficulty} onChange={handleChange} />
						<button type="button" className="w-auto btn btn-primary my-3 mx-2" onClick={handleCloseAdditionalFilters}> <i class="fa-solid fa-rectangle-xmark"></i> Cerrar</button>
					</div>
				) : (
					<button type="button" className="btn btn-primary w-auto m-2 mb-3" onClick={handleShowAdditionalFilters}><i class="fa-solid fa-filter"></i> filtros</button>
				)}

			</div>




			{hasFilters && cachesToShow.length > 0 ? (
				<div>
					<div className="container mb-5 row row-cols-lg-4 mx-auto gx-3 flex-nowrap overflow-auto pb-3">
						{cachesToShow.filter(cache => cache.is_approved).map((cache) => {
							return (
								<div className="col-sm-1 col-md-4 ">
								<div className=" Cartabuscador card text-center border border-dark" key={cache.id}>
									<img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
									<div className="card-body">
										<h4 className="card-title">{cache.state}</h4>
										<h5 className="card-title">{cache.city}</h5>
										<p className="card-text">{cache.name}</p>
										<Link to={"/perfil-cache/" + cache.id} className="text-decoration-none">
											<a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
										</Link>

										<button onClick={() => {
											actions.createFavoritesCaches(cache.id);
										}} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(cache.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
									</div>
								</div>
							</div>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
};

