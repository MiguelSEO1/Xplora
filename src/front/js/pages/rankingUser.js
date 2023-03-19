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
        <div>
            <h2>Lista de usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Nombre</th>
                        <th>Número de caches encontrados</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, position) => {
                        return <tr className={user.id == myrank.id ? "bg-warning" : "bg-secondary"} key={user.id}>
                            <td className="text-center">{position + 1}</td>
                            <td className="text-center">{user.name}</td>
                            <td className="text-center">{user.caches}</td>

                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

