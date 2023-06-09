import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import logonuevo from "../../img/logonuevo.png"
import NuevoLogo from "../../img/nuevoLogo.png"
import logoregistro from "../../img/logoregistro.png"
import Mejorlogo from "../../img/mejorlogo.png"



import person from "../../img/person.png"
import { Buscador } from "../component/buscador";
import { element } from "prop-types";



export const NavbarNuevo = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [showSearch, setShowSearch] = useState(false);
    const [showSearchMobile, setShowSearchMobile] = useState(false);
    const offcanvasRef = useRef(null);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const targetSection = urlParams.get('section');
        if (targetSection) {
          scrollToSection(targetSection);
        }
      }, []);
    
      function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    

    const cerrarOffcanvas = () => {
        if (offcanvasRef.current) {
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          if (offcanvas) {
            offcanvas.hide();
          }
        }
      };
    
      const handleShowSearch = (newValue) => {
        setShowSearch(newValue);

    };

    const handleShowSearchMobile = (newValue) => {
        setShowSearchMobile(newValue);
        
    };

   

    const mostrarBuscador = () => {
        setShowSearch(!showSearch);
      
        if (showSearch) {
          window.history.back();
        } else {
          navigate("/demo");
        }
      };

    const mostrarBuscadorMobile = () => {
        setShowSearchMobile(!showSearchMobile);
        if (showSearchMobile) {
            window.history.back();
          } else {
            navigate("/demo");
          }

    };

    const mostrarBuscadorMobileCerrar = () => {
        if (showSearchMobile) {
          window.history.back();
          setShowSearchMobile(false)
          window.scrollTo(0, 0)
        } else {
          null
          window.scrollTo(0, 0)
        }
      };

    return (
        <div className="">

            {store.userActive ? (
                <>
                    <ul className=" container-fluid login mb-5 fixed-top nav justify-content-center p-3 sombrasnabvar border-none ">

                        <div className=" logoxplora navbar-logo col-lg-6 mx-auto  d-none d-lg-block d-md-block">
                            <a href="/demo" onClick={() => window(0, 0)} >
                                <img src={Mejorlogo} alt="Descripción del logo" />
                            </a>
                        </div>

                        <div className="logoxplora navbar-logo mx-auto  d-block d-md-none">
                            <a href="/demo" onClick={() => window(0, 0)}>
                                <img src={Mejorlogo} alt="Descripción del logo" />
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
                        <li className="nav-item dropdown d-none d-lg-block me-4" onClick={() => setShowSearch(false)}>
                            <Link to="/" className=" elemento nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false" onClick={() => setShowSearch(false)}>
                                cachés
                            </Link>
                            <ul className="dropdown-menu "onClick={() => setShowSearch(false)}>
                                <li className="nav-item d-none d-lg-block" onClick={() => setShowSearch(false)}>
                                    <Link to="/tipos-de-caches" className="text-center nav-link active desplegable" onClick={() => {
                                        setShowSearch(false); // Este es el evento original
                                        window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                                    }} aria-current="page">
                                        Tipos de Cachés
                                    </Link>
                                </li>

                                <li className="nav-item d-none d-lg-block" onClick={() => setShowSearch(false)}>
                                    <Link to="/reg_cache" className="text-center nav-link active desplegable" onClick={() => {
                                        setShowSearch(false); // Este es el evento original
                                        window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                                    }} aria-current="page">
                                        Crea tu Caché
                                    </Link>
                                </li>
                            </ul>
                        </li>


                        <div className="dropdown-center ">
                            <button className="btn btn-dark dropdown-toggle d-none d-lg-block btn-sm mt-1 " type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setShowSearch(false)}>
                                <i className="fa-solid fa-user"></i>
                                {store.currentUser.favorites.length === 0 ? null :
                                    <span class=" mt-3 mx-3 position-absolute translate-middle badge rounded-pill bg-danger">
                                        {store.currentUser.favorites.length}+
                                    </span>}
                            </button>

                            <ul className="dropdown-menu" onClick={() => setShowSearch(false)}>

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
                        <li className="nav-item d-none d-lg-block me-3">
                            <Link to="/mi-Perfil" className="nav-link active text-danger" aria-current="page" onClick={() => window(0, 0)}>
                                Hola {store.currentUser.name}
                            </Link>
                        </li>
                        <li className="nav-item d-none d-lg-block me-auto">
                            <button type="button btn-sm mt-1 " className="btn btn-light" onClick={() => { mostrarBuscador() }}><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                        </li>
                        <div className="dropdown-center ">


                            <div className="dropdown-center " onClick={() => setShowSearch(false)}>
                                <button className="btn btn-dark dropdown-toggle d-none d-lg-block btn-sm mt-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-lock"></i>
                                </button>
                                <ul className="dropdown-menu" onClick={() => setShowSearch(false)}>
                                    <Link to="/adm-XP" className="text-decoration-none" onClick={() => window(0, 0)}>
                                        <button className="text-center dropdown-item" href="#">Admin</button>
                                    </Link>
                                </ul>
                            </div>



                        </div>
                        <li className="nav-item d-none d-lg-block ">
                            <Link to="/adm-XP" className="nav-link active text-danger" aria-current="page" onClick={() => window(0, 0)}>
                                Admin
                            </Link>
                        </li>

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
                                <Link to="/?section=history-section" className="elemento nav-link active" aria-current="page" onClick={() => window(0, 0)}>
                                    Historia
                                </Link>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <Link to="/?section=faqs-section" className="elemento nav-link active" aria-current="page" onClick={() => window(0, 0)}>
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
                <Buscador onShowSearchChange={handleShowSearch} cerrarOffcanvas={cerrarOffcanvas} fixed={true} />) : null}

            <div className="container Orbital position-fixed end-0 mx-4 ">
                {store.userActive ? (

                    <a className=" text-danger me-2 btn-secondary btn-floating " data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <i class=" calavera fa-solid fa-skull-crossbones fa-2x "></i>
                    </a>) : (<a className=" text-dark me-2 btn-secondary btn-floating " data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <i class=" calavera fa-solid fa-skull-crossbones fa-2x "></i>
                    </a>)}

                <div class="offcanvas offcanvas-start"  tabindex="-1" id="offcanvasExample"  aria-labelledby="offcanvasExampleLabel" ref={offcanvasRef}>
                    <div className="offcanvas-header">
                        <h5 className=" text-danger offcanvas-title" id="offcanvasExampleLabel">Menú</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={mostrarBuscadorMobileCerrar}></button>
                    </div>
                    <div className="offcanvas-body">
                        {store.userActive ? (
                            <>
                                <button type="button" className="btn btn-light" onClick={mostrarBuscadorMobile}><i class="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                                <a className=" espaciado dropdown-item" href="/demo" onClick={() => window(0, 0)}>Home</a>
                                <a className="espaciado dropdown-item" href="/blog" onClick={() => window(0, 0)} >Blog</a>
                                <a className="espaciado dropdown-item" href="/ranking-usuario" onClick={() => window(0, 0)}>Ranking</a>
                                <a className="espaciado dropdown-item" href="/contact" onClick={() => window(0, 0)}>Contacto</a>

                                <div className=" cacheorbital espaciado dropdown  ">
                                    <p className=" dropdown-toggle" data-bs-toggle="dropdown">
                                        Cachés
                                    </p>
                                    <ul className="dropdown-menu">
                                        <a className="dropdown-item" href="/tipos-de-caches" onClick={() => window(0, 0)}>Tipos de Cachés</a>
                                        <a className="dropdown-item" href="/reg_cache" onClick={() => window(0, 0)}>crear Caché</a>
                                    </ul>
                                </div>
                                <hr className="dropdown-divider" />

                                <a className="espaciado dropdown-item" href="/mi-Perfil" >Mi Perfil
                                    {store.currentUser.favorites.length === 0 ? null :
                                        <span class=" mx-4 mt-1  translate-middle badge rounded-pill bg-danger">
                                            {store.currentUser.favorites.length}+
                                        </span>}</a>
                                <a className="espaciado dropdown-item" href="/adm-XP" >Admin</a>

                                <p className="espaciado cacheespacio nav-item mx-3 text-danger"
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
                                    <Buscador onShowSearchChange={handleShowSearchMobile} cerrarOffcanvas={cerrarOffcanvas}/>) : null}
                            </>) : (<>
                                <a class="espaciado dropdown-item" href="/" onClick={() => window(0, 0)}>Home</a>
                                <a class="espaciado dropdown-item" href="/?section=history-section" onClick={() => window(0, 0)} >Historia</a>
                                <a class="espaciado dropdown-item" href="/?section=faqs-section" onClick={() => window(0, 0)} >Faqs</a>


                                <hr className="dropdown-divider" />
                                <a class="espaciado dropdown-item text-primary" href="/login" onClick={() => window(0, 0)}>Login</a>
                                <a class="espaciado dropdown-item text-success" href="/register" onClick={() => window(0, 0)}>Register</a>
                            </>)}
                    </div>
                </div>

            </div>

        </div>

    );

};