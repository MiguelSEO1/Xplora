import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";



export const AdmPage = () => {
    const [users, setUsers] = useState([]);
    const [myrank, setMyrank] = useState({});
    const [admClave, setAdmClave] = useState("");
    const [mostrarAdmin, setMostrarAdm] = useState(false);
    const [alertAdmin, setAlertAdm] = useState(false);
    const { store, actions } = useContext(Context);

    const admin = (e) => {
        e.preventDefault();

        if (admClave === "Br1234567.") {
            setMostrarAdm(true);
            setAlertAdm(null);
        } else {
            setAlertAdm("clave invalida, no eres Administrador de este sitio");
            setMostrarAdm(false);

        }
    };


    useEffect(() => {
        userRanking()
    }, []);
    const userRanking = () => fetch(process.env.BACKEND_URL + '/api/ranking_users', {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
        .then(response => response.json())
        .then(data => {
            setUsers(data.all_rank);
            setMyrank(data.my_rank);
        })
        .catch(error => console.error(error));

    return (
        <div className=" container text-center mb-5">
            <h1 className="container-fluid text-center cuerpo mb-4">Panel de Administrador</h1>
            <p>Bienvenido al panel de administrador del sitio web. Por favor, introduzca sus credenciales para acceder a las funciones de administración del sitio. Una vez que haya iniciado sesión, podrá ver y gestionar los datos de los usuarios, modificar el contenido del sitio y realizar otras tareas de mantenimiento. Asegúrese de mantener sus credenciales seguras y no compartir su información de inicio de sesión con nadie. ¡Gracias por su colaboración en el mantenimiento de nuestro sitio web!</p>

            <form onSubmit={admin}>
                <input
                    type="password"
                    className="imputhallazgo w-50 mx-auto form-control mb-3 border border-dark border border-2 bordecomment bg-dark text-white"
                    placeholder="Introduzca la clave"
                    value={admClave}
                    onChange={(e) => setAdmClave(e.target.value)}
                />
                <button type="submit" className="  btn btn-dark my-3">
                    Entrar Panel de Administrador
                </button>
            </form>
            {mostrarAdmin ? (<div>
                <div className="container-fluid text-center my-5">
                    <table className="mb-5 container text-center">
                        <thead>
                            <tr className='alert- alert-dark'>
                                <th className="text-danger fs-5">Posición   <i class="fa-solid fa-trophy"></i></th>
                                <th className="text-danger fs-5">Nombre     <i class="fa-solid fa-skull-crossbones"></i></th>
                                <th className="text-danger fs-5 " >Cachés hallados <i class="fa-solid fa-gem"></i></th>
                            </tr>
                        </thead>
                        <tbody className="mt-5">
                            {users.map((user, position) => {
                                return <tr className={user.id == myrank.id ? "alert alert-warning" : "bg-light"} key={user.id}>
                                    {user.is_admin ? "@@@@@":"2222222"}

                                    <td className="text-center py-4 fs-6">{position + 1}</td>
                                    <td className="text-center fs-6">{user.name}    <button type="submit" className="d-flex justify-content-center btn btn-danger my-3" onClick={async() => {
                                        await actions.adminRolUser(user.id);
                                        await userRanking()
                                    }}>adm <i className="text-warning fa-regular fa-star"></i></button></td>
                                    <td className="text-center fs-6">{user.caches}</td>

                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>) : null}
            {alertAdmin ? (
                <div className=" label alert alert-danger" role="alert">
                    {alertAdmin}
                </div>
            ) : null}
        </div>
    );
}


