import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import {MapsGooglecopy} from "./component/mapsGooglecopy";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { LoginAdm } from "./pages/loginAdm";
import { Register } from "./pages/register";
import { Cache } from "./pages/regCache"
import { Demo } from "./pages/demo";
import { MiPerfil } from "./pages/miPerfil";
import { PerfilCache } from "./pages/perfilCache";
import { ComoCrearUnCache } from "./pages/comoCrearUnCache";
import { PostGuiaPrincipiantes } from "./pages/postGuiaPrincipiantes";
import { HerramientasBusqueda } from "./pages/herramientasBusqueda";
import { CachesMasImpresionantes } from "./pages/cachesMasImpresionantes";
import { SeguridadBusquedaCaches } from "./pages/seguridadBusquedaCaches";
import { ResolverCaches } from "./pages/resolverCaches";
import { CachesUrbanos } from "./pages/cachesUrbanos";
import { PaginaEnhorabuena } from "./pages/paginaEnhorabuena";
import { AdmPage } from "./pages/admPage";
import {ContactPage } from "./pages/contact";


import { CachesFamilia } from "./pages/cachesFamilia";
import { Blog } from "./pages/blog";
import { TiposDeCaches } from "./pages/tiposDeCaches";
import { CachesUbicacion } from "./pages/cachesUbicacion";
import { CachesSegmentacion } from "./pages/cachesSegmentacion";
import { CachesTamano } from "./pages/cachesTamano";
import { CachesDificultad } from "./pages/cachesDificultad";
import { RankingUser } from "./pages/rankingUser";


import injectContext from "./store/appContext";
import { NavbarNuevo } from "./component/navbarNuevo";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Buscador } from "./component/buscador";
import { CachesSegmentacionProvincias } from "./pages/cachesSegmentacionProvincias";
import { CachesMallorca } from "./pages/cachesMallorca";

import { Contact } from "./pages/contact";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <NavbarNuevo />
          <Routes>
            <Route element={<Demo />} path="/demo" />
            <Route element={<MapsGooglecopy />} path="/Maps" />

            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<LoginAdm />} path="/login-adm" />

            <Route element={<PerfilCache />} path="/perfil-cache/:id" />
            <Route element={<MiPerfil />} path="/mi-Perfil" />
            <Route element={<AdmPage />} path="/adm-XP" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<Register />} path="/register" />
            <Route element={<Cache />} path="/reg_cache" />
            <Route element={<PaginaEnhorabuena />} path="/enhorabuena" />
            <Route element={<PostGuiaPrincipiantes />} path="/como-empezar-a-buscar-caches-Guia-para-principiantes" />
            <Route element={<ComoCrearUnCache />} path="/como-crear-un-cache-Consejos-y-trucos" />
            <Route element={<HerramientasBusqueda />} path="/las-mejores-herramientas-para-la-busqueda-de-caches" />
            <Route element={<CachesMasImpresionantes />} path="/los-caches-mas-impresionantes-y-raros-del-mundo" />
            <Route element={<SeguridadBusquedaCaches />} path="/como-mantenerse-seguro-durante-la-busqueda-de-caches" />
            <Route element={<ResolverCaches />} path="/como-resolver-enigmas-en-caches-consejos-y-trucos" />
            <Route element={<CachesUrbanos />} path="/como-encontrar-caches-en-entornos-urbanos" />
            <Route element={<CachesFamilia />} path="/como-involucrar-a-los-mas-pequenos-en-la-busqueda-de-caches" />
            <Route element={<Blog />} path="/blog" />
            <Route element={<Buscador />} path="/buscador" />
            <Route element={<RankingUser />} path="/ranking-usuario" />
            <Route element={<TiposDeCaches />} path="/tipos-de-caches" />
            <Route element={<CachesUbicacion />} path="/caches-ubicacion"/>
            <Route element={<CachesDificultad />} path="/caches-dificultad"/>
            <Route element={<CachesTamano />} path="/caches-tamano"/>
            <Route element={<CachesSegmentacion />} path="/caches/:tipos"/>
            <Route element={<CachesSegmentacionProvincias />} path="/caches-provincias/:tipos"/>
            <Route element={<CachesMallorca />} path="/caches-palma-de-mallorca/:tipos"/>

            <Route element={<h1>Not found!</h1>} />

          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
