import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cluster } from "../component/cluster";
import { Context } from "../store/appContext";



export const ComoCrearUnCache = () => {


    return (

        <div className="container">
            <h1>Cómo crear un caché: Consejos y trucos para crear tu propio caché</h1>
            <p>Si eres un ávido cazador de cachés y estás buscando dar un paso más allá, crear tu propio caché puede ser una excelente manera de agregar algo nuevo al juego. Aquí tienes algunos consejos y trucos para crear tu propio caché.</p>
            <img src="https://www.geocaching.com/blog/wp-content/uploads/2017/04/GC29F60-800x450.jpg" className="img-fluid mx-auto d-block my-5 " alt="..." />

            <h2 className="my-4">Paso 1: Elije un lugar y una ubicación</h2>
            <p>Lo primero que debes hacer es elegir un lugar para tu caché. Asegúrate de elegir un lugar que sea accesible y que esté permitido para su uso. También debes elegir una ubicación específica para esconder tu caché. Piensa en un lugar que sea un poco desafiante, pero no demasiado difícil de encontrar.</p>

            <h2 className="my-4">Paso 2: Selecciona el contenedor adecuado</h2>
            <p>Hay muchos tipos de contenedores que puedes usar para tu caché, desde cajas de plástico hasta tubos de PVC. Elige uno que sea lo suficientemente grande para contener tus objetos y que sea resistente a la intemperie.</p>

            <h2 className="my-4">Paso 3: Crea una etiqueta o pegatina personalizada</h2>
            <p>Crea una etiqueta o pegatina personalizada para tu caché con información sobre el caché y cómo encontrarlo. Asegúrate de incluir el nombre del caché, las coordenadas GPS y cualquier información adicional que desees incluir.</p>
            <img src="https://www.geocaching.com/blog/wp-content/uploads/2014/08/de0a9484-c256-4c17-abe2-ed47281a9ad1.jpg" className="img-fluid mx-auto d-block my-5 " alt="..." />

            <h2 className="my-4">Paso 4: Agrega objetos interesantes</h2>
            <p>Agrega algunos objetos interesantes a tu caché para que los buscadores puedan intercambiar. Puedes incluir juguetes pequeños, llaveros, imanes, monedas o cualquier otra cosa que te gustaría intercambiar.</p>
            <img src="https://www.geocaching.com/blog/wp-content/uploads/2017/09/image-800x450.png" className="img-fluid mx-auto d-block my-5 " alt="..." />

            <h2 className="my-4">Paso 5: Registra tu caché en Nuestra Página</h2>
            <p>Una vez que hayas creado tu caché, asegúrate de registrarlo en correctamente para que otros puedan encontrarlo. Asegúrate de incluir información detallada sobre la ubicación del caché y cómo encontrarlo, así como cualquier otra información adicional que quieras incluir.</p>

            <h2 className="my-4">Paso 6: Mantén tu caché</h2>
            <p>Asegúrate de revisar regularmente tu caché para asegurarte de que sigue en buen estado y de que hay suficientes objetos interesantes en su interior. Si algo necesita ser reparado o reemplazado, hazlo lo antes posible para que el caché siga siendo divertido para los buscadores.</p>
            <img src="https://www.geocaching.com/blog/wp-content/uploads/2019/11/Mailer_Suite_111919_The_Evolution_of_Geocaches_vFINAL_1_Mailer_Blog_800x450.jpg" className="img-fluid mx-auto d-block my-5 " alt="..." />

            <h2 className="my-4">Conclusión</h2>
            <p>Crear tu propio caché puede ser una experiencia divertida y emocionante. Con estos consejos y trucos, estás listo para empezar a crear tu propio caché y agregar algo nuevo a nuestro juego.</p>
        </div>
    );
}