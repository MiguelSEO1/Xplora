import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";



export const SeguridadBusquedaCaches = () => {


    return (

        <div className="container">
            <h1>Los peligros de la Búsqueda de Cachés: Cómo mantenerse seguro durante la misma</h1>
            <img src="https://www.geocaching.com/blog/wp-content/uploads/2019/09/Mailer_Suite_100119_Reaching_New_Heights_vFINAL_Mailer_Blog-800x450.jpg" className="img-fluid mx-auto d-block my-5 " alt="..." />
            <p>La búsqueda de cachés es una actividad emocionante y divertida, pero como cualquier actividad al aire libre, puede presentar ciertos peligros. Aquí hay algunos consejos para ayudarte a mantenerte seguro mientras buscas cachés.</p>

            <h2 className="my-4">1. Planifica con anticipación</h2>
            <p>Antes de salir a buscar cachés, investiga la zona en la que planeas buscar. Asegúrate de conocer el terreno, el clima, la flora y la fauna de la zona. También es importante informar a alguien sobre tus planes y hacerles saber a dónde vas y cuándo planeas regresar.</p>

            <h2 className="my-4">2. Lleva el equipo adecuado</h2>

            <p>Asegúrate de llevar contigo el equipo adecuado, como calzado cómodo y resistente, ropa adecuada para el clima y protección contra los insectos y los rayos del sol. Si planeas buscar cachés en áreas remotas, también es importante llevar un botiquín de primeros auxilios y suficiente agua y comida para la jornada.</p>
            <img src="https://static.wixstatic.com/media/69af96_b9a1e13b70c24f0580aabffe74f31a40~mv2_d_5184_3456_s_4_2.jpeg/v1/fill/w_660,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/69af96_b9a1e13b70c24f0580aabffe74f31a40~mv2_d_5184_3456_s_4_2.jpeg" className="img-thumbnail mx-auto d-block my-5 " alt="..." />

            <h2 className="my-4" >3. Mantente alerta</h2>
            <p>Mantén tus sentidos alerta en todo momento. Presta atención a tu entorno y cualquier cambio en el clima o el terreno. También debes estar atento a cualquier señal de peligro, como animales salvajes, terrenos inestables o zonas peligrosas.</p>

            <h2 className="my-4">4. Respeta la naturaleza y la propiedad privada</h2>
            <p>Asegúrate de respetar la naturaleza y no dejar rastro de tu paso por la zona. No dañes la flora y la fauna del lugar y no molestes a los animales salvajes. También es importante respetar la propiedad privada y no entrar en terrenos privados sin permiso.</p>
            <img src="https://www.objetivobienestar.com/uploads/s1/13/61/65/5/como-educar-en-la-naturaleza-a-los-mas-pequenos.jpeg" className="img-fluid mx-auto d-block my-5 " alt="..." />

            <h2 className="my-4" >5. No te arriesgues innecesariamente</h2>
            <p>Si encuentras una situación peligrosa o riesgosa, no te arriesgues innecesariamente. Siempre es mejor abandonar la búsqueda de una caché si no te sientes seguro o cómodo en la zona. La seguridad es lo primero.</p>

            <p>Recuerda, la búsqueda de cachés puede ser una actividad emocionante y gratificante, pero es importante mantenerse seguro en todo momento. Sigue estos consejos y disfruta de una experiencia segura y divertida.</p>

        </div >

    );
}