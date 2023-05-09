import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import mapaPirata from "../../img/mapaPirata.png";
import { Link } from "react-router-dom";

export const Register = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUserName] = useState("");
	const [error, setError] = useState("");

	const sendRegisterCredential = async () => {
		const response = await fetch(
			process.env.BACKEND_URL + "/api/register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					name: username,
				}),
			}
		);
		const data = await response.json();
		if (response.ok) {
			navigate("/login");
		} else {
			setError(data.response);
		}
	};

	const styles = {
        backgroundImage: `url(${mapaPirata})`,
      };

	return (
		<section className="bannerlogin" style={styles} >

		<div className="container mt-3 m-3 mb-5 border border-dark border border-3 rounded ">
			<h2 className="text-center m-3">Register</h2>
			<div className=" my-3 px-3">
				<label className="col-sm-2 col-form-label fw-bold" htmlFor="email">
					Username:{" "}
				</label>
				<div className="mx-auto col-sm-10">
					<input
						className="form-control"
						name="username"
						placeholder="Username"
						value={username}
						onChange={(e) => {
							setError(false);
							setUserName(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								sendRegisterCredential();
							}}}
					></input>
				</div>
			</div>
			<div className=" my-3 px-3">
				<label className="col-sm-2 col-form-label fw-bold" htmlFor="email">
					Email:{" "}
				</label>
				<div className="mx-auto col-sm-10">
					<input
						className="form-control"
						name="email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => {
							setError(false);
							setEmail(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								sendRegisterCredential();
							}}}
					></input>
				</div>
			</div>
			<div className=" my-3 px-3">
				<label className="col-sm-2 col-form-label fw-bold " htmlFor="password">
					Password:{" "}
				</label>
				<div className="mx-auto col-sm-10">
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
								sendRegisterCredential();
							}}}
					></input>
				</div>
			</div>
			<div className="text-center mt-2 p-3 ">
				<button
					className="w-50 btn btn-dark btn-lg"
					onClick={() => {
						// const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
						// if (email && email.match(isValidEmail)) {
						// 	sendRegisterCredential();
						// }
						sendRegisterCredential();
					}}
				>
					Register
				</button>
				{error ? <p className="alert alert-danger mt-2">{error}</p> : null}
			</div>
			<div className="fw-bold">
                    Or
                </div>
                <div className="text-center mt-2 p-3 ">
                    <Link to="/login" className="text-decoration-none">

                        <button className="w-50 btn btn-dark btn-lg">
                            Login
                        </button>
                    </Link>

                </div>
		</div>
		</section>

	);
};