import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import { UploadImage } from "../component/upload";
import { NewPassword } from "../component/newPassword";




export const MiPerfil = () => {
    const { store, actions } = useContext(Context);
    const [urlImage, seturlImage] = useState("https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");

    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);
    const [showDiv3, setShowDiv3] = useState(false);
    const [showDiv4, setShowDiv4] = useState(false);
    const [showDiv5, setShowDiv5] = useState(false);
    const [showDiv6, setShowDiv6] = useState(false);
    const [showDiv7, setShowDiv7] = useState(false);
    const [showDiv8, setShowDiv8] = useState(false);
    const [showDiv9, setShowDiv9] = useState(false);
    const [showDiv10, setShowDiv10] = useState(false);
    const [showDiv11, setShowDiv11] = useState(false);
    const [showDiv12, setShowDiv12] = useState(false);


    useEffect(() => {
        setEmail(store.currentUser.email);
        setName(store.currentUser.name);
        setCountry(store.currentUser.country);
        setCity(store.currentUser.city);
        setPassword(store.currentUser.password);

    }, [store.currentUser])


    const mostrarDatosPersonales = () => {
        setShowDiv1(true);
        setShowDiv2(false);
        setShowDiv3(false);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);
    };

    const mostrarcachesPropios = () => {
        setShowDiv1(false);
        setShowDiv2(true);
        setShowDiv3(false);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);

    };

    const mostrarcachesEncontrados = () => {
        setShowDiv1(false);
        setShowDiv2(false);
        setShowDiv3(true);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);

    };


    const mostrarCachesFavoritos = () => {
        setShowDiv1(false);
        setShowDiv2(false);
        setShowDiv3(false);
        setShowDiv4(true);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);

    };

    const mostrarPostsFavoritos = () => {
        setShowDiv1(false);
        setShowDiv2(false);
        setShowDiv3(false);
        setShowDiv4(false);
        setShowDiv5(true);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);

    };

    const mostrarCachesCreadosEnviados = () => {
        setShowDiv1(false);
        setShowDiv2(true);
        setShowDiv3(false);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(true);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);

    };

    const mostrarCachesCreadosAprobados = () => {
        setShowDiv1(false);
        setShowDiv2(true);
        setShowDiv3(false);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(true);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);

    };

    const mostrarCachesCreadosRechazados = () => {
        setShowDiv1(false);
        setShowDiv2(true);
        setShowDiv3(false);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(true);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);

    };

    const mostrarCachesEncontradosEnviados = () => {
        setShowDiv1(false);
        setShowDiv2(false);
        setShowDiv3(true);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(true);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(false);

    };

    const mostrarCachesEncontradosAprobados = () => {
        setShowDiv1(false);
        setShowDiv2(false);
        setShowDiv3(true);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(true);
        setShowDiv11(false);
        setShowDiv12(false);

    };

    const mostrarCachesEncontradosRechazados = () => {
        setShowDiv1(false);
        setShowDiv2(false);
        setShowDiv3(true);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(true);
        setShowDiv12(false);

    };

    const cambiarPassword = () => {
        setShowDiv1(null);
        setShowDiv2(false);
        setShowDiv3(false);
        setShowDiv4(false);
        setShowDiv5(false);
        setShowDiv6(false);
        setShowDiv7(false);
        setShowDiv8(false);
        setShowDiv9(false);
        setShowDiv10(false);
        setShowDiv11(false);
        setShowDiv12(true);

    };





    return (
        <div className="container my-5">
            <h1 className={`${showDiv1 || showDiv2 || showDiv3 || showDiv4 || showDiv5 ? "mb-5" : "text-center mb-5"}`}>GeoCaching - My Profile</h1>
            <div className=" row">

                <div className={`${showDiv1 || showDiv2 || showDiv3 || showDiv4 || showDiv5 ? "col-4" : "col-12"} d-flex flex-column`}>


                    <button className={`${showDiv1 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarDatosPersonales}>Datos Personales </button>
                    <button className={`${showDiv2 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarcachesPropios}> Cachés Registrados </button>
                    <button className={`${showDiv3 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarcachesEncontrados}> Cachés Encontrados </button>
                    <button className={`${showDiv4 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarCachesFavoritos}> Cachés Favoritos </button>
                    <button className={`${showDiv5 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarPostsFavoritos}> Posts Favoritos </button>
                </div>

                <div className="col-8">

                    {showDiv1 ? (
                        <div>
                            <div>
                                <h2 className="text-center mb-5">Perfil</h2>
                            </div>
                            <div className="d-flex align-items-end ">
                                <UploadImage urlImage={urlImage} apiURL="/api/upload" />
                            </div>
                            <label for="exampleFormControlInput1" class="form-label mt-3">Nombre</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={name}
                                onChange={(e) => { setName(e.target.value); }} placeholder={store.currentUser.name} />
                            <label for="exampleFormControlInput1" class="form-label mt-3">Email</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={email}
                                onChange={(e) => { setEmail(e.target.value); }} placeholder={store.currentUser.email} />
                            <label for="disabledTextInput" class="form-label mt-3 ">Password</label>
                            <input class="form-control text-dark" type="text" aria-label="Disabled input example" disabled readonly placeholder={"..................."} />
                            <div className="d-flex justify-content-end my-3">
                                <NewPassword />

                            </div>
                            <label for="exampleFormControlInput1" class="form-label mt-1 ">País</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={country}
                                onChange={(e) => { setCountry(e.target.value); }} placeholder={store.currentUser.country} />
                            <label for="exampleFormControlInput1" class="form-label mt-3">City</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={city}
                                onChange={(e) => { setCity(e.target.value); }} placeholder={store.currentUser.city} />
                            <div class="d-flex justify-content-end">
                                <button className="mb-5 mt-5 btn btn-danger btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    actions.getUpdateUser(email, name, country, city)
                                }}>Guardar Cambios </button>

                            </div>
                        </div>
                    ) : null}
                    {showDiv2 ? (
                        <div >
                            <h2 className="text-center mb-5">Mis Cachés Registrados</h2>
                            <div className="text-center">
                                <div class="" aria-label="Basic checkbox toggle button group" >
                                    <button type="button " class="btn btn-warning mx-2 my-2" onClick={mostrarCachesCreadosEnviados}>Cachés Enviados <i class="fa-solid fa-rocket"></i></button>
                                    <button type="button " class="btn btn-success mx-2" onClick={mostrarCachesCreadosAprobados}>Cachés Aprobados <i class="fa-solid fa-face-smile"></i></button>
                                    <button type="button " class="btn btn-danger mx-2 my-2" onClick={mostrarCachesCreadosRechazados} >Cachés Rechazados <i class="fa-solid fa-heart-crack"></i></button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {showDiv3 ? (
                        <div>
                            <h2 className="text-center mb-5">Mis Cachés Encontrados</h2>
                            <div >
                                <div className="text-center">
                                    <div class="" aria-label="Basic checkbox toggle button group" >
                                        <button type="button " class="btn btn-warning mx-2 my-2" onClick={mostrarCachesEncontradosEnviados}>Cachés Enviados <i class="fa-solid fa-rocket"></i></button>
                                        <button type="button " class="btn btn-success mx-2" onClick={mostrarCachesEncontradosAprobados}>Cachés Aprobados <i class="fa-solid fa-face-smile"></i></button>
                                        <button type="button " class="btn btn-danger mx-2 my-2" onClick={mostrarCachesEncontradosRechazados} >Cachés Rechazados <i class="fa-solid fa-heart-crack"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {showDiv4 ? (
                        <div>
                            <h2 className="text-center mb-5">Mis Cachés Favoritos</h2>
                            {store.currentUser.favorites.map((favorites) => {
                                return (
                                    <div className="card" key={favorites.id}>
                                        <img src="https://thumbs.dreamstime.com/z/ciudad-de-mapas-con-ruta-gps-y-geo-navegaci%C3%B3n-para-entrega-en-la-calle-ubicaci%C3%B3n-app-map-road-town-park-river-cartograf%C3%ADa-229179316.jpg" class="card-img-top" alt="..." />
                                        <div className="card-body text-center">
                                            <h4 className="card-title">{favorites.cache.state}</h4>
                                            <h5 className="card-title">{favorites.cache.city}</h5>
                                            <p className="card-text">{favorites.cache.name}</p>
                                            <Link to={"/perfil-cache/" + favorites.cache.id} className="text-decoration-none">
                                                <a href="#" className="btn btn-primary"><i class="fa-solid fa-earth-americas"></i></a>
                                            </Link>
                                            <button onClick={() => {
                                                actions.createFavoritesCaches(favorites.cache.id);
                                            }} type="button" class="btn btn-outline-danger mx-1" >Delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : null}
                    {showDiv5 ? (
                        <div>
                            <h2 className="text-center mb-5">Mis Posts Favoritos</h2>

                        </div>
                    ) : null}
                    {showDiv6 ? (
                        <div>
                            <h2 className="text-center my-5">Mis Cachés Enviados</h2>

                        </div>
                    ) : null}
                    {showDiv7 ? (
                        <div>
                            <h2 className="text-center my-5">Mis Cachés Aprobados</h2>
                        </div>
                    ) : null}
                    {showDiv8 ? (
                        <div>
                            <h2 className="text-center my-5">Mis Cachés Rechazados</h2>
                        </div>
                    ) : null}
                    {showDiv9 ? (
                        <div>
                            <h2 className="text-center my-5">Mis Cachés Enviados</h2>

                        </div>
                    ) : null}
                    {showDiv10 ? (
                        <div>
                            <h2 className="text-center my-5">Mis Cachés Aprobados</h2>
                        </div>
                    ) : null}
                    {showDiv11 ? (
                        <div>
                            <h2 className="text-center my-5">Mis Cachés Rechazados</h2>
                        </div>
                    ) : null}
                    {showDiv12 ? (
                        <div>
                            <div>
                                <h2 className="text-center mb-5">Cambiar contraseña</h2>
                            </div>
                            <label for="exampleFormControlInput1" class="form-label mt-3">Contraseña Actual</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" />
                            <label for="exampleFormControlInput1" class="form-label mt-3">Cambiar contraseña</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" />
                            <label for="exampleFormControlInput1" class="form-label mt-3">Confirmar contraseña</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" />
                            <div className="d-flex justify-content-end my-3">
                                <button type="button" class="btn btn-danger btn-sm">Actualizar Cambios</button>
                            </div>
                        </div>
                    ) : null}

                </div>
            </div>

        </div>
    );
}

