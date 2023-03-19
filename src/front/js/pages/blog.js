import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import "../../styles/clusters.css";



export const Blog = () => {


    const { store, actions } = useContext(Context);

    return (

        <div>
            <div className="card text-bg-dark ">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Wetterstein_mountains_banner.jpg" className="card-img " alt="..." />
                <div className="card-img-overlay align-items-center d-flex">
                    <form className="w-50 m-auto p-0" role="search">
                        <div className="d-flex justify-content-center">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="container">
                <h1 className="text-center mt-4 mb-3">Bienvenido al Blog de Geocaching</h1>
                <p>El geocaching es una actividad al aire libre que consiste en buscar tesoros ocultos (cachés) utilizando dispositivos GPS o aplicaciones móviles. Es una forma emocionante de explorar nuevos lugares, descubrir curiosidades y retar tus habilidades y destrezas. En este blog encontrarás información, consejos, historias y recursos sobre el geocaching, así como una comunidad de aficionados apasionados por esta actividad</p>
            </div>
            <div className="container ">
                <h2 className="text-center mb-3 mt-4">Nuestros Mejores Post sobre la Búsqueda de Cachés</h2>
                <p className="mb-5">Entra en el emocionante mundo del geocaching y conviertete en todo un experto. Descubre todo lo necesario para sacar el máximo jugo a la gran aventura de búsqueda de tesoros alrededor del mundo ¡A disfrutar!.</p>
                <div className="container-fluid mb-5 row row-cols-lg-4 g-3 ">
                    <div className=" card text-bg-dark border-0">
                        <Link to="/como-empezar-a-buscar-caches-Guia-para-principiantes" className="text-decoration-none">
                            <img src="https://document-export.canva.com/ZIOkU/DAE9Y4ZIOkU/1254/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20230217%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230217T111134Z&X-Amz-Expires=33425&X-Amz-Signature=69b830b5fbb12ebeef708317ae2e5e3d4f427d76b98ba1a89d13b21a6639b992&X-Amz-SignedHeaders=host&response-expires=Fri%2C%2017%20Feb%202023%2020%3A28%3A39%20GMT" className="card-img " alt="..." />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center opacity-75 px-0 ">
                                <h5 className=" cluster card-title bg-light text-dark py-2 w-100 text-center ">Guía para Principiantes</h5>
                            </div>
                        </Link>
                    </div>
                    <div className=" card text-bg-dark border-0">
                        <Link to="/como-involucrar-a-los-mas-pequenos-en-la-busqueda-de-caches" className="text-decoration-none">
                            <img src="https://media-private.canva.com/tSuRI/MAFa2-tSuRI/1/tl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230217%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230217T070650Z&X-Amz-Expires=62733&X-Amz-Signature=f93289e34f1debbebe68b72171202212bc9981dfce1a25e2fe144dfb0ac01313&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2018%20Feb%202023%2000%3A32%3A23%20GMT" className="card-img  " alt="..." />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center opacity-75 px-0 ">
                                <h5 className=" cluster card-title bg-light text-dark py-2 w-100 text-center ">Aventura en familia</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col card text-bg-dark border-0">
                        <Link to="/como-crear-un-cache-Consejos-y-trucos" className="text-decoration-none">
                            <img src="https://media-private.canva.com/v-8t4/MAFa23v-8t4/1/tl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230217%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230217T034059Z&X-Amz-Expires=74033&X-Amz-Signature=fddf342537e3b481fc273f8f51346b758b32a92cb83c4006c4818dfd0764d415&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2018%20Feb%202023%2000%3A14%3A52%20GMT" className="card-img border " alt="..." />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center opacity-75 px-0">
                                <h5 className="cluster card-title bg-light text-dark py-2 w-100 text-center ">Cómo crear un caché</h5>
                            </div>
                        </Link>
                    </div>
                    <div className=" card text-bg-dark border-0">
                        <Link to="/las-mejores-herramientas-para-la-busqueda-de-caches" className="text-decoration-none">
                            <img src="https://media-private.canva.com/e-ouo/MAFa2ze-ouo/1/tl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230217%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230217T115135Z&X-Amz-Expires=43609&X-Amz-Signature=55337d67cbb73257f8b27e048c02c749e6aac3387b1b897acdef3f8517fbdea4&X-Amz-SignedHeaders=host&response-expires=Fri%2C%2017%20Feb%202023%2023%3A58%3A24%20GMT" className="card-img border " alt="..." />
                            <div className=" card-img-overlay d-flex align-items-center justify-content-center opacity-75 px-0">
                                <h5 className="cluster card-title bg-light text-dark py-2 w-100  text-center" >Mejores herramientas</h5>
                            </div>
                        </Link>
                    </div>
                    <div className=" card text-bg-dark border-0">
                        <Link to="/los-caches-mas-impresionantes-y-raros-del-mundo" className="text-decoration-none">
                            <img src="https://media-private.canva.com/qFRJ8/MAFa2_qFRJ8/1/tl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230217%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230217T180700Z&X-Amz-Expires=20604&X-Amz-Signature=93a8852f91a80b5d704d8d8041d64650038fca4fcc7ae1d05b7216a4ae28a9e4&X-Amz-SignedHeaders=host&response-expires=Fri%2C%2017%20Feb%202023%2023%3A50%3A24%20GMT" className="card-img border" alt="..." />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center opacity-75 px-0 ">
                                <h5 className=" cluster card-title bg-light text-dark py-2 w-100 text-center ">Cachés más raros</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col card text-bg-dark border-0">
                        <Link to="/como-mantenerse-seguro-durante-la-busqueda-de-caches" className="text-decoration-none">
                            <img src="https://media-private.canva.com/5sbow/MAFa255sbow/1/tl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230216%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230216T234929Z&X-Amz-Expires=88452&X-Amz-Signature=426026029dbfbc19f39fb8af6ef8a2e47e9a02b421ae5187fc9a2dc6b424c532&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2018%20Feb%202023%2000%3A23%3A41%20GMT" className="card-img " alt="..." />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center opacity-75 px-0">
                                <h5 className=" cluster card-title bg-light text-dark py-2 w-100 text-center ">Peligros de la Búsqueda</h5>
                            </div>
                        </Link>
                    </div>
                    <div className=" card text-bg-dark border-0">
                        <Link to="/como-resolver-enigmas-en-caches-consejos-y-trucos" className="text-decoration-none">
                            <img src="https://media-private.canva.com/KK1mU/MAFa21KK1mU/1/tl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230217%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230217T001801Z&X-Amz-Expires=87009&X-Amz-Signature=31d806d20e66976923d30c6c66185e2a34a5e594159c407910e89af27848c8c8&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2018%20Feb%202023%2000%3A28%3A10%20GMT" className="card-img" alt="..." />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center opacity-75 px-0 ">
                                <h5 className=" cluster card-title bg-light text-dark py-2 w-100 text-center ">Cómo Resolver cachés</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col card text-bg-dark border-0">
                        <Link to="/como-encontrar-caches-en-entornos-urbanos" className="text-decoration-none">
                            <img src="https://media-private.canva.com/R6gik/MAFa2wR6gik/1/tl.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20230217%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230217T040615Z&X-Amz-Expires=73967&X-Amz-Signature=46899627e2b22579e3dbdb73b0394b01744786dea6b321586565c5195483f63f&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2018%20Feb%202023%2000%3A39%3A02%20GMT" className="card-img" alt="..." />
                            <div className="card-img-overlay d-flex align-items-center justify-content-center opacity-75 px-0">
                                <h5 className=" cluster card-title bg-light text-dark py-2 w-100 text-center ">Buscar cachés urbanos</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>







        </div>
    );
}