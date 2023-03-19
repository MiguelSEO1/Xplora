import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";



export const PaginaEnhorabuena = () => {

    return (

        <div className="container mx-auto text-center mt-5">
            <h1>ENHORABUENA!!!!!! </h1>
            <img src="https://preview.redd.it/fvwlw5s9jqi31.jpg?auto=webp&s=c0a20e740c88bc85670a32586351090fc32a08fd" className="img-fluid mx-auto d-block my-5 " alt="..." />
            <p>Felicidades! Has encontrado uno de nuestros tesoros. Nos alegra saber que disfrutas buscando y explorando dentro de nuestra Comunidad. Te invitamos a revisar nuestras páginas de Cachés, donde encontrarás información sobre otros tesoros ocultos cercanos y nuevas pistas para seguir explorando. En la página de TU Perfil podrás ver el registro de tu hallazgo y de otros que encuentres en el futuro. ¡Sigue divirtiéndote explorando!</p>
        </div>

    );
}