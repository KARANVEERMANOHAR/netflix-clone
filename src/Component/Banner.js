import React, { useEffect, useState } from "react";
import "./Style/Banner.css";
import axios from "./axios";
import requests from "./Request";
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOrignals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <header
      Banner
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${
          movie.backdrop_path || movie?.poster_path
        }")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.orignal_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_discription">
          {truncate(`${movie.overview}`, 150)}
        </h1>
      </div>
      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
