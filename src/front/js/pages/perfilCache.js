import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import Comentario from "../../img/comentario.png";
import QRCode from "react-qr-code";
import Mapa from "../../img/mapa.png"


export const PerfilCache = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);

    const [selectedDiv1, setSelectedDiv1] = useState(true);
    const [selectedDiv2, setSelectedDiv2] = useState(false);
    const [selectedDiv3, setSelectedDiv3] = useState(false);
    const [selectedDiv4, setSelectedDiv4] = useState(false);
    const [selectedDiv5, setSelectedDiv5] = useState(false);
    const [perfilDetails, setPerfilDetails] = useState({});

    useEffect(() => {
        getDetails()
    }, [])

    const getDetails = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/perfil-cache/" + params.id);
        const data = await response.json();
        const qrCodeData = atob(data.qr_code);
        const qrCodeBlob = new Blob([new Uint8Array(qrCodeData.split('').map(char => char.charCodeAt(0)))], { type: 'image/png' });
        const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
        setPerfilDetails({ ...data, qr_code_url: qrCodeUrl });
        console.log(data)
    }


    const mostrarDatosCache = () => {
        setSelectedDiv1(true);
        setSelectedDiv2(false);
        setSelectedDiv3(false);
        setSelectedDiv4(false);
        setSelectedDiv5(false);
    };

    const mostrarComentariosCache = () => {
        setSelectedDiv1(false);
        setSelectedDiv2(false);
        setSelectedDiv3(false);
        setSelectedDiv4(true);
        setSelectedDiv5(false);
    };

    const mostrarHallazgoCache = () => {
        setSelectedDiv1(false);
        setSelectedDiv2(false);
        setSelectedDiv3(true);
        setSelectedDiv4(false);
        setSelectedDiv5(false);
    };

    const mostrarComentarios = () => {
        setSelectedDiv1(false);
        setSelectedDiv2(false);
        setSelectedDiv3(false);
        setSelectedDiv4(true);
        setSelectedDiv5(false);
    };

    const mostrarFotosCache = () => {
        setSelectedDiv1(false);
        setSelectedDiv2(false);
        setSelectedDiv3(false);
        setSelectedDiv4(false);
        setSelectedDiv5(true);
    };


    return (

        <div className="container">
            <div className="row ">
                <div >
                    <div className="btn-group container my-5" aria-label="Basic checkbox toggle button group" >
                        <label className="btn btn-outline-primary mx-auto " onClick={mostrarDatosCache}>Información Caché</label>
                        <label className="btn btn-outline-primary mx-auto " onClick={mostrarComentariosCache}> Comentarios y Fotos</label>
                        <label className="btn btn-outline-primary mx-auto " onClick={mostrarHallazgoCache}> Registra Tu Hallazgo</label>
                    </div>
                </div>



                <div >
                    {selectedDiv1 ? (
                        <div className="container-fluid row" >
                            <h2 className="text-center mt-2">Datos Caché {perfilDetails.name}</h2>
                            <div className="col-4" >
                                <h3 className="text-start mb-5 mt-5 text-decoration-underline align-items-start ">Ubicación</h3>
                                <img className="img-fluid rounded mx-auto d-block d-flex align-items-center" src={Mapa} alt="..." />

                            </div>

                            <div className="col-8" >
                                <h3 className="text-start mb-5 mt-5 text-decoration-underline">Información</h3>
                                <ul className="list-group mb-5">
                                    <li className="list-group-item list-group-item-warning"><strong>Nombre:</strong> {perfilDetails.name}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>Coordenadas:</strong> {perfilDetails.coordinates_x}/ {perfilDetails.coordinates_y} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>Country:</strong> {perfilDetails.country}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>State:</strong> {perfilDetails.state}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>City:</strong> {perfilDetails.city}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>difficulty:</strong> {perfilDetails.difficulty} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>Size:</strong> {perfilDetails.size} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>Description:</strong> {perfilDetails.description}</li>
                                    <li className="list-group-item"><strong>QR Code:</strong> <img src={perfilDetails.qr_code_url} width="200" alt="QR code" /></li>

                                </ul>
                            </div>
                        </div>

                    ) : null}
                    {selectedDiv2 ? (
                        <div className="container-fluid ">
                            <h2 className="text-center mb-5 mt-5">Comentarios y Fotos de Caché</h2>
                            <div className="text-center mb-5 mt-5 mb-3">
                                <div >
                                    <div className="" aria-label="Basic checkbox toggle button group g-0" >
                                        <button type="button " className="btn btn-outline-dark mx-1" onClick={mostrarComentarios}>Comentarios <i className="fa-solid fa-comment"></i></button>
                                        <button type="button " className="btn btn-outline-dark" onClick={mostrarFotosCache}>Fotos <i className="fa-solid fa-image"></i></button>
                                    </div>
                                </div>

                            </div>
                            <nav aria-label="Page navigation example mt-5" >
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled" >
                                        <a className="page-link">Previous</a>
                                    </li>
                                    <li className="page-item " ><a className="page-link" href="#">1</a></li>
                                    <li className="page-item "><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    ) : null}
                    {selectedDiv3 ? (
                        <div className="container">
                            <h2 className="text-center my-3">Registra Hallazgo de este Caché</h2>
                            <div className="row">
                                <div className="mb-3">
                                    <input className="form-control text-dark bg-opacity-10 border border-danger" type="text" value={`Caché ${perfilDetails.name}`} aria-label="Disabled input example" disabled readonly />
                                </div>
                                <div className="">
                                    <textarea className="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlTextarea1" placeholder="Describe tu hallazgo" rows="3"></textarea>
                                </div>
                                <div className="mt-3">
                                    <input className="form-control p-2 text-dark bg-opacity-10 border border-danger" type="file" id="formFileMultiple" multiple />
                                </div>
                                <div className="text-center">
                                    <div className="text-center my-4">
                                        <Link to="/enhorabuena">
                                            <button type="button " className="btn btn-danger">Registrar el hallazgo de este Caché <i className="fa-regular fa-star"></i></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {selectedDiv4 ? (

                        <div className="container">
                            <div className="text-center mb-5 mt-5 ">
                                <div className="" aria-label="Basic checkbox toggle button group" >
                                    <button type="button " className="btn btn-outline-dark mx-1" onClick={mostrarComentarios}>Comentarios <i className="fa-solid fa-comment"></i></button>
                                    <button type="button " className="btn btn-outline-dark" onClick={mostrarFotosCache}>Fotos <i className="fa-solid fa-image"></i></button>
                                </div>
                            </div>
                            <h2 className="text-center my-3">Deja tu Comentario</h2>
                            <div className="container">

                                <div className="my-3">
                                    <textarea className="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlTextarea1" placeholder="Dejar Comentario" rows="3"></textarea>
                                </div>
                                <div className=" d-flex justify-content-end my-2">
                                    <button type="button" className="btn btn-primary btn-sm mx-1">Enviar</button>
                                    <button type="button" className="btn btn-danger btn-sm">Cancelar</button>
                                </div>
                            </div>
                            <img src={Comentario} className="card-img-top mb-3" alt="..." />

                            <nav aria-label="Page navigation example mt-5" >
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled" >
                                        <a className="page-link">Previous</a>
                                    </li>
                                    <li className="page-item " ><a className="page-link" href="#">1</a></li>
                                    <li className="page-item "><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    ) : null}
                    {selectedDiv5 ? (
                        <div className="container-fluid">
                            <div className="text-center mb-5 mt-5 ">
                                <div className="" aria-label="Basic checkbox toggle button group" >
                                    <button type="button " className="btn btn-outline-dark mx-1" onClick={mostrarComentarios}>Comentarios <i className="fa-solid fa-comment"></i></button>
                                    <button type="button " className="btn btn-outline-dark" onClick={mostrarFotosCache}>Fotos <i className="fa-solid fa-image"></i></button>
                                </div>
                            </div>
                            <h2 className="text-center mb-5 mt-5">Galeria de fotos</h2>
                            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 mb-3">
                            </div>
                            <nav aria-label="Page navigation example mt-5" >
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled" >
                                        <a className="page-link">Previous</a>
                                    </li>
                                    <li className="page-item " ><a className="page-link" href="#">1</a></li>
                                    <li className="page-item "><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>

    );
}