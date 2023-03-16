import React, { useState, useContext } from "react";
import propTypes, { string } from "prop-types";
import { Context } from "../store/appContext";


export const NewPassword = () => {
    const { store, actions } = useContext(Context);
    const [currentPassword, setCurrentPassword] = useState(store.currentUser.password);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [correctPassword, setCorrectPassword] = useState(false);
    const [samePassword, setSamePassword] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);

    const handleSaveChanges = () => {

        setCorrectPassword(false);
        setSamePassword(false);
        setUpdatedPassword(false);
        if (currentPassword !== store.currentUser.password) {
            setCorrectPassword(true);
            return;
        } else if (newPassword !== confirmPassword) {
            setSamePassword(true);
            return;
        } else {
            setUpdatedPassword(true);
        }
    }

    return (
        <div className="d-flex justify-content-end my-3">
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Cambiar Contraseña
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Cambiar Contraseña</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body mb-5">
                            <label for="exampleFormControlInput1" class="form-label mt-3">Contraseña Actual</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={currentPassword}
                                onChange={(e) => { setCurrentPassword(e.target.value); }} placeholder="Contraseña Actual" />
                            <label for="exampleFormControlInput1" class="form-label mt-3">Nueva Contraseña</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value); }} placeholder="Nueva Contraseña" />
                            <label for="exampleFormControlInput1" class="form-label mt-3" >Confirmar contraseña</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); }} placeholder="Confirmar contraseña" />

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success btn-sm" data-bs-dismiss="modal">Cerrar</button>
                            <button className="mb-5 mt-5 btn btn-danger btn-sm" onClick={(e) => {
                                e.preventDefault();
                                actions.updateUserPass(currentPassword, newPassword, confirmPassword);
                                handleSaveChanges();
                                setCurrentPassword("");
                                setNewPassword("");
                                setConfirmPassword("");
                            }}>Guardar Cambios </button>

                            {correctPassword ? (
                                <p className="alert alert-warning">La contraseña actual no coincide.</p>
                            ) : null}
                             {samePassword ? (
                                <p className="alert alert-warning">Las nuevas contraseñas no coinciden</p>
                            ) : null}
                             {updatedPassword ? (
                                <p className="alert alert-warning">Contraseña actualizada correctamente</p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};
