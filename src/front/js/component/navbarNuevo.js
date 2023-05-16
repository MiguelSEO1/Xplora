import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import logonuevo from "../../img/logonuevo.png"
import NuevoLogo from "../../img/nuevoLogo.png"
import logoregistro from "../../img/logoregistro.png"



import person from "../../img/person.png"
import { Buscador } from "../component/buscador";



export const NavbarNuevo = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [showSearch, setShowSearch] = useState(false);
    const [showSearchMobile, setShowSearchMobile] = useState(false);




    const mostrarBuscador = () => {
        setShowSearch(!showSearch);

    };

    const mostrarBuscadorMobile = () => {
        setShowSearchMobile(!showSearchMobile);

    };

    return (
        <div className="">

            {store.userActive ? (
                <>
                    <ul className=" container-fluid login mb-5 fixed-top nav justify-content-center p-3 sombrasnabvar border-none ">

                        <div className=" navbar-logo col-lg-6 mx-auto me-auto d-none d-lg-block d-md-block">
                            <a href="/demo" onClick={() => window(0, 0)} >
                                <img src={logoregistro} alt="Descripción del logo" />
                            </a>
                        </div>

                        <div className=" navbar-logo mx-auto pe-4 d-block d-md-none">
                            <a href="/demo" onClick={() => window(0, 0)}>
                                <img src={logoregistro} alt="Descripción del logo" />
                            </a>
                        </div>
                        <li className="nav-item d-none d-lg-block">
                            <Link to="/demo" className="elemento nav-link active" onClick={() => {
                                setShowSearch(false); // Este es el evento original
                                window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                            }} aria-current="page">
                                Home
                            </Link>
                        </li>
                        
                        <li className="nav-item d-none d-lg-block">
                            <Link to="/blog" className="elemento nav-link active" onClick={() => {
                                setShowSearch(false); // Este es el evento original
                                window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                            }} aria-current="page">
                                Blog
                            </Link>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <Link to="/ranking-usuario" className="elemento nav-link active" onClick={() => {
                                setShowSearch(false); // Este es el evento original
                                window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                            }} aria-current="page">
                                Ranking
                            </Link>
                        </li>
                        <li className="nav-item dropdown d-none d-lg-block" onClick={() => setShowSearch(false)}>
                            <Link to="/" className=" elemento nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                cachés
                            </Link>
                            <ul className="dropdown-menu ">
                                <li className="nav-item d-none d-lg-block">
                                    <Link to="/tipos-de-caches" className="text-center nav-link active desplegable" onClick={() => {
                                        setShowSearch(false); // Este es el evento original
                                        window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                                    }} aria-current="page">
                                        Tipos de Cachés
                                    </Link>
                                </li>

                                <li className="nav-item d-none d-lg-block">
                                    <Link to="/reg_cache" className="text-center nav-link active desplegable" onClick={() => {
                                        setShowSearch(false); // Este es el evento original
                                        window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                                    }} aria-current="page">
                                        Crea tu Caché
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item d-none d-lg-block">
                            <Link to="/contact" className="elemento nav-link active" onClick={() => {
                                setShowSearch(false); // Este es el evento original
                                window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                            }} aria-current="page">
                                Contacto
                            </Link>
                        </li>
                        
                        <div className="dropdown-center ">
                            <button className="btn btn-dark dropdown-toggle d-none d-lg-block btn-sm mt-1 mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-user"></i>
                                {store.currentUser.favorites.length === 0 ? null :
                                    <span class=" mt-3 mx-3 position-absolute translate-middle badge rounded-pill bg-danger">
                                        {store.currentUser.favorites.length}+
                                    </span>}
                            </button>

                            <ul className="dropdown-menu">

                                <Link to="/mi-Perfil" className="text-decoration-none" onClick={() => window(0, 0)}>
                                    <button className="text-center dropdown-item" href="#">Mi perfil</button>
                                </Link>

                                <button
                                    className="text-center dropdown-item nav-item me-1 text-danger text-aling"
                                    onClick={async () => {
                                        if (await actions.logout()) {
                                            navigate("/");
                                            window.scrollTo(0, 0);
                                        }
                                    }}>Logout</button>


                            </ul>
                        </div>
                        <li className="nav-item d-none d-lg-block ">
                            <Link to="/mi-Perfil" className="nav-link active text-danger" aria-current="page" onClick={() => window(0, 0)}>
                                Hola {store.currentUser.name}
                            </Link>
                        </li>
                        <li className="nav-item d-none d-lg-block me-auto">
                            <button type="button btn-sm mt-1 " className="btn btn-light" onClick={() => { mostrarBuscador(); window(0, 0) }}><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                        </li>
                        <div className="dropdown-center ">


                            <div className="dropdown-center ">
                                <button className="btn btn-dark dropdown-toggle d-none d-lg-block btn-sm mt-1 mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-lock"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <Link to="/adm-XP" className="text-decoration-none" onClick={() => window(0, 0)}>
                                        <button className="text-center dropdown-item" href="#">Admin</button>
                                    </Link>
                                </ul>
                            </div>


                        </div>
                        
                    </ul>
                </>
            ) : (
                <>
                    <ul className=" navbar nav p-3 ">

                        <div className=" navbar-logo mx-lg-5 mx-md-auto d-none d-lg-block d-md-block">
                            <a href="/" onClick={() => window(0, 0)}>
                                <img src={NuevoLogo} alt="Descripción del logo" />
                            </a>
                        </div>
                        <div className="  logo navbar-logo mx-auto pe-4 d-block d-md-none">
                            <a href="/" onClick={() => window(0, 0)} >
                                <img src={NuevoLogo} alt="Descripción del logo" />
                            </a>
                        </div>
                        <div className=" d-lg-flex me-lg-5 d-none d-lg-block">
                            <li className="nav-item d-none d-lg-block">
                                <Link to="/" className="elemento nav-link active" aria-current="page" onClick={() => window(0, 0)}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <Link to="#historia" className="elemento nav-link active" aria-current="page" onClick={() => window(0, 0)}>
                                    Historia
                                </Link>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <Link to="#faqs" className="elemento nav-link active" aria-current="page" onClick={() => window(0, 0)}>
                                    Faqs
                                </Link>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <Link to="/login" className=" elemento altaLogin nav-link active" aria-current="page" onClick={() => window(0, 0)}>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <Link to="/register" className="elemento altaRegister nav-link active" aria-current="page" onClick={() => window(0, 0)}>
                                    Register
                                </Link>
                            </li>
                        </div>

                    </ul>
                </>
            )}




            {showSearch ? (
                <Buscador />) : null}

            <div className="container Orbital position-fixed end-0 mx-4 ">
                {store.userActive ? (

                    <a className=" text-danger me-2 btn-secondary btn-floating " data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <i class=" calavera fa-solid fa-skull-crossbones fa-2x "></i>
                    </a>) : (<a className=" text-dark me-2 btn-secondary btn-floating " data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <i class=" calavera fa-solid fa-skull-crossbones fa-2x "></i>
                    </a>)}

                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menú</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        {store.userActive ? (
                            <>
                                <button type="button" className="btn btn-light" onClick={mostrarBuscadorMobile}><i class="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                                <a className="dropdown-item" href="/demo" onClick={() => window(0, 0)}>Home</a>
                                <a className="dropdown-item" href="/blog" onClick={() => window(0, 0)} >Blog</a>
                                <a className="dropdown-item" href="/blog" onClick={() => window(0, 0)}>Faqs</a>
                                <div className="dropdown  mx-2">
                                    <p className="p-2 dropdown-toggle" data-bs-toggle="dropdown">
                                        Cachés
                                    </p>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="/tipos-de-caches" onClick={() => window(0, 0)}>Tipos de Cachés</a>
                                        <a className="dropdown-item" href="/reg_cache" onClick={() => window(0, 0)}>crear Caché</a>
                                    </ul>
                                </div>
                                <hr className="dropdown-divider" />

                                <a className="dropdown-item" href="/mi-Perfil" >Mi Perfil
                                    {store.currentUser.favorites.length === 0 ? null :
                                        <span class=" mx-4 mt-1  translate-middle badge rounded-pill bg-danger">
                                            {store.currentUser.favorites.length}+
                                        </span>}</a>
                                <p className="nav-item mx-3 text-danger"
                                    onClick={async () => {
                                        if (await actions.logout()) {
                                            navigate("/");
                                            window.scrollTo(0, 0);
                                        }
                                    }}
                                >
                                    Logout
                                </p>

                                {showSearchMobile ? (
                                    <Buscador />) : null}
                            </>) : (<>
                                <a class="dropdown-item" href="/" onClick={() => window(0, 0)}>Home</a>
                                <a class="dropdown-item" href="/" onClick={() => window(0, 0)} >Historia</a>
                                <a class="dropdown-item" href="/" onClick={() => window(0, 0)} >Faqs</a>

                                <hr className="dropdown-divider" />
                                <a class="dropdown-item text-primary" href="/login" onClick={() => window(0, 0)}>Login</a>
                                <a class="dropdown-item text-success" href="/register" onClick={() => window(0, 0)}>Register</a>
                            </>)}
                    </div>
                </div>

            </div>

        </div>

    );

};