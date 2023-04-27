import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { MapsGoogle } from "../component/mapsGoogle";
import mapaPirata from "../../img/mapaPirata.png";


export const Cache = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [states, setStates] = useState([]);
    const [stateid, setStateID] = useState(null);
    const [city, setCity] = useState([]);
    const [cityid, setCityID] = useState(null);
    const [postalCode, setPostalCode] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [size, setSize] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState({});


    const sendCacheRegistral = async () => {
        const response = await fetch(
            process.env.BACKEND_URL + "/api/reg_cache",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    country: country,
                    state: states.find(x => x.iso2 == stateid).name,
                    city: city.find(x => x.name == cityid).name,
                    postal_code: postalCode,
                    coordinates_y: data.lat.toString(),
                    coordinates_x: data.lng.toString(),
                    difficulty: difficulty,
                    size: size,

                }),
            }
        );
        const responsetoJson = await response.json();
        if (response.ok) {
            navigate("/demo");
            actions.getCaches()
        } else {
            setError(responsetoJson.response);
        }
    };

    useEffect(() => {
        const getStates = async () => {
            const resStates = await fetch("https://api.countrystatecity.in/v1/countries/es/states",
                {
                    method: "GET",
                    headers: {
                        "X-CSCAPI-KEY": "THBaNTRWWnhYTHJYdkZLWkxobWJYVEhLMnBEQWt4dkJ4MFRVTDN1TQ=="
                    }
                }
            );
            const response = await resStates.json();
            setStates(response);
        }
        getStates();
    }, [])

    const handleState = (event) => {
        const getStateID = event.target.value;
        setStateID(getStateID);
    }

    useEffect(() => {
        const getCity = async () => {
            const resCity = await fetch(`https://api.countrystatecity.in/v1/countries/es/states/${stateid}/cities`,
                {
                    method: "GET",
                    headers: {
                        "X-CSCAPI-KEY": "THBaNTRWWnhYTHJYdkZLWkxobWJYVEhLMnBEQWt4dkJ4MFRVTDN1TQ=="
                    }
                }
            );
            const response = await resCity.json();
            setCity(response);
        }
        getCity();
    }, [stateid]);

    



    return (
        <section className="mx-auto cuerpo" >
            <div className=" container text-center my-3">
                <h1 className="text-center">Crea y Registra tú Caché</h1>
                <p className="mt-5">¡Bienvenido a la sección de creación y registro de caches de nuestra web! Aquí podrás dar rienda suelta a tu creatividad y diseñar tu propio tesoro. Comienza a crear tu propio caché hoy mismo y deja tu huella en la nuestra comunidad. ¡Buena Suerte!</p>
            </div>
            <div className=" container mx-auto row row-cols-lg-1 row-cols-md-1 row-cols-sm-1  ">
                    <div className=" mx-auto MapGoo my-5 ">
                        <MapsGoogle setData={setData} />
                    </div> 

                <div className=" RegistroCache container registro border border-dark border border-2 rounded p-2  mt-3 border rounded mb-5">
                    <h2 className="text-center my-4 text-danger">Crea y Registra tú Caché</h2>
                    <div className=" row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="name">
                            Name:{" "}
                        </label>
                        <div className="mx-auto col-sm-10">
                            <input
                                className="form-control"
                                name="name"
                                placeholder="name"
                                value={name}
                                onChange={(e) => {
                                    setError(false);
                                    setName(e.target.value);
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Descripion:{" "}
                        </label>
                        <div className="">
                            <input
                                className="form-control"
                                name="description"
                                placeholder="description"
                                value={description}
                                onChange={(e) => {
                                    setError(false);
                                    setDescription(e.target.value);
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Country:{" "}
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-select"
                                name="Country"
                                value={country}
                                onChange={(e) => {
                                    setError(false);
                                    setCountry(e.target.value);
                                }}>
                                <option value="1">España</option>
                            </select>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            State:{" "}
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-select"
                                name="State"
                                value={stateid}
                                onChange={(e) => {
                                    setError(false);
                                    handleState(e);
                                }}>
                                <option value="">---</option>
                                {
                                    states.map((state, index) => (
                                        <option key={index} value={state.iso2}>{state.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            City:{" "}
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-select"
                                name="City"
                                value={cityid}
                                onChange={(e) => {
                                    setError(false);
                                    setCityID(e.target.value)
                                }}>
                                <option value="1">---</option>
                                {
                                    city.map((city, index) => (
                                        <option key={index} value={city.name}>{city.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div id="mi-elemento" className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Postal code:{" "}
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                name="postalCode"
                                placeholder="postalCode"
                                value={postalCode}
                                onChange={(e) => {
                                    setError(false);
                                    setPostalCode(e.target.value);
                                }}
                            ></input>
                        </div>
                    </div>
                    <div id="mi-elemento" className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3 ">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Coordenadas
                        </label>
                        <div className="text-center mx-auto">
                            <button type="button" class="btn btn-info text-danger m-1" onClick={() => {
                                window.scrollTo(0, 0); // Este es el nuevo evento que se agregará
                            }}><i class="fa-solid fa-location-dot"></i></button>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3 ">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Latitud:{" "}
                        </label>
                        <div className=" col-sm-10">
                            <input
                                type="number"
                                step="any"
                                className="form-control"
                                name="coordinatesY"
                                placeholder="coordinatesY"
                                value={data ? data.lat : ""}
                                onChange={(e) => {
                                    setError(false);
                                    setData({ ...data, lat: e.target.value });
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Longitud:{" "}
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                step="any"
                                className="form-control"
                                name="coordinatesX"
                                placeholder="coordinatesX"
                                value={data ? data.lng : ""}
                                onChange={(e) => {
                                    setError(false);
                                    setData({ ...data, lng: e.target.value });
                                }}
                            ></input>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Difficulty:{" "}
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-control"
                                name="difficulty"
                                placeholder="difficulty"
                                value={difficulty}
                                onChange={(e) => {
                                    setError(false);
                                    setDifficulty(e.target.value);
                                }}
                            >
                                <option value="-1">---</option>
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Size:{" "}
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-control"
                                name="size"
                                placeholder="size"
                                value={size}
                                onChange={(e) => {
                                    setError(false);
                                    setSize(e.target.value);
                                }}
                            >
                                <option value="-1">---</option>
                                <option value="Pequeño">Pequeño</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center mt-2 p-3 mb-4">
                        <button
                            className="btn btn-dark btn-lg"
                            onClick={() => {
                                sendCacheRegistral()
                            }}
                        >
                            Registra tu Caché
                        </button>
                        {error ? <p className="alert alert-warning mt-2 ">{error}</p> : null}
                    </div>
                </div>
            </div>

        </section>


    );
};