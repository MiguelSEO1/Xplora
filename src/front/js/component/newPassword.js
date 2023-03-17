import React, { useState, useContext } from "react";
import propTypes, { string } from "prop-types";
import { Context } from "../store/appContext";


export const NewPassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [error, setError] = useState("");

    const sendPasswordChange = async () => {
        const response = await fetch(
            process.env.BACKEND_URL + "/api/change-password",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    repeat_new_password: repeatNewPassword,
                }),
            }
        );
        const data = await response.json();
        if (response.ok) {
            setError(data.message);
        } else {
            setError(data.error);
        }
    };

    return (
        <div className="d-flex justify-content-end my-3">
            <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Cambiar Contraseña
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Cambiar Contraseña</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body mb-5">
                            <label htmlFor="currentPassword"
                                className="form-label mt-3">
                                Contraseña Actual
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                }}
                                placeholder="Contraseña Actual" />
                            <label
                                htmlFor="newPassword"
                                className="form-label mt-3">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }}
                                placeholder="Nueva Contraseña" />
                            <label
                                htmlFor="repeatNewPassword"
                                className="form-label mt-3">
                                Confirmar contraseña
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="repeatNewPassword"
                                value={repeatNewPassword}
                                onChange={(e) => {
                                    setRepeatNewPassword(e.target.value);
                                }}
                                placeholder="Confirmar contraseña" />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal">Cerrar</button>
                            <button className="mb-5 mt-5 btn btn-danger btn-sm" onClick={(e) => {
                                e.preventDefault();
                                sendPasswordChange();
                            }}>Guardar Cambios </button>

                            {error ? (
                                <p className="alert alert-warning">{error}</p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};
