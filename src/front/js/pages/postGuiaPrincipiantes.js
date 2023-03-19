import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";



export const PostGuiaPrincipiantes = () => {


    return (

        <div className=" container">
            <h1>Cómo empezar a buscar cachés: Guía para Principiantes</h1>


            <img src="https://www.cbisland.com/content/uploads/2022/09/outdoor-adventure-31-1920x1006.jpg" className="img-fluid mx-auto d-block my-5 " alt="..." />

            <p>La búsqueda de cachés es una emocionante actividad al aire libre que utiliza dispositivos GPS para encontrar tesoros ocultos en todo el mundo. Ya sea que seas un aventurero experimentado o un principiante curioso, la búsqueda de cachés es una actividad divertida que te llevará a descubrir lugares nuevos y emocionantes.</p>

            <h2 className="my-4">¿Cómo empezar a buscar cachés?</h2>

            <p>Para comenzar, necesitarás un dispositivo GPS, como un teléfono inteligente o un dispositivo GPS de mano. Una vez que tengas un dispositivo GPS, es fácil buscar cachés en nuestra página web. Puedes buscar por ubicación, tipo y dificultad. ¡Hay tantos cachés para descubrir en todo el mundo!</p>
            <img src="https://static.vecteezy.com/system/resources/previews/001/265/743/non_2x/location-pins-in-gps-navigator-map-vector.jpg" className="img-fluid w-50 mx-auto d-block m-5 " alt="..." />

            <p>Algunos cachés son fáciles de encontrar, mientras que otros requieren un poco más de esfuerzo y habilidad para descubrir. Pueden estar ocultos en árboles, debajo de rocas o en otros lugares creativos. También hay cachés que requieren resolver enigmas y tareas antes de revelar la ubicación exacta del tesoro.</p>

            <h2 className="my-4">Consejos para principiantes</h2>

            <ul>
                <li>Comienza con cachés fáciles: Los cachés con una dificultad baja son una buena opción para principiantes. A medida que vayas adquiriendo experiencia, podrás buscar cachés más difíciles.</li>
                <li>Lleva suministros: Es importante llevar agua, bocadillos y un pequeño botiquín de primeros auxilios en caso de emergencia. También es una buena idea llevar una linterna y repelente de insectos para estar preparado en cualquier situación.</li>
            </ul>
            <img src="https://www.intermundial.es/blog/wp-content/uploads/2017/10/equipo-trekking-oto%C3%B1o.jpg" className="img-fluid mx-auto d-block m-5 " alt="..." />

            <ul>
                <li>Sé respetuoso con la naturaleza: Asegúrate de no dañar el medio ambiente mientras buscas cachés. Respeta las áreas naturales y deja todo tal y como lo encontraste.</li>
            </ul>

            <p>¡Ahora estás listo para comenzar tu aventura! Con esta guía para principiantes, podrás disfrutar de la emoción de buscar tesoros ocultos mientras exploras el mundo al aire libre. ¡Buena suerte y diviértete!</p>

        </div >
    );
}


