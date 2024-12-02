import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner({movie}) {

     

	return (
		<header
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("${movie.source}")`,
				backgroundPosition: "center center",
			}}>
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie.name}
				</h1>
				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>
				<h1 className="banner__description">
					{movie.description}
				</h1>
			</div>
			<div className="banner__fadeBottom" />
		</header>
	);
}

export default Banner;
