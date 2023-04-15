import React, { useRef, useState } from 'react'
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
    width: "auto",
    height: '400px'
};


export const MapsGoogle = (props) => {
    const inputRef = useRef()
    const [marker, setMarker] = useState({})

    const [center, setCenter] = useState({
        lat: 40.4165,
        lng: -3.70256
    })
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
    }

    return (
        <LoadScript
            googleMapsApiKey={`${process.env.GoogleMapsApiKey}`}
            libraries={["places"]}
        >
            <StandaloneSearchBox  onLoad={ref => inputRef.current = ref} onPlacesChanged={handlePlace} className="search">
                <input  type="text" />
            </StandaloneSearchBox>
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