import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import mapaPirata from "../../img/mapaPirata.png";
import { Link } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const sendLoginCredential = async () => {
        const response = await fetch(
            process.env.BACKEND_URL + "/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            await actions.validateUser();
            navigate("/demo");
            actions.getCaches();
        } else {
            setError(data.response);
        }
    };

    const styles = {
        backgroundImage: `url(${mapaPirata})`,
    };

    return (
        <section className=" bannerlogin" style={styles} >
            <div className="container mt-3 m-3 mb-5 border border-dark border border-3 rounded ">
                <h2 className="text-center m-3">Login </h2>
                <div className=" my-1 p-3">
                    <label className="col-sm-2 col-form-label fw-bold" htmlFor="email">
                        Email:{" "}
                    </label>
                    <div className="mx-auto col-sm-10">
                        <input
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setError(false);
                                setEmail(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    sendLoginCredential()
                                }}}
                        ></input>
                    </div>
                </div>
                <div className="my-2 p-3">
                    <label className="col-sm-2 col-form-label fw-bold" htmlFor="password">
                        Password:{" "}
                    </label>
                    <div className=" mx-auto col-sm-10">
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setError(false);
                                setPassword(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    sendLoginCredential()
                                }}}
                        ></input>
                    </div>
                </div>
                <div className="text-center mt-2 p-3 ">
                    <button
                        className="w-50 btn btn-dark btn-lg"
                        onClick={(e) => {
                            e.preventDefault();
                            sendLoginCredential()
                        }}
                    >
                        Login
                    </button>
                    {error ? (
                        <p className="alert alert-danger">{error}</p>
                    ) : null}
                </div>
                <div className="fw-bold">
                    Or
                </div>
                <div className="text-center mt-2 p-3 ">
                    <Link to="/register" className="text-decoration-none">

                        <button className="w-50 btn btn-dark btn-lg">
                            Register
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
};