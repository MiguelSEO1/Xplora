import React, { useState, useContext } from "react";
import propTypes, { string } from "prop-types";
import { Context } from "../store/appContext";


export const UploadImage = props => {
    const { store, actions } = useContext(Context);
    const [files, setFiles] = useState(null)
    const [url, setUrl] = useState(props.urlImage)
    const uploadImage = async (evt) => {
        evt.preventDefault();
        console.log("This are the files", files);

        let body = new FormData();
        body.append("profile_image", files[0]);
        const url = await actions.uploadImage(body, props.apiURL)
        setUrl(url)
    };

    return (
        <div>
            <div className="">
                <img src={url} className="img-thumbnail w-25" alt="..." />
            </div >            
            
            <div className="mt-2">
                <p>Puede cargar un archivo JPG, GIF o PNG. El límite de tamaño de archivo es de 4 MB.</p>
                <form onSubmit={uploadImage}>
                    <div className="form-group">
                        <input type="file" className="form-control-file" onChange={(e) => setFiles(e.target.files)} />
                    </div>
                    <button className="btn btn-danger btn-sm mt-3">Subir Foto</button>
                </form>
            </div>
        </div>
    )
};

UploadImage.propTypes = {
    urlImage: string,
    apiURL: string,
}