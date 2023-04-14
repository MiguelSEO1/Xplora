import React, { Component } from "react";
import { Link } from "react-router-dom";

export const ClustersCaches = ({ image, link, onClick }) => {
	return (
		<div className="  container mb-3 d-flex">
			<div className="col clusterscaches">
				<div className=" clusterscaches clusters card ">
					<Link to={link} className="text-decoration-none" onClick={onClick}>
						<img src={image} className="card-img border-dark  " alt="..." />
					</Link>
				</div>
			</div>
		</div>

	)
};