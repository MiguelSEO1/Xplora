import React, { Component } from "react";
import { Link } from "react-router-dom";

export const ClustersCaches = ({ image, link }) => {
	return (
		<div className="card text-bg-dark border-0 ">
			<Link to={link} className="text-decoration-none">
				<img src={image} className="card-img border-dark border border-1 " alt="..." />
			</Link>

		</div>

	)
};