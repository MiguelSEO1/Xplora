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
    const [showDiv13, setShowDiv13] = useState(false);
    const [pendingCaches, setPendingCaches] = useState([]);
    const [approvedCaches, setApprovedCaches] = useState([]);
    const [declinedCaches, setDeclinedCaches] = useState([]);
    const [getPendingCaches, setGetPendingCaches] = useState([]);
    const [error, setError] = useState("");


    useEffect(() => {
        setEmail(store.currentUser.email);
        setName(store.currentUser.name);
        setCountry(store.currentUser.country);
        setCity(store.currentUser.city);
        getCachesPendingUser();
        getCachesApproved();
        getCachesDeclined();
    }, [store.currentUser])

    useEffect(() => {
        if (store.admin) {
            getCachesPending();
        }
    }, [store.admin])

    const acceptCache = async (id) => {
        const response = await fetch(
            process.env.BACKEND_URL + "/api/admin_accept_cache",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    id: id,
                }),
            }
        );
        const responsetoJson = await response.json();
        if (response.ok) {
            getCachesPending();
        } else {
            setError(responsetoJson.response);
        }
    };

    const declineCache = async (id) => {
        const response = await fetch(
            process.env.BACKEND_URL + "/api/admin_decline_cache",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    id: id,
                }),
            }
        );
        const responsetoJson = await response.json();
        if (response.ok) {
            getCachesPending();
        } else {
            setError(responsetoJson.response);
        }
    };

    const getCachesPending = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/admin_cache_moderation", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        const data = await response.json();
        setPendingCaches(data.results)
    };

    const getCachesApproved = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user_cache_approved", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        const data = await response.json();
        setApprovedCaches(data.results)
    };

    const getCachesDeclined = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user_cache_declined", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        const data = await response.json();
        setDeclinedCaches(data.results)
    };

    const getCachesPendingUser = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user_cache_pending", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
        const data = await response.json();
        setGetPendingCaches(data.results)
    };

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
        setShowDiv13(false);
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
        setShowDiv13(false);

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
        setShowDiv13(false);

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
        setShowDiv13(false);

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
        setShowDiv13(false);

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
        setShowDiv13(false);

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
        setShowDiv13(false);

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
        setShowDiv13(false);

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
        setShowDiv13(false);

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
        setShowDiv13(false);

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
        setShowDiv13(false);

    };

    const mostrarAdmin = () => {
        setShowDiv1(false);
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
        setShowDiv13(true);

    };



    return (
        <div className="container my-5">
            <h1 className={`${showDiv1 || showDiv2 || showDiv3 || showDiv4 || showDiv5 || showDiv13 ? "mb-5" : "text-center mb-5"}`}>GeoCaching - My Profile</h1>
            <div className=" row">

                <div className={`${showDiv1 || showDiv2 || showDiv3 || showDiv4 || showDiv5 || showDiv13 ? "col-4" : "col-12"} d-flex flex-column`}>


                    <button className={`${showDiv1 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarDatosPersonales}>Datos Personales </button>
                    <button className={`${showDiv2 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarcachesPropios}> Cachés Registrados </button>
                    <button className={`${showDiv3 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarcachesEncontrados}> Cachés Encontrados </button>
                    <button className={`${showDiv4 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarCachesFavoritos}> Cachés Favoritos </button>
                    <button className={`${showDiv5 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary `} onClick={mostrarPostsFavoritos}> Posts Favoritos </button>
                    {store.admin ? <button className={`${showDiv13 ? "w-75 mx-auto bg-primary text-white" : "w-75 mx-auto"} btn btn-outline-primary mt-5`} onClick={mostrarAdmin}> Admin panel </button> : null}
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
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Nombre</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={name}
                                onChange={(e) => { setName(e.target.value); }} placeholder={store.currentUser.name} />
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={email}
                                onChange={(e) => { setEmail(e.target.value); }} placeholder={store.currentUser.email} />
                            <label htmlFor="disabledTextInput" className="form-label mt-3 ">Password</label>
                            <input className="form-control text-dark" type="text" aria-label="Disabled input example" disabled readOnly onChange={(e) => { setPassword(e.target.value); }} value={password} placeholder={"..................."} />
                            <div className="d-flex justify-content-end my-3">
                                <NewPassword />
                            </div>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-1 ">País</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={country}
                                onChange={(e) => { setCountry(e.target.value); }} placeholder={store.currentUser.country} />
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">City</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={city}
                                onChange={(e) => { setCity(e.target.value); }} placeholder={store.currentUser.city} />
                            <div className="d-flex justify-content-end">
                                <button className="mb-5 mt-5 btn btn-danger btn-sm" onClick={(e) => {
                                    e.preventDefault();
                                    actions.getUpdateUser(email, name, country, city);
                                }}>Guardar Cambios </button>
                            </div>
                        </div>
                    ) : null}
                    {showDiv2 ? (
                        <div >
                            <h2 className="text-center mb-5">Mis Cachés Registrados</h2>
                            <div className="text-center">
                                <div className="" aria-label="Basic checkbox toggle button group" >
                                    <button type="button " className="btn btn-warning mx-2 my-2" onClick={mostrarCachesCreadosEnviados}>Cachés Enviados <i className="fa-solid fa-rocket"></i></button>
                                    <button type="button " className="btn btn-success mx-2" onClick={mostrarCachesCreadosAprobados}>Cachés Aprobados <i className="fa-solid fa-face-smile"></i></button>
                                    <button type="button " className="btn btn-danger mx-2 my-2" onClick={mostrarCachesCreadosRechazados} >Cachés Rechazados <i className="fa-solid fa-heart-crack"></i></button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {showDiv3 ? (
                        <div>
                            <h2 className="text-center mb-5">Mis Cachés Encontrados</h2>
                            <div >
                                <div className="text-center">
                                    <div className="" aria-label="Basic checkbox toggle button group" >
                                        <button type="button " className="btn btn-warning mx-2 my-2" onClick={mostrarCachesEncontradosEnviados}>Cachés Enviados <i className="fa-solid fa-rocket"></i></button>
                                        <button type="button " className="btn btn-success mx-2" onClick={mostrarCachesEncontradosAprobados}>Cachés Aprobados <i className="fa-solid fa-face-smile"></i></button>
                                        <button type="button " className="btn btn-danger mx-2 my-2" onClick={mostrarCachesEncontradosRechazados} >Cachés Rechazados <i className="fa-solid fa-heart-crack"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {showDiv4 ? (
                        <div>
                            <h2 className="text-center mb-5">Mis Cachés Favoritos</h2>
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
                            <div className="container mb-5 row row-cols-lg-2 mx-auto gx-3 text-center">
                                {getPendingCaches.map((caches) => {
                                    return (
                                        <div className="card" key={caches.id}>
                                            <img src="https://thumbs.dreamstime.com/z/ciudad-de-mapas-con-ruta-gps-y-geo-navegaci%C3%B3n-para-entrega-en-la-calle-ubicaci%C3%B3n-app-map-road-town-park-river-cartograf%C3%ADa-229179316.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h4 className="card-text">{caches.name}</h4>
                                                <h5 className="card-title">{caches.state}, {caches.city}</h5>
                                                <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none">
                                                    <button className="btn btn-primary">Ver Detalles</button>
                                                </Link>
                                                {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : null}
                    {showDiv7 ? (
                        <div>
                            <h2 className="text-center my-5">Mis Cachés Aprobados</h2>
                            <div className="container mb-5 row row-cols-lg-2 mx-auto gx-3 text-center">
                                {approvedCaches.map((caches) => {
                                    return (
                                        <div className="card" key={caches.id}>
                                            <img src="https://thumbs.dreamstime.com/z/ciudad-de-mapas-con-ruta-gps-y-geo-navegaci%C3%B3n-para-entrega-en-la-calle-ubicaci%C3%B3n-app-map-road-town-park-river-cartograf%C3%ADa-229179316.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h4 className="card-text">{caches.name}</h4>
                                                <h5 className="card-title">{caches.state}, {caches.city}</h5>
                                                <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none">
                                                    <button className="btn btn-primary">Ver Detalles</button>
                                                </Link>
                                                {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : null}
                    {showDiv8 ? (
                        <div>
                            <h2 className="text-center my-5">Mis Cachés Rechazados</h2>
                            <div className="container mb-5 row row-cols-lg-2 mx-auto gx-3 text-center">
                                {declinedCaches.map((caches) => {
                                    return (
                                        <div className="card" key={caches.id}>
                                            <img src="https://thumbs.dreamstime.com/z/ciudad-de-mapas-con-ruta-gps-y-geo-navegaci%C3%B3n-para-entrega-en-la-calle-ubicaci%C3%B3n-app-map-road-town-park-river-cartograf%C3%ADa-229179316.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h4 className="card-text">{caches.name}</h4>
                                                <h5 className="card-title">{caches.state}, {caches.city}</h5>
                                                <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none">
                                                    <button className="btn btn-primary">Ver Detalles</button>
                                                </Link>
                                                {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
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
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Contraseña Actual</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" />
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Cambiar contraseña</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" />
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Confirmar contraseña</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" />
                            <div className="d-flex justify-content-end my-3">
                                <button type="button" className="btn btn-danger btn-sm">Actualizar Cambios</button>
                            </div>
                        </div>
                    ) : null}
                    {showDiv13 ? (
                        <div>
                            <h2 className="text-center mb-5">Admin Panel</h2>
                            <h3 className="text-center mb-5">Nuevos caches</h3>
                            <div className="container mb-5 row row-cols-lg-2 mx-auto gx-3 text-center">
                                {pendingCaches.map((caches) => {
                                    return (
                                        <div className="card" key={caches.id}>
                                            <img src="https://thumbs.dreamstime.com/z/ciudad-de-mapas-con-ruta-gps-y-geo-navegaci%C3%B3n-para-entrega-en-la-calle-ubicaci%C3%B3n-app-map-road-town-park-river-cartograf%C3%ADa-229179316.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h4 className="card-text">{caches.name}</h4>
                                                <h5 className="card-title">{caches.state}, {caches.city}</h5>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={(e) => {
                                                        setError(false);
                                                        acceptCache(caches.id);
                                                    }}
                                                >Aprobar</button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={(e) => {
                                                        setError(false);
                                                        declineCache(caches.id);
                                                    }}
                                                >Rechazar</button>
                                                <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none">
                                                    <button className="btn btn-primary">Ver Detalles</button>
                                                </Link>
                                                {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

        </div>
    );
}

