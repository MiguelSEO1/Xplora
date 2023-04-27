import React, { useRef, useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import { Link, useParams } from "react-router-dom";

const containerStyle = {
    width: "auto",
    height: "500px",
  };


export const MapsGooglecopy = (props) => {
    const params = useParams();

    const inputRef = useRef()
    const [marker, setMarker] = useState({})
    const [perfilDetails, setPerfilDetails] = useState({});
    const [center, setCenter] = useState({ lat: 0, lng: 0 });









    const handlePlace = () => {
        const [place] = inputRef.current.getPlaces()
        setCenter({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        })
        setMarker({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        })
        console.log(inputRef.current.getPlaces()[0])

        props.setData({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            formatted_address: place.formatted_address
        })

        // Obtener el elemento al que se quiere hacer scroll
        const elemento = document.getElementById("mi-elemento");

        // Obtener la posición del elemento en relación al inicio de la página
        const posicion = elemento.offsetTop;

        // Hacer scroll hacia el elemento
        window.scrollTo({
            top: posicion,
            behavior: 'smooth',
            duration: 500 // Duración de la animación en milisegundos
        });
    }

    useEffect(() => {
        getDetails();


    }, []);

    const getDetails = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/perfil-cache/" + params.id)
        const data = await response.json();
        // Actualizar el estado de `center` con las coordenadas obtenidas
        setCenter({
            lat: data.coordinates_y,
            lng: data.coordinates_x
        });
        // Actualizar el estado de `center` con las coordenadas obtenidas
        setMarker({
            lat: data.coordinates_y,
            lng: data.coordinates_x
        });
    };

    return (
        <LoadScript
            googleMapsApiKey={`${process.env.GoogleMapsApiKey}`}
            libraries={["places"]}
            
        >

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                
            >

                {marker ? <Marker position={marker} /> : ""}
                <></>
            </GoogleMap>
        </LoadScript>
    )
}   