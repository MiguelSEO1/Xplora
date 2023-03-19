import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import Comentario from "../../img/comentario.png";
import Mapa from "../../img/mapa.png"
import { UploadImage } from "../component/upload";


export const PerfilCache = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [files, setFiles] = useState(null)
    const [url, setUrl] = useState('');
    const [urlImage, seturlImage] = useState("https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg");
    const [selectedDiv1, setSelectedDiv1] = useState(true);
    const [selectedDiv2, setSelectedDiv2] = useState(false);
    const [selectedDiv3, setSelectedDiv3] = useState(false);
    const [selectedDiv4, setSelectedDiv4] = useState(false);
    const [selectedDiv5, setSelectedDiv5] = useState(false);
    const [perfilDetails, setPerfilDetails] = useState({});
    const [perfilComment, setPerfilComment] = useState({});
    const [perfilImages, setPerfilImages] = useState({});

    const [comment, setComment] = useState({ title: undefined, text: undefined });
    const [galery, setGalery] = useState({ id: params.id, title: undefined, url: undefined, date_of_Publication: undefined });


    useEffect(() => {
        getDetails();
        getCacheComments();
        getCacheImages();

    }, []);

    useEffect(() => {
        getCacheImages();
    }, [url]); // solo llama a la función getCacheImages cuando se actualiza url

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
        setPerfilDetails(data)
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


    const createGalery = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/perfil-galery/" + params.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),

            },
            body: JSON.stringify(galery),
        });

        if (response.ok) {
            getCacheImages();
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
        const url = await actions.uploadImageCache(body)
        setUrl(url)
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

        <div className="container">
            <div className="row ">
                <div >
                    <div class="btn-group container my-5" aria-label="Basic checkbox toggle button group" >
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
                                <ul class="list-group mb-5">
                                    <li className="list-group-item list-group-item-warning"><strong>Nombre:</strong> {perfilDetails.name}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>Coordenadas:</strong> {perfilDetails.coordinates_x}/ {perfilDetails.coordinates_y} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>Country:</strong> {perfilDetails.country}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>City:</strong> {perfilDetails.city}</li>
                                    <li className="list-group-item list-group-item-warning"><strong>difficulty:</strong> {perfilDetails.difficulty} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>Size:</strong> {perfilDetails.size} </li>
                                    <li className="list-group-item list-group-item-warning"><strong>Description:</strong> {perfilDetails.description}</li>
                                </ul>
                            </div>
                        </div>

                    ) : null}
                    {selectedDiv2 ? (
                        <div className="container-fluid ">
                            <h2 className="text-center mb-5 mt-5">Comentarios y Fotos de Caché</h2>
                            <div className="text-center mb-5 mt-5 mb-3">
                                <div >
                                    <div class="" aria-label="Basic checkbox toggle button group g-0" >
                                        <button type="button " class="btn btn-outline-dark mx-1" onClick={mostrarComentarios}>Comentarios <i class="fa-solid fa-comment"></i></button>
                                        <button type="button " class="btn btn-outline-dark" onClick={mostrarFotosCache}>Fotos <i class="fa-solid fa-image"></i></button>
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
                                <div class="mb-3">
                                    <input class="form-control text-dark bg-opacity-10 border border-danger" type="text" value={`Caché ${perfilDetails.name}`} aria-label="Disabled input example" disabled readonly />
                                </div>
                                <div class="">
                                    <input class="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlTextarea1" placeholder="Describe tu hallazgo" rows="3"></input>
                                </div>
                                <div class="mt-3">
                                    <input class="form-control p-2 text-dark bg-opacity-10 border border-danger" type="file" id="formFileMultiple" multiple />
                                </div>
                                <div className="text-center">
                                    <div className="text-center my-4">
                                        <Link to="/enhorabuena">
                                            <button type="button " class="btn btn-danger">Registrar el hallazgo de este Caché <i class="fa-regular fa-star"></i></button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {selectedDiv4 ? (

                        <div className="container">
                            <div className="text-center mb-5 mt-5 ">
                                <div class="" aria-label="Basic checkbox toggle button group" >
                                    <button type="button " class="btn btn-outline-dark mx-1" onClick={mostrarComentarios}>Comentarios <i class="fa-solid fa-comment"></i></button>
                                    <button type="button " class="btn btn-outline-dark" onClick={mostrarFotosCache}>Fotos <i class="fa-solid fa-image"></i></button>
                                </div>
                            </div>
                            <h2 className="text-center my-3">Deja tu Comentario</h2>
                            <div className="container">

                                <div class="mb-3">
                                    <input name="title" value={comment.title} onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })} type="email" class="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlInput1" placeholder="Título" />
                                </div>

                                <div class="my-3">
                                    <textarea name="text" value={comment.text} onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })} class="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlTextarea1" placeholder="Dejar Comentario" rows="3"></textarea>
                                </div>

                                <div class=" d-flex justify-content-end mt-2 mb-5">
                                    <button type="button" class="btn btn-primary btn-sm mx-1" onClick={() => {
                                        createComments()
                                        setComment({ title: "", text: "" })
                                    }}>Enviar</button>
                                </div>
                            </div>
                            {perfilComment.map((comment, i) => {
                                return <div key={i} class="container row border-bottom-0 border-dark border-top border-top-2 mt- mb-3 mx-auto ">
                                    <div class="tamn col-lg-2 col-md-2 col-sm-3 border-bottom border-end border-primary my-2 justify-content-start align-items-start">
                                        <h6 class="tamano">{comment.user.name}</h6>
                                        <img src={comment.user.profile_image_url ? comment.user.profile_image_url : urlImage} alt="Imagen del usuario" class="img-fluid w-25 pb-3" />
                                        <div class="mb-3" >
                                            {store.currentUser.id === comment.user.id ? (
                                                <button type="button" class="btn btn-danger btn-sm" onClick={() => deleteComments(comment.id)}>Eliminar Comentario</button>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div class="col-lg-10 col-md-10 col-sm-8 my-2">
                                        <h6 class="tamano">{comment.title}</h6>
                                        <p class="tamano">{comment.text}</p>
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
                            <div className="text-center mb-5 mt-5 ">
                                <div class="" aria-label="Basic checkbox toggle button group" >
                                    <button type="button " class="btn btn-outline-dark mx-1" onClick={mostrarComentarios}>Comentarios <i class="fa-solid fa-comment"></i></button>
                                    <button type="button " class="btn btn-outline-dark" onClick={mostrarFotosCache}>Fotos <i class="fa-solid fa-image"></i></button>
                                </div>
                            </div>
                            <h2 className="text-center mb-4 mt-5">Galería de fotos</h2>
                            <h3 className="text-center mb-4 mt-3">Sube las fotos que desees de este caché</h3>
                            <div className="container row mb-3 mx-auto">

                                <div className="d-flex align-items-end ">
                                    <>
                                        <img src={files ? URL.createObjectURL(files[0]) : urlImage} className=" img-thumbnail w-25 mb-3" alt="..." />
                                        <div className="m-3">
                                            <div className="">
                                                <p>Puede cargar un archivo JPG, GIF o PNG. El límite de tamaño de archivo es de 4 MB.</p>
                                            </div>
                                            <div className="form-group">
                                                <input type="file" className="form-control-file" onChange={(e) => setFiles(e.target.files)} />
                                            </div>

                                        </div>
                                    </>
                                </div>

                                <div class="mb-3">
                                    <input type="text" name="title" value={galery.title} onChange={(e) => setGalery({ ...galery, [e.target.name]: e.target.value })} class="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="floatingInputInvalid" placeholder="Título Foto" />
                                </div>
                                <div class="mb-2">
                                    <input name="date_of_Publication" value={galery.date_of_Publication} onChange={(e) => setGalery({ ...galery, [e.target.name]: e.target.value })} class="form-control bg-secondary p-2 text-dark bg-opacity-10 border border-danger" type="text" id="formFileMultiple" multiple placeholder="Fecha Foto - dd-mm-aa" />
                                </div>
                                <div class=" d-flex justify-content-end my-2">
                                    <button type="button" class="btn btn-primary btn-sm mx-1" onClick={() => {
                                        uploadImage()

                                    }}>Enviar</button>
                                </div>
                                {perfilImages.map((image, i) => {
                                    return <div key={i} class="container row border-bottom-0 border-dark border-top border-dark m-3 mx-auto my-3">
                                        <div class="tamn col-lg-2 col-md-2 border-bottom border-end border-primary my-2 justify-content-start align-items-start">
                                            <h6 class="tamano">{image.user.name}</h6>
                                            <img src={image.user.profile_image_url ? image.user.profile_image_url : urlImage} alt="Imagen del usuario" class="img-fluid w-25 pb-3" />
                                            <div className="mb-3" >
                                                {store.currentUser.id === image.user.id ? (
                                                    <button type="button" class="btn btn-danger btn-sm" onClick={() => deleteImages(image.id)}>Eliminar Foto</button>) : null
                                                }
                                            </div>
                                        </div>
                                        <div class="col-lg-10 col-md-10 my-2  text-center">
                                            <h6 class="tamano">{image.title}</h6>
                                            <img src={image.url} alt="Imagen del usuario" class="img-fluid w-auto pb-3 d-felx" />
                                            <h6 class="tamano">{image.date_of_Publication}</h6>
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