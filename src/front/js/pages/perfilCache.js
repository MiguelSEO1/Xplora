import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import Comentario from "../../img/comentario.png";
import QRCode from "react-qr-code";
import Mapa from "../../img/mapa.png"
import { UploadImage } from "../component/upload";
import { EditComment } from "../component/editComment";
import { MapsGoogle } from "../component/mapsGoogle";

export const PerfilCache = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [files, setFiles] = useState(null)
    const [urlImage, seturlImage] = useState("https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg");
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

    const [galery, setGalery] = useState({ id: params.id, title: "", url: "", date_of_Publication: "" });
    const [updatedComment, setUpdatedComment] = useState({ title: "", text: "" });


    useEffect(() => {
        getDetails();
        getCacheComments();
        getCacheImages();

    }, []);

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
                        <label className="btn btn-outline-primary mx-auto " onClick={mostrarDatosCache}>Información Caché</label>
                        <label className="btn btn-outline-primary mx-auto " onClick={mostrarComentariosCache}> Comentarios y Fotos</label>
                        <label className="btn btn-outline-primary mx-auto " onClick={mostrarHallazgoCache}> Registra Tu Hallazgo</label>
                    </div>
                </div>



                <div >
                    {selectedDiv1 ? (


                        <div className=" container mx-auto row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 " >
                            <div className="col-lg-5 align-items-center" >
                                <h2 className="text-start text-danger text-decoration-underline align-items-start mb-5">Ubicación</h2>
                                <MapsGoogle setData={setData} />
                            </div>
                            <div className="  col-lg-7" >
                                <h2 className="infocache text-start text-danger mb-5 mt-lg-1 mt-md-1 text-decoration-underline">Información</h2>
                                <ul className="infocachecaja list-group mb-5">
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
                            <h2 className="text-center mb-5 mt-5">Sección de Comentarios</h2>
                            <div className=" cajacomentario container border mb-4 mt-4">
                            <h2 className="text-center text-danger my-5 text-decoration-underline">Deja tu Comentario</h2>
                                <div className="mb-3 mt-5">
                                    <input name="title" value={comment.title} onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })} type="email" class="form-control bg-light p-2 text-dark  border border-dark border border-2 " id="exampleFormControlInput1" placeholder="Título" />
                                </div>

                                <div className="my-3">
                                    <textarea name="text" value={comment.text} onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })} className="form-control bg-light  p-2 text-dark  border border-dark border border-2 " id="exampleFormControlTextarea1" placeholder="Dejar Comentario" rows="3"></textarea>
                                </div>

                                <div className=" d-flex justify-content-end mt-2 mb-5">
                                    <button type="button" class="btn btn-dark btn-sm mx-1" onClick={async () => {
                                        await createComments()
                                        setComment({ title: "", text: "" })
                                    }}>Enviar</button>
                                </div>
                            </div>

                            {perfilComment.map((comment, i) => {
                                return <div key={i} class="comentario container row border mb-3 mx-auto mt-4">
                                    <div className=" tamn col-lg-3 col-md-4 col-sm-3 border border border-dark my-2 justify-content-start align-items-start ">
                                        <h6 className="tamano mt-3 fw-bold text-danger ">{comment.user.name}</h6>
                                        <img src={comment.user.profile_image_url ? comment.user.profile_image_url : urlImage} alt="Imagen del usuario" class="img-fluid w-25 pb-3" />
                                        <div className=" d-flex mb-3" >
                                            {store.currentUser.id === comment.user.id ? (
                                                <button type="button" class=" w-75 mx-auto btn btn-danger btn-sm" onClick={() => deleteComments(comment.id)}>Eliminar Comentario</button>
                                            ) : <button type="button" class=" w-75 mx-auto my-auto btn btn-danger btn-sm" onClick={() => actions.reportedComments(comment.id, getCacheComments)}>Denunciar</button>
                                            }
                                        </div>

                                        <div className=" mb-3" >
                                            {store.currentUser.id === comment.user.id ? (


                                                <div className="d-flex justify-content-end my-3">
                                                    <button type="button" className=" w-75 mx-auto btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        Editar Comentario
                                                    </button>

                                                    <div className="modal fade" key={i} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Comentario</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="container mt-5 " key={i} >
                                                                    <div className="mb-3">
                                                                        <input name="title" value={updatedComment.title} onChange={(e) => setUpdatedComment({ ...updatedComment, [e.target.name]: e.target.value })} type="email" class="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlInput1" placeholder="Título" />
                                                                    </div>

                                                                    <div className="my-3">
                                                                        <textarea name="text" value={updatedComment.text} onChange={(e) => setUpdatedComment({ ...updatedComment, [e.target.name]: e.target.value })} className="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlTextarea1" placeholder="Dejar Comentario" rows="3"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer mb-3" key={i} >
                                                                    <button type="button" className="btn btn-success btn-sm " data-bs-dismiss="modal">Cerrar</button>
                                                                    <button className=" btn btn-danger btn-sm" onClick={() => {
                                                                        editComments(comment.id, updatedComment);
                                                                    }}>Guardar Cambios </button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>) : null}
                                        </div>


                                    </div>
                                    <div className=" col-lg-9 col-md-8 col-sm-8 my-2">
                                        <h3 className="tamano text-center mt-3 fs-2 text text-decoration-underline">{comment.title}</h3>
                                        <p className="tamanocomentario">{comment.text}</p>
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
                                <button type="button " className="btn btn-outline-dark mx-1" onClick={mostrarComentarios}>Comentarios <i className="fa-solid fa-comment"></i></button>
                                <button type="button " className="btn btn-outline-dark" onClick={mostrarFotosCache}>Fotos <i className="fa-solid fa-image"></i></button>
                            </div>
                            <h2 className="text-center mb-4 mt-5">Galería de fotos</h2>
                            <div className=" mb-5 mx-auto">
                                <div className="cajafotos1 border p-3 mb-5">
                                <h2 className="text-center mb-4 mt-3 text-danger text-decoration-underline">Sube tus mejores fotos</h2>
                                    <div className=" mt-5 mb-5 p-2 mx-auto">
                                        <div className="d-flex row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 align-items-center ">
                                            <img src={files ? URL.createObjectURL(files[0]) : urlImagePhoto} className=" imgenescachespremium  mx-2 img-thumbnail mb-3 border border-dark border border-2" alt="..." />
                                            <p className=" ">Puede cargar un archivo JPG, GIF o PNG. El límite de tamaño de archivo es de 4 MB.</p>
                                        </div>
                                        <input type="file" className="  file form-control-file" onChange={(e) => setFiles(e.target.files)} />
                                    </div>

                                    <div class="mb-3 px-2 text-center">
                                        <input type="text" name="title" value={galery.title} onChange={(e) => setGalery({ ...galery, [e.target.name]: e.target.value })} class="form-control bg-light  text-dark border border-dark border border-2 " id="floatingInputInvalid" placeholder="Título Foto" />
                                    </div>
                                    <div class="mb-3 px-2">
                                        <input name="date_of_Publication" value={galery.date_of_Publication} onChange={(e) => setGalery({ ...galery, [e.target.name]: e.target.value })} class="form-control bg-light  text-dark border border-dark border border-2 " type="date" id="formFileMultiple" multiple placeholder="Fecha Foto - dd-mm-aa" />
                                    </div>
                                    <div class=" d-flex justify-content-end mb-4 p-2">
                                        <button type="button" class="btn btn-dark btn-sm mx-1" onClick={() => {
                                            uploadImage()

                                        }}>Enviar</button>
                                    </div>
                                </div>

                                {perfilImages.map((image, i) => {
                                    return <div key={i} class=" justify-content-center container cajafotosespecifica border mx-auto mt-4">

                                        <div class="container row ">
                                            <div class=" col-lg-2 cols-md-4 cols-sm-12 ">

                                                <h6 class="tamano mt-3 fw-bold text-danger">{image.user.name}</h6>
                                                <img src={image.user.profile_image_url ? image.user.profile_image_url : urlImage} alt="Imagen del usuario" class=" imagenfotos img-fluid " />
                                            </div>
                                            <div class=" margenfoto text-center col-lg-10 cols-md-8 cols-sm-12">

                                                <h6 class="  tamano fs-2 text text-decoration-underline">{image.title}</h6>
                                                <img src={image.url} alt="Imagen del usuario" class="imgenescaches img-fluid " />
                                                <h6 class="mt-3  ">{image.date_of_Publication}</h6>
                                                {store.currentUser.id === image.user.id ? (
                                                    <button type="button" class="btn btn-danger btn-sm mb-5 w-50 " onClick={() => deleteImages(image.id)}>Eliminar Foto</button>) : null
                                                }
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