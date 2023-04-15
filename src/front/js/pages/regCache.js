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
    const [postalCode, setPostalCode] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [size, setSize] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState({});
    const [comunidades, setComunidades] = useState([]);
    const [comunidadID, setComunidadID] = useState(null);
    const [provincias, setProvincias] = useState([]);
    const [provinciaID, setProvinciaID] = useState(null);
    const [municipios, setMunicipios] = useState([]);
    const [municipioID, setMunicipioID] = useState(null);

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
                    postal_code: postalCode,
                    comunidad_autonoma: comunidades.find(x => x.CCOM == comunidadID).COM,
                    provincia: provincias.find(x => x.CPRO == provinciaID).PRO,
                    municipio: municipios.find(x => x.CMUM == municipioID).DMUN50,
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
        const getComunidades = async () => {
            const responseComunidades = await fetch("https://apiv1.geoapi.es/comunidades?type=JSON&key=3ee9e9f2d898f2fd4c7343693f8fb18ec64ecee21d7e31c84bf49d2ba1bd8ca8",
                {
                    method: "GET"
                }
            );
            const dataComunidades = await responseComunidades.json();
            setComunidades(dataComunidades.data);
        }
        getComunidades();
    }, []);

    useEffect(() => {
        const getProvincias = async () => {
            const responseProvincias = await fetch(`https://apiv1.geoapi.es/provincias?CCOM=${comunidadID}&type=JSON&key=3ee9e9f2d898f2fd4c7343693f8fb18ec64ecee21d7e31c84bf49d2ba1bd8ca8`,
                {
                    method: "GET"
                }
            );
            const dataProvincias = await responseProvincias.json();
            setProvincias(dataProvincias.data);
        }
        getProvincias();
    }, [comunidadID]);

    useEffect(() => {
        const getMunicipios = async () => {
            const responseMunicipios = await fetch(`https://apiv1.geoapi.es/municipios?CPRO=${provinciaID}&type=JSON&key=3ee9e9f2d898f2fd4c7343693f8fb18ec64ecee21d7e31c84bf49d2ba1bd8ca8`,
                {
                    method: "GET"
                }
            );
            const dataMunicipios = await responseMunicipios.json();
            setMunicipios(dataMunicipios.data);
        }
        getMunicipios();
    }, [provinciaID]);

    const handleComunidad = (event) => {
        const getComunidadID = event.target.value;
        setComunidadID(getComunidadID);
    };

    const handleProvincia = (event) => {
        const getProvinciaID = event.target.value;
        setProvinciaID(getProvinciaID);
    };


    const styles = {
        backgroundImage: `url(${mapaPirata})`,
    };

    return (
        <section className="mx-auto cuerpo" >
            <div className="text-center my-5">
                <h1 className="text-center">Crea y Registra tú Caché</h1>
            </div>
            <div className=" container mx-auto row row-cols-lg-2 row-cols-md-2 row-cols-sm-1  ">

                <div className=" MapGoo mt-4 ">
                    <MapsGoogle setData={setData} />
                </div>

                <div className=" registro border border-dark border border-2 rounded p-2  mt-3 border rounded mb-5">
                    <h2 className="text-center my-4 text-danger">Crea y Registra tú Caché</h2>
                    <div className=" row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Latitud:{" "}
                        </label>
                        <div className="col-sm-10">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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
                    <div className="row row-cols-lg-1 d-flex justify-content-center mx-auto my-3">
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