import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import { UploadImage } from "../component/upload";
import { NewPassword } from "../component/newPassword";


export const MiPerfil = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [urlImage, seturlImage] = useState("https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg");
    const [urlImageSkull, seturlImageSkull] = useState("https://thumbs.dreamstime.com/b/cr%C3%A1neo-e-icono-de-la-bandera-pirata-aislado-50307817.jpg");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [alertName, setAlertName] = useState("");
    const [alertEmail, setAlertEmail] = useState("");
    const [alertCountry, setAlertCountry] = useState("");
    const [alertTotalChanges, setAlertTotalChanges] = useState("");



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
    const [perfilComment, setPerfilComment] = useState([]);
    const [cacheFound, setCacheFound] = useState({});


    useEffect(() => {
        setEmail(store.currentUser.email);
        setName(store.currentUser.name);
        setCountry(store.currentUser.country);
        setCity(store.currentUser.city);
        getCachesPendingUser();
        getCachesApproved();
        getCachesDeclined();
        setPassword(store.currentUser.password);
    }, [store.currentUser])

    useEffect(() => {
        if (store.admin) {
            getCachesPending();
            getCacheComment();
        }
    }, [store.admin])


    const reportedComments = async (id) => {
        const response = await fetch(
            process.env.BACKEND_URL + "/api/reported-comments",
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
            getCacheComment();
        } else {
            setError(responsetoJson.response);
        }
    };

    const reportedCommentsViolence = async (id) => {
        const response = await fetch(
            process.env.BACKEND_URL + "/api/reported-comments-violence",
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
            getCacheComment();
        } else {
            setError(responsetoJson.response);
        }
    };

    const getCacheComment = async () => {
        const respuesta = await fetch(process.env.BACKEND_URL + "/api/perfil-cache-comment");
        const data = await respuesta.json();
        setPerfilComment(data);
    };

    const deleteComments = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/delete-comments", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                id: id,
            })

        });

        if (response.ok) {
            getCacheComment();
        }

    };

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
            actions.getCaches();
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

    const addUserCache = async (cache_Found) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/add-cache-found/" + params.id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),

            },
            body: JSON.stringify(cache_Found),
        });

        if (!response.ok) {
            throw new Error('Error al añadir el caché al usuario');
        }

        const data = await response.json();
        return setCacheFound(data);
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
        setShowDiv6(true);
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

    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.(?:com|net|org|edu|gov|mil|info|biz|co|([a-zA-Z]{2,}))$/i;
    const accents = /[áéíóúü]/;
    const uppercase = /[A-Z]/;


    const countries = [
        'Alemania', 'Austria', 'Bélgica', 'Bulgaria', 'Chipre', 'Croacia', 'Dinamarca', 'Eslovaquia', 'Eslovenia',
        'España', 'Estonia', 'Finlandia', 'Francia', 'Grecia', 'Hungría', 'Irlanda', 'Italia', 'Letonia', 'Lituania',
        'Luxemburgo', 'Malta', 'Países Bajos', 'Polonia', 'Portugal', 'República Checa', 'Rumanía', 'Suecia', 'Argentina',
        'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras',
        'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela']
        ;



    return (


        <div className="container cuerpo">
            <h1 className={`${showDiv1 || showDiv2 || showDiv3 || showDiv4 || showDiv5 || showDiv13 ? "text-center mb-5" : "text-center  mb-5 "}`}>Mi Área Personal</h1>
            <div className=" row row-cols-lg-2 row-cols-md-1 row-cols-sm-1">

                <div className={`${showDiv1 || showDiv2 || showDiv3 || showDiv4 || showDiv5 || showDiv13} mx-auto`}>


                    <button className="colorgradiente btn btn-outline-dark mx-auto w-100 mx-auto" onClick={mostrarDatosPersonales}>Datos Personales </button>
                    {getPendingCaches.length === 0 ? null :
                        <span className=" mt-5 position-absolute translate-middle badge rounded-pill bg-danger">
                            {getPendingCaches.length}+
                        </span>}<button className="colorgradiente btn btn-outline-dark mx-auto w-100 mx-auto" onClick={mostrarcachesPropios}> Cachés Registrados </button> 
                    <button className="colorgradiente btn btn-outline-dark mx-auto w-100 mx-auto" onClick={mostrarcachesEncontrados}> Cachés Encontrados</button>{store.currentUser.caches_found.length === 0 ? null :
                        <span class="mt-2  position-absolute translate-middle badge rounded-pill bg-danger">
                            {store.currentUser.caches_found.length}+
                        </span>}
                    <button className="colorgradiente btn btn-outline-dark mx-auto w-100 mx-auto" onClick={mostrarCachesFavoritos}> Cachés Favoritos </button>{store.currentUser.favorites.length === 0 ? null :
                        <span class=" mt-2 position-absolute translate-middle badge rounded-pill bg-danger">
                            {store.currentUser.favorites.length}+
                        </span>}
                    {store.admin ? <button className="colorgradiente btn btn-outline-dark mx-auto w-100 mx-auto mt-5" onClick={mostrarAdmin}> Admin panel </button> : null}
                </div>



                <div className="  mt-5">

                    {showDiv1 ? (
                        <div className=" border border-dark border border-2 rounded registro container my-5">
                            <div>
                                <h2 className="text-center my-5 text-danger">Perfil</h2>
                            </div>
                            <div className=" d-flex ">
                                <UploadImage urlImage={urlImageSkull} apiURL="/api/upload" />
                            </div>
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-4 fw-bold">Nombre *(obligatorio)</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setAlertName(false);
                                    setAlertEmail(false);
                                    setAlertCountry(false);
                                    setAlertTotalChanges(false);
                                    setAlertTotalChanges(false);
                                }} onKeyUp={async (e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (name.trim() != "" && email.trim() != "" && emailRegex.test(email.trim()) && countries.includes(country.trim()) || country.trim() === "") {
                                            await actions.getUpdateUser(email, name, country, city);
                                            setAlertTotalChanges("Cambios actualizados correctamente");
                                        } else if (name.trim() === "") {
                                            setAlertName("Por favor, ingrese un nombre de usuario.");
                                        } else if (email.trim() === "" || !emailRegex.test(email.trim())) {
                                            setAlertEmail("Por favor, ingrese un email con el formato indicado ´nombre@gmail.com, por ejemplo´");
                                        } else if (!countries.includes(country.trim() && country.trim() != "")) {
                                            setAlertCountry("Por favor, ingrese un país de localización válido, respetando tildes y Mayúsculas (por ejemplo, España).");
                                        }
                                    }
                                }
                                }
                                placeholder={store.currentUser.name} />
                            {alertName ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertName}
                                </div>
                            ) : null}

                            <label htmlFor="exampleFormControlInput1" className="form-label mt-3 fw-bold">Email *(obligatorio)</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setAlertCountry(false);
                                    setAlertName(false);
                                    setAlertEmail(false);
                                    setAlertTotalChanges(false);
                                }} onKeyUp={async (e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (email.trim() != "" && emailRegex.test(email.trim()) && name.trim() != "" && countries.includes(country.trim()) || country.trim() === "") {
                                            await actions.getUpdateUser(email, name, country, city);
                                            setAlertTotalChanges("Cambios actualizados correctamente")
                                        } else if (email.trim() === "" || !emailRegex.test(email.trim())) {
                                            setAlertEmail("Por favor, ingrese un email con el formato indicado ´nombre@gmail.com, por ejemplo´");
                                        } else if (name.trim() === "") {
                                            setAlertName("Por favor, ingrese un nombre de usuario.");
                                        } else if (!countries.includes(country.trim()) && country.trim() != "") {
                                            setAlertCountry("Por favor, ingrese un país de localización válido, respetando tildes y Mayúsculas (por ejemplo, España).´");
                                        }
                                    }
                                }
                                }
                                placeholder={store.currentUser.email} />
                            {alertEmail ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertEmail}
                                </div>
                            ) : null}
                            <label htmlFor="disabledTextInput" className="form-label mt-3 fw-bold">Password *(obligatorio)</label>
                            <input className="form-control text-dark" type="password" aria-label="Disabled input example" disabled readOnly onChange={(e) => { setPassword(e.target.value); }} value={password} placeholder={".........................."} />
                            <div className="d-flex justify-content-end my-3">
                                <NewPassword />
                            </div>


                            <label htmlFor="exampleFormControlInput1" className="form-label mt-1 fw-bold">País</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" value={country}
                                onChange={(e) => {
                                    setCountry(e.target.value);
                                    setAlertCountry(false);
                                    setAlertName(false);
                                    setAlertEmail(false);
                                    setAlertTotalChanges(false);
                                }} onKeyUp={async (e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (email.trim() === "" || !emailRegex.test(email.trim())) {
                                            setAlertEmail("Por favor, ingrese un email con el formato indicado ´nombre@gmail.com, por ejemplo´");
                                        } else if (name.trim() === "") {
                                            setAlertName("Por favor, ingrese un nombre de usuario.");
                                        } else if (email.trim() != "" && emailRegex.test(email.trim()) && name.trim() != "" && countries.includes(country.trim()) || country.trim() === "") {
                                            await actions.getUpdateUser(email, name, country, city);
                                            setAlertTotalChanges("Cambios actualizados correctamente");
                                        } else if (!countries.includes(country.trim()) && country.trim() != "") {
                                            setAlertCountry("Por favor, ingrese un país de localización válido, respetando tildes y Mayúsculas (por ejemplo, España).");
                                        }
                                    }
                                }}
                                placeholder={store.currentUser.country} />
                            {alertCountry ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertCountry}
                                </div>
                            ) : null}
                            <div className="d-flex justify-content-end">
                                <button className="mb-5 mt-5 btn btn-danger btn-sm" onClick={async () => {
                                    if (
                                        country.trim() === "" ||
                                        countries.includes(country.trim()) &&
                                        name.trim() !== "" &&
                                        email.trim() !== "" &&
                                        emailRegex.test(email.trim())
                                    ) {
                                        await actions.getUpdateUser(email, name, country, city);
                                        setAlertTotalChanges("Cambios actualizados correctamente");
                                    } else {
                                        if (!countries.includes(country.trim()) && country.trim() != "") {
                                            setAlertCountry("Por favor, ingrese un país de localización válido, respetando tildes y Mayúsculas.");
                                        }
                                        if (name.trim() === "") {
                                            setAlertName("Por favor, ingrese un nombre de usuario.");
                                        }
                                        if (email.trim() === "" || !emailRegex.test(email.trim())) {
                                            setAlertEmail("Por favor, ingrese un email con el formato indicado ´nombre@gmail.com, por ejemplo´");
                                        }
                                    }
                                }}>Guardar Cambios</button>



                            </div>
                            {alertTotalChanges ? (
                                <div className="mb-3 p-3 label alert alert-danger" role="alert">
                                    {alertTotalChanges}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                    {showDiv2 ? (
                        <div className="border border-dark border border-2 rounded registro container my-5 " >
                            <h2 className="text-center text-danger my-5">Mis Cachés Registrados</h2>
                            <div className="text-center mb-4">
                                <div className="" aria-label="Basic checkbox toggle button group" >
                                    <button type="button " className="btn btn-warning mx-2 my-2" onClick={mostrarCachesCreadosEnviados}>Cachés Enviados <i className="fa-solid fa-rocket"></i>{getPendingCaches.length === 0 ? null :
                                        <span className="createalertespecífica translate-middle badge rounded-pill bg-danger">
                                            {getPendingCaches.length}+
                                        </span>}</button>
                                    <button type="button " className="btn btn-success mx-2" onClick={mostrarCachesCreadosAprobados}>Cachés Aprobados <i className="fa-solid fa-face-smile"></i>{approvedCaches.length === 0 ? null :
                                        <span className="createalertespecífica translate-middle badge rounded-pill bg-danger">
                                            {approvedCaches.length}+
                                        </span>}</button>
                                    <button type="button " className="btn btn-danger mx-2 my-2" onClick={mostrarCachesCreadosRechazados} >Cachés Rechazados <i className="fa-solid fa-heart-crack"></i>{declinedCaches.length === 0 ? null :
                                        <span className="createalertespecífica translate-middle badge rounded-pill bg-dark">
                                            {declinedCaches.length}+
                                        </span>}</button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {showDiv3 ? (
                        <div className="border border-dark border border-2 rounded registro container my-5">
                            <h2 className="text-center text-danger my-5">Mis Cachés Encontrados</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">

                                {store.currentUser.caches_found <= 0 ?
                                    <h2 className="text-center mx-auto text-primary "> No tienes nada</h2> :
                                    store.currentUser.caches_found.map((cache_Found) => {
                                        return (
                                            <div className="">
                                                <div className=" esquinaCarta card " key={cache_Found.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body text-center">
                                                        <h3 className="card-title">{cache_Found.comunidad_autonoma}</h3>
                                                        <h4 className="card-title">{cache_Found.provincia}</h4>
                                                        <p className="card-text">{cache_Found.name}</p>
                                                        <Link to={"/perfil-cache/" + cache_Found.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                                                            <a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(cache_Found.id);
                                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(cache_Found.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
                                                        {error ? <p className="alert alert-warning mt-2">{error}</p> : null}


                                                    </div>
                                                </div>
                                            </div>

                                        );
                                    })
                                }
                            </div>
                        </div>
                    ) : null}
                    {showDiv4 ? (
                        <div className="border border-dark border border-2 rounded registro container my-5">
                            <h2 className="text-center text-danger my-5">Mis Cachés Favoritos</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">

                                {store.currentUser.favorites <= 0 ?
                                    <h2 className="text-center mx-auto text-primary "> No tienes nada</h2> :
                                    store.currentUser.favorites.map((favorites) => {
                                        return (
                                            <div className="">
                                                <div className=" esquinaCarta card " key={favorites.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body text-center">
                                                        <h3 className="card-title">{favorites.cache.state}</h3>
                                                        <h4 className="card-title">{favorites.cache.city}</h4>
                                                        <p className="card-text">{favorites.cache.name}</p>
                                                        <Link to={"/perfil-cache/" + favorites.cache.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                                                            <a href="#" className="btn btn-primary"><i class="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(favorites.cache.id);
                                                        }} type="button" class="btn btn-danger mx-1">Delete</button>
                                                    </div>
                                                </div>
                                            </div>

                                        );
                                    })
                                }
                            </div>
                        </div>
                    ) : null}
                    {showDiv5 ? (
                        <div className="border border-dark border border-2 rounded registro container my-5">
                            <h2 className="text-center text-danger my-5">Mis Posts Favoritos</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">

                                {store.currentUser.favorites <= 0 ?
                                    <h2 className="text-center mx-auto text-primary "> No tienes nada</h2> :
                                    store.currentUser.favorites.map((favorites) => {
                                        return (
                                            <div className="">
                                                <div className=" esquinaCarta card " key={favorites.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body text-center">
                                                        <h3 className="card-title">{favorites.cache.state}</h3>
                                                        <h4 className="card-title">{favorites.cache.city}</h4>
                                                        <p className="card-text">{favorites.cache.name}</p>
                                                        <Link to={"/perfil-cache/" + favorites.cache.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                                                            <a href="#" className="btn btn-primary"><i class="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(favorites.cache.id);
                                                        }} type="button" class="btn btn-danger mx-1">Delete</button>
                                                    </div>
                                                </div>
                                            </div>

                                        );
                                    })
                                }
                            </div>
                        </div>

                    ) : null}
                    {showDiv6 ? (
                        <div className=" bg-light border border-dark border border-2 rounded container my-5">
                            <h2 className="text-center my-5 text-decoration-underline">Mis Cachés Enviados</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                                {getPendingCaches <= 0 ?
                                    <h2 className="text-center mx-auto text-primary "> No tienes nada</h2> :
                                    getPendingCaches.map((caches) => {
                                        return (
                                            <div className="">
                                                <div className="text-center mx-auto esquinaCarta card " key={caches.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body">
                                                        <h3 className="card-title">{caches.comunidad_autonoma}</h3>
                                                        <h4 className="card-title">{caches.provincia}</h4>
                                                        <p className="card-text">{caches.name}</p>
                                                        <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                                                            <a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(caches.id);
                                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(caches.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
                                                        {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}
                            </div>
                        </div>
                    ) : null}
                    {showDiv7 ? (
                        <div className=" bg-light border border-dark border border-2 rounded container my-5 " >
                            <h2 className="text-center my-5 text-decoration-underline">Mis Cachés Aprobados</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                                {approvedCaches <= 0 ?
                                    <h2 className="text-center mx-auto text-primary "> No tienes nada</h2> :
                                    approvedCaches.map((caches) => {
                                        return (
                                            <div className="">
                                                <div className=" text-center esquinaCarta card " key={caches.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body">
                                                        <h3 className="card-title">{caches.comunidad_autonoma}</h3>
                                                        <h4 className="card-title">{caches.provincia}</h4>
                                                        <p className="card-text">{caches.name}</p>
                                                        <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                                                            <a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(caches.id);
                                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(caches.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
                                                        {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}
                            </div>
                        </div>
                    ) : null}
                    {showDiv8 ? (
                        <div className="bg-light  border-dark border border-2 rounded container my-5">
                            <h2 className="text-center my-5 text-decoration-underline ">Mis Cachés Rechazados</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                                {declinedCaches <= 0 ?
                                    <h2 className="text-center mx-auto text-primary "> No tienes nada</h2> :
                                    declinedCaches.map((caches) => {
                                        return (
                                            <div className="">
                                                <div className=" text-center esquinaCarta card " key={caches.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body">
                                                        <h3 className="card-title">{caches.comunidad_autonoma}</h3>
                                                        <h4 className="card-title">{caches.provincia}</h4>
                                                        <p className="card-text">{caches.name}</p>
                                                        <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                                                            <a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(caches.id);
                                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(caches.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
                                                        {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    ) : null}
                    {showDiv9 ? (
                        <div className=" bg-light border border-dark border border-2 rounded container my-5">
                            <h2 className="text-center my-5 text-decoration-underline">Mis Cachés Enviados</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                                {getPendingCaches <= 0 ?
                                    <h2 className="text-center mx-auto text-primary "> No tienes nada</h2> :
                                    getPendingCaches.map((caches) => {
                                        return (
                                            <div className="">
                                                <div className="  text-center esquinaCarta card " key={caches.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body">
                                                        <h3 className="card-title">{caches.comunidad_autonoma}</h3>
                                                        <h4 className="card-title">{caches.provincia}</h4>
                                                        <p className="card-text">{caches.name}</p>
                                                        <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)} >
                                                            <a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(caches.id);
                                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(caches.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
                                                        {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}
                            </div>
                        </div>
                    ) : null}
                    {showDiv10 ? (
                        <div className=" bg-light border border-dark border border-2 rounded container my-5 " >
                            <h2 className="text-center my-5 text-decoration-underline">Mis Cachés Aprobados</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                                {approvedCaches <= 0 ?
                                    <h2 className="text-center  mx-auto text-primary "> No tienes nada</h2> :
                                    approvedCaches.map((caches) => {
                                        return (
                                            <div className="">
                                                <div className="text-center esquinaCarta card " key={caches.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body">
                                                        <h3 className="card-title">{caches.comunidad_autonoma}</h3>
                                                        <h4 className="card-title">{caches.provincia}</h4>
                                                        <p className="card-text">{caches.name}</p>
                                                        <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)}>
                                                            <a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(caches.id);
                                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(caches.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
                                                        {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}
                            </div>
                        </div>
                    ) : null}
                    {showDiv11 ? (
                        <div className="bg-light  border-dark border border-2 rounded container my-5">
                            <h2 className="text-center my-5 text-decoration-underline">Mis Cachés Rechazados</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                                {declinedCaches <= 0 ?
                                    <h2 className="text-center  mx-auto text-primary "> No tienes nada</h2> :
                                    declinedCaches.map((caches) => {
                                        return (
                                            <div className="">
                                                <div className="text-center esquinaCarta card " key={caches.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body">
                                                        <h3 className="card-title">{caches.comunidad_autonoma}</h3>
                                                        <h4 className="card-title">{caches.provincia}</h4>
                                                        <p className="card-text">{caches.name}</p>
                                                        <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)} >
                                                            <a href="#" className=" botonBonito btn btn-primary"><i className="fa-solid fa-earth-americas"></i></a>
                                                        </Link>
                                                        <button onClick={() => {
                                                            actions.createFavoritesCaches(caches.id);
                                                        }} type="button" className={store.currentUser.favorites.map(favorite => favorite.cache.id).includes(caches.id) ? "btn btn-outline-danger mx-1 botonBonito" : "btn btn-outline-warning mx-1 botonBonito "} ><i class="fa-solid fa-heart"></i></button>
                                                        {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
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
                        <div className="border border-dark border border-2 rounded registro container my-5">
                            <h2 className="text-center text-danger my-5">Admin Panel</h2>
                            <h2 className="text-center mb-5 text-decoration-underline">Nuevos caches</h2>
                            <div className="container mb-5 mt-3 row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 mx-auto gx-4, gy-4">
                                {pendingCaches <= 0 ?
                                    <h2 className="text-center  mx-auto text-primary "> No tienes nada</h2> :
                                    pendingCaches.map((caches) => {
                                        return (
                                            <div className="">
                                                <div className=" text-center esquinaCarta card " key={caches.id}>
                                                    <img src="https://i.etsystatic.com/17054662/r/il/537ada/3528158523/il_340x270.3528158523_hjw9.jpg" className="imageCard card-img-top " alt="..." />
                                                    <div className="card-body">
                                                        <h3 className="card-title">{caches.comunidad_autonoma}</h3>
                                                        <h4 className="card-title">{caches.provincia}</h4>
                                                        <p className="card-text">{caches.name}</p>
                                                        <button
                                                            className="btn btn-success btn-sm mt-1"
                                                            onClick={(e) => {
                                                                setError(false);
                                                                acceptCache(caches.id);
                                                            }}
                                                        >Aprobar</button>
                                                        <button
                                                            className="btn btn-danger btn-sm mx-1 mt-1"
                                                            onClick={(e) => {
                                                                setError(false);
                                                                declineCache(caches.id);
                                                            }}
                                                        >Rechazar</button>
                                                        <Link to={"/perfil-cache/" + caches.id} className="text-decoration-none" onClick={() => window.scrollTo(0, 0)} >
                                                            <button className="btn btn-primary btn-sm mt-1">Ver Detalles</button>
                                                        </Link>
                                                        {error ? <p className="alert alert-warning mt-2">{error}</p> : null}
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })}
                            </div>
                            <h2 className="text-center mb-5 text-decoration-underline">Comentarios Denunciados</h2>
                            <div className="container mb-5 row row-cols-lg-1 mx-auto gx-3 text-center">
                                {perfilComment <= 0 ?
                                    <h2 className="text-center  mx-auto text-primary "> No tienes nada</h2> :
                                    perfilComment.filter(comment => comment.is_spam).map((comment, i) => {
                                        return (
                                            <div key={i} class=" comentario card my-4">
                                                <div className="  card-body ">
                                                    <div class="d-flex justify-content-center bg-light p-1 py-2">
                                                        <img src={comment.user.profile_image_url ? comment.user.profile_image_url : urlImageSkull} alt="Imagen del usuario" class="bg-light card-img-topcomme img-fluid" />
                                                        <h6 className="my-auto namecomment card-title text-danger fw-bold text">{comment.user.name}</h6>
                                                    </div>

                                                    <div className="m-3" >
                                                        <button type="button" class="btn btn-danger btn-sm mx-1 my-1" onClick={() => deleteComments(comment.id)}>Eliminar Comentario</button>
                                                        <button type="button" class="btn btn-success btn-sm" onClick={() => reportedComments(comment.id)}>Ignorar Denuncia</button>

                                                    </div>
                                                </div>
                                                <div className="card-body mb-4">
                                                    <h3 className="p-2 border border border-2 border border-dark bg-light tamano text-center fs-2 bordecomment">{comment.title}</h3>
                                                    <p className="lh-base p-4 border border border-2 border border-dark bg-light card-text tamanocomentario bordecomment">{comment.text}</p>
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

