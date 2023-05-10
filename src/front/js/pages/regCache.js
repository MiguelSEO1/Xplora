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
    const [alertNameCache, setAlertNameCache] = useState("");
    const [alertTotalCreateCache, setAlertTotalCreateCache] = useState("");
    const [alertDescription, setAlertDescription] = useState("");
    const [alertPostalCode, setAlertPostalCode] = useState("");
    const [alertDifficulty, setAlertDifficulty] = useState("");
    const [alertSize, setAlertSize] = useState("");
    const [alertComunidades, setAlertComunidades] = useState("");
    const [alertProvincias, setAlertProvincias] = useState("");
    const [alertLatCache, setAlertLatCache] = useState("");
    const [alertLngCache, setAlertLngCache] = useState("");




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

    const handleComunidad = (event) => {
        const getComunidadID = event.target.value;
        setComunidadID(getComunidadID);
    };

    const styles = {
        backgroundImage: `url(${mapaPirata})`,
    };

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
                            Nombre:{" "}
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
                                    setAlertNameCache(false);
                                    setAlertTotalCreateCache(false);
                                }}
                                onKeyUp={async (e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      if (name.trim() === "") {
                                        setAlertNameCache("Por favor, ingrese un nombre de caché.");
                                      } else if (description.trim() === "") {
                                        setAlertDescription("Por favor, ingrese una descripción adecuada de caché.");
                                      } else if (postalCode.trim() === "") {
                                        setAlertPostalCode("Por favor, ingrese un código postal de ubicación del caché.");
                                      } else if (!data.lat) {
                                        setAlertLatCache("Por favor, ingrese coordenadas de Latitud válidas del caché.");
                                      } else if (isNaN(data.lat)) {
                                        setAlertLatCache("Por favor, ingrese coordenadas de Latitud válidas del caché.");
                                      } else if (!data.lng) {
                                        setAlertLngCache("Por favor, ingrese coordenadas de Longitud válidas del caché.");
                                      } else if (isNaN(data.lng)) {
                                        setAlertLngCache("Por favor, ingrese coordenadas de Longitud válidas del caché.");
                                      } else if (comunidadID === null) {
                                        setAlertComunidades("Por favor, seleccione una Comunidad Autónoma.");
                                      }else if (!comunidadID) {
                                        setAlertComunidades("Por favor, seleccione una Comunidad Autónoma.");
                                      }else if (provinciaID === null) {
                                        setAlertProvincias("Por favor, seleccione una Provincia.");
                                      }else if (!provinciaID) {
                                        setAlertProvincias("Por favor, seleccione una Comunidad Autónoma.");
                                      }else if (difficulty === "") {
                                        setAlertDifficulty("Por favor, seleccione un nivel de dificultad del caché.");
                                      }else if (!difficulty) {
                                        setAlertDifficulty("Por favor, seleccione un nivel de dificultad del caché.");
                                      } else if (size === "") {
                                        setAlertSize("Por favor, seleccione un nivel de tamaño del caché.");
                                      }else if (!size) {
                                        setAlertSize("Por favor, seleccione un nivel de tamaño del caché.");
                                      }
                                      else {
                                        sendCacheRegistral();
                                        setAlertTotalCreateCache("Cambios actualizados correctamente");
                                      }
                                    }
                                  }}
                                  

                            ></input>
                            {alertNameCache ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertNameCache}
                                </div>
                            ) : null}
                             {error ? <p className="label alert alert-danger mt-2 ">{error}</p> : null}
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Descripción:{" "}
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
                                    setAlertDescription(false);
                                    setAlertTotalCreateCache(false);
                                }}
                                onKeyUp={async (e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (description.trim() != "") {
                                            sendCacheRegistral();;
                                            setAlertTotalCreateCache("Cambios actualizados correctamente");
                                        } else if (description.trim() === "") {
                                            setAlertDescription("Por favor, ingrese una descripción adecuada de caché.");
                                        }
                                    }

                                }
                                }

                            ></input>
                            {alertDescription ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertDescription}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            País:{" "}
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-select"
                                name="Country"
                                value="España"
                                onChange={(e) => {
                                    setError(false);
                                    setAlertPostalCode(false);
                                    setAlertTotalCreateCache(false);
                                }}>
                                <option value="1">España</option>
                            </select>
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            CCAA:{" "}
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-select"
                                name="State"
                                value={comunidadID}
                                onChange={(e) => {
                                    setError(false);
                                    handleComunidad(e);
                                    setAlertComunidades(false);
                                    setAlertTotalCreateCache(false);
                                    
                                }}>
                                <option value="">Selecciona Comunidad Autónoma</option>
                                {
                                    comunidades.map((comunidad, index) => (
                                        <option key={index} value={comunidad.CCOM}>{comunidad.COM}</option>
                                    ))
                                }
                            </select>
                            {alertComunidades ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertComunidades}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="row row-cols-lg-1 row-cols-md-1 d-flex justify-content-center mx-auto my-3">
                        <label className=" text-center mx-auto col-sm-2 col-form-label fw-bold" htmlFor="description">
                            Provincia:{" "}
                        </label>
                        <div className="col-sm-10">
                            <select
                                className="form-select"
                                name="City"
                                value={provinciaID}
                                onChange={(e) => {
                                    setError(false);
                                    setProvinciaID(e.target.value)
                                    setAlertProvincias(false);
                                    setAlertTotalCreateCache(false);
                                }}
                            >
                                <option value="">Selecciona Povincia</option>
                                {
                                    provincias.map((provincia, index) => (
                                        <option key={index} value={provincia.CPRO}>{provincia.PRO}</option>
                                    ))
                                }
                            </select>
                            {alertProvincias ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertProvincias}
                                </div>
                            ) : null}
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
                                    setAlertPostalCode(false);
                                    setAlertTotalCreateCache(false);
                                }}
                                onKeyUp={async (e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (postalCode.trim() != "") {
                                            sendCacheRegistral();;
                                            setAlertTotalCreateCache("Cambios actualizados correctamente");
                                        } else if (postalCode.trim() === "") {
                                            setAlertPostalCode("Por favor, ingrese un código postal de ubicaión del caché.");
                                        }
                                    }
                                }
                                }
                            ></input>
                            {alertPostalCode ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertPostalCode}
                                </div>
                            ) : null}
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
                                    setAlertLatCache(false);
                                    setAlertTotalCreateCache(false);
                                }}
                                onKeyUp={async (e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (!data.lat) {
                                            setAlertLatCache("Por favor, ingrese coordenadas válidas del caché.");
                                        } else if (isNaN(data.lat)) {
                                            setAlertLatCache("Por favor, ingrese un número válido para las coordenadas del caché.");
                                        } else {
                                            sendCacheRegistral();
                                            setAlertTotalCreateCache("Cambios actualizados correctamente");
                                        }
                                    }
                                }}
                                
                                
                                
                            ></input>
                            {alertLatCache ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertLatCache}
                                </div>
                            ) : null}
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
                                    setAlertLngCache(false);
                                    setAlertTotalCreateCache(false);
                                }}onKeyUp={async (e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (!data.lng) {
                                            setAlertLngCache("Por favor, ingrese coordenadas válidas del caché.");
                                        } else if (isNaN(data.lng)) {
                                            setAlertLngCache("Por favor, ingrese un número válido para las coordenadas del caché.");
                                        } else {
                                            sendCacheRegistral();
                                            setAlertTotalCreateCache("Cambios actualizados correctamente");
                                        }
                                    }
                                }}
                                
                            ></input>
                            {alertLngCache ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertLngCache}
                                </div>
                            ) : null}
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
                                    setAlertDifficulty(false);
                                    setAlertTotalCreateCache(false);
                                }}
                            >
                                <option value="">---</option>
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                            {alertDifficulty ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertDifficulty}
                                </div>
                            ) : null}
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
                                    setAlertSize(false);
                                    setAlertTotalCreateCache(false);
                                }}
                            >
                                <option value="">---</option>
                                <option value="Pequeño">Pequeño</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                            </select>
                            {alertSize ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertSize}
                                </div>
                            ) : null}
                        </div>
                        
                    </div>
                    <div className="text-center mt-2 p-3 mb-4">
                        <button
                            className="btn btn-dark btn-lg"
                            onClick={() => {
                                if (name.trim() === "") {
                                    setAlertNameCache("Por favor, ingrese un nombre de caché.");
                                  } else if (description.trim() === "") {
                                    setAlertDescription("Por favor, ingrese una descripción adecuada de caché.");
                                  } else if (postalCode.trim() === "") {
                                    setAlertPostalCode("Por favor, ingrese un código postal de ubicación del caché.");
                                  } else if (!data.lat) {
                                    setAlertLatCache("Por favor, ingrese coordenadas de Latitud válidas del caché.");
                                  } else if (isNaN(data.lat)) {
                                    setAlertLatCache("Por favor, ingrese coordenadas de Latitud válidas del caché.");
                                  } else if (!data.lng) {
                                    setAlertLngCache("Por favor, ingrese coordenadas de Longitud válidas del caché.");
                                  } else if (isNaN(data.lng)) {
                                    setAlertLngCache("Por favor, ingrese coordenadas de Longitud válidas del caché.");
                                  } else if (comunidadID === null) {
                                    setAlertComunidades("Por favor, seleccione una Comunidad Autónoma.");
                                  }else if (!comunidadID) {
                                    setAlertComunidades("Por favor, seleccione una Comunidad Autónoma.");
                                  }else if (provinciaID === null) {
                                    setAlertProvincias("Por favor, seleccione una Provincia.");
                                  }else if (!provinciaID) {
                                    setAlertProvincias("Por favor, seleccione una Comunidad Autónoma.");
                                  }else if (difficulty === "") {
                                    setAlertDifficulty("Por favor, seleccione un nivel de dificultad del caché.");
                                  }else if (!difficulty) {
                                    setAlertDifficulty("Por favor, seleccione un nivel de dificultad del caché.");
                                  } else if (size === "") {
                                    setAlertSize("Por favor, seleccione un nivel de tamaño del caché.");
                                  }else if (!size) {
                                    setAlertSize("Por favor, seleccione un nivel de tamaño del caché.");
                                  }
                                  else {
                                    sendCacheRegistral();
                                    setAlertTotalCreateCache("Cambios actualizados correctamente");
                                  }
                            }}
                        >
                            Registra tu Caché
                        </button>
                       
                        {alertTotalCreateCache ? (
                                <div className=" label alert alert-danger" role="alert">
                                    {alertTotalCreateCache}
                                </div>
                            ) : null}
                    </div>

                </div>
            </div>

        </section>


    );
};