import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";
import "../../styles/clusters.css";
import Miguel from "../../img/miguel.png";




export const Contact = () => {


    const { store, actions } = useContext(Context);

    return (

        <div>

            <div className="cuerpo container" style={{ textAlign: 'center', padding: '30px' }}>
                <h1>Sobre mí</h1>
                <p>
                    ¡Hola! Mi nombre es Miguel y soy Desarrollador de Software Full Stack apasionado por el SEO, capaz de colaborar en el desarrollo de aplicaciones y sitios web con habilidades en tecnologías front-end y back-end.
                </p>

                <img src={Miguel} alt="Descripción de la imagen" style={{ width: '300px', margin: '20px auto' }} />

                <h2>Contacto</h2>
                <p>
                    Puedes contactarme a través de los siguientes medios:
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>
                        Correo electrónico:{' '}
                        <a href="mailto:miguelangelceballossosa.gmail.com">miguelangelceballossosa.gmail.com</a>
                    </li>
                    <li>
                        LinkedIn:{' '}
                        <a href="https://www.linkedin.com/in/miguelangelceballossosa/" target="_blank" rel="noopener noreferrer">
                            miguelangelceballossosa
                        </a>
                    </li>
                </ul>
            </div>







        </div>
    );
}