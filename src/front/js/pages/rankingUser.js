import React, { useState, useEffect } from 'react';

export const RankingUser = () => {
    const [users, setUsers] = useState([]);
    const [myrank, setMyrank] = useState({});

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
        <div className="vh-100 container text-center">
            <h1 className="container-fluid text-center cuerpo mb-4">Ranking de Usuarios</h1>
            <p>¡Bienvenidos a nuestra sección de rankings! Aquí podrás encontrar información detallada sobre tus logros en la búsqueda de tesoros. Verás tu posición actual para compararte con otros miembros de la comunidad. ¡A por ellos!</p>
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
                                <td className="text-center py-4 fs-6">{position + 1}</td>
                                <td className="text-center fs-6">{user.name}</td>
                                <td className="text-center fs-6">{user.caches}</td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

