import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import Skull from "../../img/skull.svg";
import QRCode from "react-qr-code";
import Mapa from "../../img/mapa.png"
import { UploadImage } from "../component/upload";
import { EditComment } from "../component/editComment";
import { MapsGooglecopy } from "../component/mapsGooglecopy";

export const PerfilCache = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [files, setFiles] = useState(null)
    const [urlImage, seturlImage] = useState("https://thumbs.dreamstime.com/b/cr%C3%A1neo-e-icono-de-la-bandera-pirata-aislado-50307817.jpg");
    const [urlImagePhoto, seturlImagePhoto] = useState("https://img.freepik.com/vector-gratis/plantilla-etiqueta-cofre-tesoro-cerrado-aislado_1308-61882.jpg");
    const [selectedDiv1, setSelectedDiv1] = useState(true);
    const [selectedDiv2, setSelectedDiv2] = useState(false);
    const [selectedDiv3, setSelectedDiv3] = useState(false);
    const [selectedDiv4, setSelectedDiv4] = useState(false);
    const [selectedDiv5, setSelectedDiv5] = useState(false);
    const [perfilDetails, setPerfilDetails] = useState({});
    const [perfilComment, setPerfilComment] = useState({});
    const [perfilImages, setPerfilImages] = useState({});
    const [data, setData] = useState({});
    const [comment, setComment] = useState({ title: "", text: "" });
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [galery, setGalery] = useState({ id: params.id, title: "", url: "", date_of_Publication: "" });
    const [updatedComment, setUpdatedComment] = useState({ title: "", text: "" });
    const [alertMessage, setAlertMessage] = useState("");
    const [alertMessageFotos, setAlertMessageFotos] = useState("");
    const [alertMessageEdit, setAlertMessageEdits] = useState("");
    const [shouldCloseModal, setShouldCloseModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [mostrarQr, setMostrarQR] = useState(false);
    const [mostrarBotonRegister, setMostrarBotonRegister] = useState(false);
    const [alertBotonRegister, setAlertBotonRegister] = useState("");
    const [alertQr, setAlertQR] = useState("");
    const [alertReport, setAlertReport] = useState(false);
    const [cacheClave, setCacheClave] = useState("");
    const [secretClave, setSecretClave] = useState("");
    const [cacheFound, setCacheFound] = useState({});



    useEffect(() => {
        getDetails();
        getCacheComments();
        getCacheImages();

    }, []);

    const showQR = (e) => {
        e.preventDefault();

        if (cacheClave === perfilDetails.cache_password) {
            setMostrarQR(true);
            setAlertQR(null);
        } else {
            setAlertQR("clave invalida");
            setMostrarQR(false);
            setAlertBotonRegister(null);
            setMostrarBotonRegister(false);
        }
    };

    const showRegisterBoton = (e) => {
        e.preventDefault();

        if (secretClave === perfilDetails.secret_password) {
            setMostrarBotonRegister(true);
            setAlertBotonRegister(null);
        } else {
            setAlertBotonRegister("clave Secreta invalida");
            setMostrarBotonRegister(false);
        }
    };


    const getCacheComments = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/perfil-cache-comments/" + params.id)
        const data = await response.json();
        setPerfilComment(data)
    };

    const getCacheImages = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/perfil-cache-images/" + params.id)
        const data = await response.json();
        setPerfilImages(data)
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




    const getDetails = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/perfil-cache/" + params.id)
        const data = await response.json();
        const qrCodeData = atob(data.qr_code);
        const qrCodeBlob = new Blob([new Uint8Array(qrCodeData.split('').map(char => char.charCodeAt(0)))], { type: 'image/png' });
        const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
        setPerfilDetails({ ...data, qr_code_url: qrCodeUrl });
    };



    const createComments = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/perfil-comments/" + params.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),

            },
            body: JSON.stringify(comment),
        });

        if (response.ok) {
            getCacheComments();
        }
    };

    const addUserFoundCache = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/add-found-cache/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                id: id,
            }),
        });

        if (response.ok) {
            console.log("Cache encontrado añadido correctamente");
        } else {
            console.error("Error al añadir el cache encontrado");
        }
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
            getCacheComments();
        }

    };


    const editComments = async (id, updatedComment) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/update-comments", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                id: id,
                updatedComment: updatedComment
            })
        });

        if (response.ok) {
            getCacheComments();
        }
    };



    const deleteImages = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + "/api/delete-image", {
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
            getCacheImages();
        }

    };


    const uploadImage = async () => {
        console.log("This are the files", files);

        let body = new FormData();
        body.append("profile_image", files[0]);
        body.append("galery", JSON.stringify(galery))
        await actions.uploadImageCache(body)
        setFiles(null)
        setGalery({ id: params.id, title: "", url: "", date_of_Publication: "" })
        await getCacheImages(); // llamada a la función getCacheImages después de uploadImage

    };

    const handleHover = (index) => {
        setSelectedImageIndex(index);
        setShowCloseButton(true)


    };


    const closedHover = () => {
        setSelectedImageIndex(null);
        setShowCloseButton(false)
    };



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

        <div className=" container cuerpo">
            <div className="row ">
                <div >
                    <div className="col-lg-12 col-md-12 mb-3">
                        <h1 className=" text-center mt-2 align-self-start">Datos Caché "{perfilDetails.name}"</h1>
                    </div>
                    <div className="btn-group container my-5" aria-label="Basic checkbox toggle button group" >
                        <label className="colorgradiente btn btn-outline-dark mx-auto " onClick={mostrarDatosCache}>Información Caché</label>
                        <label className="colorgradiente btn btn-outline-dark mx-auto " onClick={mostrarComentariosCache}> Comentarios y Fotos</label>
                        <label className=" colorgradiente btn btn-outline-dark mx-auto " onClick={mostrarHallazgoCache}> Registra Tu Hallazgo</label>
                    </div>
                </div>



                <div >
                    {selectedDiv1 ? (


                        <div className=" container mx-auto row row-cols-lg-2 row-cols-md-1 row-cols-sm-1 mt-5" >

                            <div className="   " >
                                <h2 className=" h2map text-start text-danger text-decoration-underline my-auto ">Ubicación</h2>
                                <MapsGooglecopy setData={setData} />
                            </div>

                            <div className=" " >

                                <h2 className="h2map infocache text-start text-danger mb-5 text-decoration-underline my-auto">Información</h2>
                                <ul className="infocachecaja list-group mb-5 ">
                                    <li className="list-group-item list-group-item-warning"><strong>Nombre:</strong> {perfilDetails.name}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>Coordenadas:</strong> {perfilDetails.coordinates_x}/ {perfilDetails.coordinates_y} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>País:</strong> {perfilDetails.country}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>C. Autónoma:</strong> {perfilDetails.comunidad_autonoma}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>Provincia:</strong> {perfilDetails.provincia}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>Dificultad:</strong> {perfilDetails.difficulty} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>Tamaño:</strong> {perfilDetails.size} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>Descripción:</strong> {perfilDetails.description}</li>

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
                                        <button type="button " className="btn btn-dark mx-1" onClick={mostrarComentarios}>Comentarios <i className="fa-solid fa-comment"></i></button>
                                        <button type="button " className=" btn btn-dark-dark" onClick={mostrarFotosCache}>Fotos <i className="fa-solid fa-image"></i></button>
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
                        <div className="container text-center">
                            <h2 className="text-center my-3">Registra Hallazgo de este Caché</h2>
                            <p className=" font-monospace text-center mb-4"> <i className=" text-danger fa-solid fa-book-skull fa-2x"></i>   PASO 1- Si has hallado el Caché "{perfilDetails.name}" introduce aquí la CLAVE SECRETA que has encontrado en el mismo. </p>
                            <form onSubmit={showQR}>
                                <input
                                    type="password"
                                    className="imputhallazgo w-50 mx-auto form-control mb-3 border border-dark border border-2 bordecomment bg-dark text-white"
                                    placeholder="Introduzca la clave"
                                    value={cacheClave}
                                    onChange={(e) => setCacheClave(e.target.value)}
                                />
                                <button type="submit" className="  btn btn-dark my-3">
                                    Validar clave
                                </button>
                            </form>
                            {mostrarQr ?
                                <div>
                                    <img src={perfilDetails.qr_code_url} width="300" height="auto" alt="QR code" />
                                    <p className="font-monospace text-center mb-4"> <i class="text-primary fa-solid fa-gem fa-2x"></i> PASO 2. Escanea el QR y optén la Clave definitiva para REGISTRAR TU HALLAZGO</p>

                                    <form onSubmit={showRegisterBoton}>
                                        <input
                                            type="password"
                                            className="imputhallazgo w-50 mx-auto form-control mb-3 border-dark border border-2 bordecomment bg-dark text-white"
                                            placeholder="clave SECRETA"
                                            value={secretClave}
                                            onChange={(e) => setSecretClave(e.target.value)}
                                        />
                                        <button type="submit" className="btn btn-primary my-3">
                                            Validar clave
                                        </button>
                                    </form>
                                </div>

                                : null
                            }
                            {alertQr ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertQr}
                                </div>
                            ) : null}


                            {mostrarBotonRegister ?
                                <div>
                                    <div className="text-center my-4">
                                        <p className="font-monospace text-center mb-4"> <i class=" text-warning fa-sharp fa-regular fa-hand-peace fa-2x"></i> PASO 3. Ya puedes Registrar el Hallazgo de tu Tesoro </p>
                                        <button type="submit" className="btn btn-danger my-3" onClick={() => {
                                            addUserCache(caches.id)
                                        }}>Registrar el hallazgo de este Caché <i className="text-warning fa-regular fa-star"></i></button>
                                    </div>
                                </div>
                                : null
                            }
                            {alertBotonRegister ? (
                                <div className="mb-3 label alert alert-danger" role="alert">
                                    {alertBotonRegister}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                    {selectedDiv4 ? (

                        <div className="container">
                            <div className="text-center mb-5 mt-5 ">
                                <div className="" aria-label="Basic checkbox toggle button group" >
                                    <button type="button " className="btn btn-dark mx-1" onClick={mostrarComentarios}>Comentarios <i className="fa-solid fa-comment"></i></button>
                                    <button type="button " className="btn btn-dark" onClick={mostrarFotosCache}>Fotos <i className="fa-solid fa-image"></i></button>
                                </div>
                            </div>
                            <h2 className="text-center mb-5 mt-5">Sección de Comentarios</h2>
                            <div className=" cajacomentario container border mb-4 mt-4 ">
                                <h2 className="text-center text-danger my-5 text-decoration-underline">Deja tu Comentario</h2>
                                <div className="mb-3 mt-5 text-center">
                                    <label className="mb-2 fw-bold" htmlFor="formFileMultiple">Selecciona un Título:</label>
                                    <input name="title" value={comment.title} onChange={(e) => {
                                        setComment({ ...comment, [e.target.name]: e.target.value });
                                        setAlertMessage(false);
                                    }}
                                        onKeyDown={async (e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (comment.title.trim().length > 0 && comment.text.trim().length > 0) {
                                                    await createComments();
                                                    setComment({ title: "", text: "" });
                                                } else if (comment.title.trim().length === 0 && comment.text.trim().length === 0) {
                                                    setAlertMessage("Por favor, completa ambos campos antes de enviar tu comentario.");
                                                } else if (comment.title.trim().length === 0) {
                                                    setAlertMessage("Por favor, completa el campo del título antes de enviar tu comentario.");
                                                } else if (comment.text.trim().length === 0) {
                                                    setAlertMessage("Por favor, completa el campo del comentario antes de enviar tu comentario.");
                                                }
                                            }
                                        }} type="email" class="form-control bg-light p-2 text-dark  border border-dark border border-2 bordecomment" id="exampleFormControlInput1" />
                                </div>

                                <div className="my-3 text-center">
                                    <label className="mb-2 fw-bold" htmlFor="formFileMultiple">Deja tu Comentario:</label>
                                    <textarea name="text" value={comment.text} onChange={(e) => {
                                        setComment({ ...comment, [e.target.name]: e.target.value });
                                        setAlertMessage(false);
                                    }}
                                        onKeyDown={async (e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (comment.title.trim().length > 0 && comment.text.trim().length > 0) {
                                                    await createComments();
                                                    setComment({ title: "", text: "" });
                                                    setAlertMessage(false);
                                                } else if (comment.title.trim().length === 0 && comment.text.trim().length === 0) {
                                                    setAlertMessage("Por favor, completa ambos campos antes de enviar tu comentario.");
                                                } else if (comment.title.trim().length === 0) {
                                                    setAlertMessage("Por favor, completa el campo del título antes de enviar tu comentario.");
                                                } else if (comment.text.trim().length === 0) {
                                                    setAlertMessage("Por favor, completa el campo del comentario antes de enviar tu comentario.");
                                                }
                                            }
                                        }} className="form-control bg-light  p-2 text-dark  border border-dark border border-2 bordecomment" id="exampleFormControlTextarea1" rows="3" ></textarea>
                                </div>
                                {alertMessage ? (
                                    <div className="alert alert-danger" role="alert">
                                        {alertMessage}
                                    </div>
                                ) : null}
                                <div className=" d-flex justify-content-end mt-2 mb-5">
                                    <button type="button" class="btn btn-dark btn-sm mx-1" onClick={async () => {
                                        if (comment.title.trim().length > 0 && comment.text.trim().length > 0) {
                                            await createComments();
                                            setComment({ title: "", text: "" });
                                        } else if (comment.title.trim().length === 0 && comment.text.trim().length === 0) {
                                            setAlertMessage("Por favor, completa ambos campos antes de enviar tu comentario.");
                                        } else if (comment.title.trim().length === 0) {
                                            setAlertMessage("Por favor, completa el campo del título antes de enviar tu comentario.");
                                        } else if (comment.text.trim().length === 0) {
                                            setAlertMessage("Por favor, completa el campo del comentario antes de enviar tu comentario.");
                                        }
                                    }}>Enviar</button>
                                    <button type="button" class="btn btn-danger btn-sm mx-1" onClick={async () => {
                                        setComment({ title: "", text: "" });
                                        setAlertMessage(false);

                                    }}>Cancelar</button>
                                </div>
                            </div>

                            {perfilComment.map((comment) => {
                                return <div key={comment.id} class=" comentario card my-4">
                                    <div className="  card-body ">
                                        <div class="d-flex justify-content-center bg-light p-1 py-2">
                                            <img src={comment.user.profile_image_url ? comment.user.profile_image_url : urlImage} alt="Imagen del usuario" class="bg-light card-img-topcomme img-fluid" />
                                            <h6 className="my-auto namecomment card-title text-danger fw-bold text">{comment.user.name}</h6>
                                        </div>
                                        {alertReport && comment.is_spam ? (
                                                    <div className=" text-center label alert alert-danger" role="alert">
                                                        {alertReport}
                                                    </div>
                                                ) : null}
                                        <div className=" d-flex justify-content-center ">

                                            <div className="d-flex justify-content-center ">
                                                {store.currentUser.id === comment.user.id ? (
                                                    <button type="button" class="my-2 mx-1 btn btn-danger btn-sm" onClick={() => deleteComments(comment.id)}>Eliminar <i class="fa-solid fa-trash"></i></button>
                                                ) : null}
                                                {store.currentUser.id === comment.user.id ? (
                                                    <button type="button" class="my-2 mx-2 btn btn-warning btn-sm" onClick={() => {
                                                        actions.reportedComments(comment.id, getCacheComments);
                                                        setAlertReport("Comentario Reportado. Dicha incidencia será revisada por los Administradores del sitio. Pulse de nuevo para retirar dicha incidencia.");
                                                      }}>Reporte <i class="fa-solid fa-bug"></i></button>
                                                ) : null}
                                                
                                            </div>
                                            
                                            <div className="d-flex my-auto mx-1" >
                                                {store.currentUser.id === comment.user.id ? (


                                                    <div className="  ">
                                                        <button id="editarComentarioBtn" type="button" className="  btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target={"#exampleModal" + comment.id} onClick={()=>{
                                                            setUpdatedComment({...updatedComment, title:comment.title, text:comment.text})
                                                        }}>
                                                            Editar  <i class="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        
                                                        <div className=" modal fade" id={"exampleModal" + comment.id} tabIndex="-1" aria-labelledby={"exampleModalLabel" + comment.id} aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className=" comentarioeditado modal-content">
                                                                    <div className="text-center mx-auto border-danger modal-header">
                                                                        <h1 className=" mx-1 modal-title fs-5" id={"exampleModalLabel" + comment.id}>Editar Comentario</h1>
                                                                        <button type="button" className=" btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                                                            setAlertMessageEdits(false);
                                                                        }}></button>
                                                                    </div>
                                                                    <div className="  container mt-5 my-3 text-center"  >
                                                                        <label className="label mb-2 fw-bold" htmlFor="formFileMultiple">Título:</label>
                                                                        <input name="title" value={updatedComment.title} onChange={(e) => {
                                                                            setUpdatedComment({ ...updatedComment, [e.target.name]: e.target.value });
                                                                            setAlertMessageEdits(false);

                                                                        }}

                                                                            onKeyUp={async (e) => {
                                                                                if (e.key === 'Enter') {
                                                                                    e.preventDefault();
                                                                                    if (updatedComment.title.trim().length > 0 && updatedComment.text.trim().length > 0) {
                                                                                        await editComments(comment.id, updatedComment);
                                                                                        setAlertMessageEdits("Comentario editado correctamente.");

                                                                                    } else if (updatedComment.title.trim().length === 0 && updatedComment.text.trim().length === 0) {
                                                                                        setAlertMessageEdits("Por favor, completa ambos campos antes de editar tu comentario.");
                                                                                    } else if (updatedComment.title.trim().length === 0) {
                                                                                        setAlertMessageEdits("Por favor, completa el campo del título antes de editar tu comentario.");
                                                                                    } else if (updatedComment.text.trim().length === 0) {
                                                                                        setAlertMessageEdits("Por favor, completa el campo del comentario antes de editar tu comentario.");
                                                                                    }
                                                                                }
                                                                            }}


                                                                            type="email" class="form-control bg-light  p-2 text-dark  border border-dark border border-2 bordecomment" id="exampleFormControlInput1" placeholder={comment.title} />


                                                                        <div className="my-3 text-center">
                                                                            <label className=" label mb-2 fw-bold" htmlFor="formFileMultiple">Edita Tu Comentario:</label>
                                                                            <textarea name="text" value={updatedComment.text} onChange={(e) => {
                                                                                setUpdatedComment({ ...updatedComment, [e.target.name]: e.target.value });
                                                                                setAlertMessageEdits(false);
                                                                            }}
                                                                                onKeyUp={async (e) => {
                                                                                    if (e.key === 'Enter') {
                                                                                        e.preventDefault();
                                                                                        if (updatedComment.title.trim().length > 0 && updatedComment.text.trim().length > 0) {
                                                                                            await editComments(comment.id, updatedComment);
                                                                                            setAlertMessageEdits("Comentario editado correctamente.");
                                                                                        } else if (updatedComment.title.trim().length === 0 && updatedComment.text.trim().length === 0) {
                                                                                            setAlertMessageEdits("Por favor, completa ambos campos antes de editar tu comentario.");
                                                                                        } else if (updatedComment.title.trim().length === 0) {
                                                                                            setAlertMessageEdits("Por favor, completa el campo del título antes de editar tu comentario.");
                                                                                        } else if (updatedComment.text.trim().length === 0) {
                                                                                            setAlertMessageEdits("Por favor, completa el campo del comentario antes de editar tu comentario.");
                                                                                        }
                                                                                    }
                                                                                }} className="form-control bg-light  p-2 text-dark  border border-dark border border-2 bordecomment" id="exampleFormControlTextarea1" placeholder={comment.text} rows="3"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="border-dark modal-footer mb-3"  >
                                                                        <button type="button"
                                                                            className="btn btn-dark btn-sm"
                                                                            onClick={() => {
                                                                                if (updatedComment.title.trim().length > 0 && updatedComment.text.trim().length > 0) {
                                                                                    editComments(comment.id, updatedComment);
                                                                                    setAlertMessageEdits("Comentario editado correctamente.");
                                                                                } else if (updatedComment.title.trim().length === 0 && updatedComment.text.trim().length === 0) {
                                                                                    setAlertMessageEdits("Por favor, completa ambos campos antes de editar tu comentario.");
                                                                                } else if (updatedComment.title.trim().length === 0) {
                                                                                    setAlertMessageEdits("Por favor, completa el campo del título antes de editar tu comentario.");
                                                                                } else if (updatedComment.text.trim().length === 0) {
                                                                                    setAlertMessageEdits("Por favor, completa el campo del comentario antes de editar tu comentario.");
                                                                                }
                                                                            }}>Guardar cambios</button>

                                                                        <button type="button" className="btn btn-success btn-sm " data-bs-dismiss="modal" onClick={() => {
                                                                            setAlertMessageEdits(false);
                                                                        }}>Cerrar</button>
                                                                        {alertMessageEdit ? (
                                                                            <div className=" label alert alert-danger" role="alert">
                                                                                {alertMessageEdit}
                                                                            </div>
                                                                        ) : null}


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>) : null}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="card-body mb-4">
                                        <h3 className="p-2 border border border-2 border border-dark bg-light tamano text-center fs-4 bordecomment">{comment.title}</h3>
                                        <p className="lh-base p-4 border border border-2 border border-dark bg-light card-text tamanocomentario bordecomment">{comment.text}</p>
                                    </div>
                                </div>
                            })}
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
                            <div className="text-center" aria-label="Basic checkbox toggle button group" >
                                <button type="button " className="btn btn-dark mx-1" onClick={mostrarComentarios}>Comentarios <i className="fa-solid fa-comment"></i></button>
                                <button type="button " className="btn btn-dark" onClick={mostrarFotosCache}>Fotos <i className="fa-solid fa-image"></i></button>
                            </div>
                            <h2 className="text-center mb-4 mt-5">Galería de fotos</h2>
                            <div className=" mb-5 mx-auto">
                                <div className="cajafotos1 border p-3 mb-5">
                                    <h2 className="text-center mb-4 mt-3 text-danger text-decoration-underline">Sube tus mejores fotos</h2>

                                    <div className=" text-center justify-content-center my-4 ">
                                        <img src={files ? URL.createObjectURL(files[0]) : urlImagePhoto} className=" imgenescachessubirfoto  mx-2 img-thumbnail mb-3 " alt="..." />
                                        <p className=" text-center ">Puede cargar un archivo JPG, GIF o PNG. El límite de tamaño de archivo es de 4 MB.</p>
                                    </div>
                                    <div className="text-center justify-content-center mx-auto  my-4">
                                        <input type="file" className=" form-control-file" onChange={(e) => setFiles(e.target.files)} />
                                    </div>


                                    <div className="mb-3 px-2 text-center">
                                        <label className="mb-2 fw-bold" htmlFor="formFileMultiple">Selecciona un Título:</label>
                                        <input type="text" name="title" value={galery.title} onChange={(e) => {
                                            setGalery({ ...galery, [e.target.name]: e.target.value });
                                            setAlertMessageFotos(false);
                                        }} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (galery.title.trim().length > 0 && galery.date_of_Publication.trim().length > 0) {
                                                    uploadImage()();
                                                    setAlertMessageFotos(false);
                                                } else if (galery.title.trim().length === 0 && galery.date_of_Publication.trim().length === 0) {
                                                    setAlertMessageFotos("Por favor, completa ambos campos antes de enviar tu imagen.");
                                                } else if (galery.title.trim().length === 0) {
                                                    setAlertMessageFotos("Por favor, completa el campo del título antes de enviar tu imagen.");
                                                } else if (galery.date_of_Publication.trim().length === 0) {
                                                    setAlertMessageFotos("Por favor, completa el campo de la fecha antes de enviar tu imagen.");
                                                }

                                            }

                                        }} class="form-control bg-light  text-dark border border-dark border border-2 " id="floatingInputInvalid" />
                                    </div>
                                    <div class="mb-3 px-2 text-center">
                                        <label className="mb-2 fw-bold" htmlFor="formFileMultiple">Selecciona una fecha:</label>
                                        <input name="date_of_Publication" value={galery.date_of_Publication} onChange={(e) => {
                                            setGalery({ ...galery, [e.target.name]: e.target.value });
                                            setAlertMessageFotos(false);
                                        }} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (galery.title.trim().length > 0 && galery.date_of_Publication.trim().length > 0) {
                                                    uploadImage()();
                                                    setAlertMessageFotos(false);
                                                } else if (galery.title.trim().length === 0 && galery.date_of_Publication.trim().length === 0) {
                                                    setAlertMessageFotos("Por favor, completa ambos campos antes de enviar tu imagen.");
                                                } else if (galery.title.trim().length === 0) {
                                                    setAlertMessageFotos("Por favor, completa el campo del título antes de enviar tu imagen.");
                                                } else if (galery.date_of_Publication.trim().length === 0) {
                                                    setAlertMessageFotos("Por favor, completa el campo de la fecha antes de enviar tu imagen.");
                                                }

                                            }
                                        }} class="form-control bg-light  text-dark border border-dark border border-2 " type="date" id="formFileMultiple" />
                                    </div>
                                    <div class=" d-flex justify-content-end mb-4 p-2">
                                        <button type="button" class="btn btn-dark btn-sm mx-1" onClick={() => {
                                            if (galery.title.trim().length > 0 && galery.date_of_Publication.trim().length > 0) {
                                                uploadImage();
                                                setAlertMessageFotos(false)
                                            } else if (galery.title.trim().length === 0 && galery.date_of_Publication.trim().length === 0) {
                                                setAlertMessageFotos("Por favor, completa ambos campos antes de enviar tu comentario.");
                                            } else if (galery.title.trim().length === 0) {
                                                setAlertMessageFotos("Por favor, completa el campo del título antes de enviar tu comentario.");
                                            } else if (galery.date_of_Publication.trim().length === 0) {
                                                setAlertMessageFotos("Por favor, completa el campo de la fecha antes de enviar tu comentario.");
                                            }
                                        }}>Enviar</button>
                                        <button type="button" class="btn btn-danger btn-sm mx-1" onClick={async () => {
                                            setGalery({ title: "", date_of_Publication: "" });
                                            setAlertMessageFotos(false);
                                            setFiles(null);

                                        }}>Cancelar</button>

                                    </div>
                                    {alertMessageFotos ? (
                                        <div className="alert alert-danger" role="alert">
                                            {alertMessageFotos}
                                        </div>
                                    ) : null}
                                </div>



                                {perfilImages.map((image, i) => {
                                    return <div key={i} class="comentario card mt-4">

                                        <div class="card-body">
                                            <div class="d-flex justify-content-center bg-light p-1 py-2 mb-1">
                                                <img src={image.user.profile_image_url ? image.user.profile_image_url : urlImage} alt="Imagen del usuario" class=" card-img-topcomme  img-fluid" />
                                                <h6 class="card-title text-danger fw-bold text namecomment my-auto">{image.user.name}</h6>
                                            </div>
                                            <div class="mb-5 d-flex justify-content-center my-2">
                                                {store.currentUser.id === image.user.id ? (
                                                    <button type="button" class="btn btn-danger btn-sm  " onClick={() => deleteImages(image.id)}>Eliminar <i class="fa-solid fa-trash"></i></button>) : null
                                                }
                                            </div>
                                            <div class=" bg-light bordecomment border border border-2 border border-dark card-body text-center my-auto mb-5">
                                                {selectedImageIndex === i && showCloseButton ? (
                                                    <button className="botonhover btn btn-danger btn-sm d-flex justify-content-end" onClick={closedHover}>
                                                        Cerrar
                                                    </button>
                                                ) : null}
                                                <h6 class="  text-center tamano fs-2 text text-decoration-underline mt-5">{image.title}</h6>
                                                <img src={image.url} alt="Imagen del usuario" class={`card-img-top img-fluid imgenescachespremium ${selectedImageIndex === i ? 'active' : null}`}
                                                    onClick={() => handleHover(i)} />

                                                <h6 class="mb-5 mt-3 ">{image.date_of_Publication}</h6>

                                            </div>

                                        </div>

                                    </div>
                                })}
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