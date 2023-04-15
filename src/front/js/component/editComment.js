import React, { useState, useContext } from "react";
import propTypes, { string } from "prop-types";
import { Context } from "../store/appContext";


export const EditComment = (id) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [error, setError] = useState("");
    const [comment, setComment] = useState({ title: "", text: "" });

    
    
    const editComment = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/edit-comments", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: comment.id,
            text: comment.text,
            title: comment.title,
          }),
        });
      
        if (response.ok) {
          getCacheComments();
        }
      };
      
      

    return (
        <div className="d-flex justify-content-end my-3">
            <button type="button" className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
               Editar Comentario
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Comentario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="container mt-5">
                                <div className="mb-3">
                                    <input name="title" value={comment.title} onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })} type="email" class="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlInput1" placeholder={comment.title}/>
                                </div>

                                <div className="mt-3 mb-5">
                                    <textarea name="text" value={comment.text} onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })} className="form-control bg-secondary  p-2 text-dark bg-opacity-10 border border-danger" id="exampleFormControlTextarea1" placeholder={comment.title} rows="3"></textarea>
                                </div>

                            </div>
                        <div className="modal-footer mb-3">
                            <button type="button" className="btn btn-success btn-sm " data-bs-dismiss="modal">Cerrar</button>
                            <button className=" btn btn-danger btn-sm" onClick={() => {
                                editComment(comment.id, Comment.text, comment.title);
                            }}>Guardar Cambios </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};
