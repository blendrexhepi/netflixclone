import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const MovieRow = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const rowId = Math.floor(Math.random() * 1000);

  useEffect(() => {
    axios.get(url).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowId);
    slider.scrollLeft += offset;
  };

  return (
    <>
      <h2 className="font-bold capitalize p-2">{title}</h2>

      <div className="relative flex items-center group">
        <FaChevronCircleLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          id={`slider` + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieItem movie={movie} key={movie.id} />
          ))}
        </div>
        <FaChevronCircleRight
          onClick={() => slide(+500)}
          className="bg-white rounded-full absolute right-2 text-gray-700 z-10 opacity-80 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </>
  );
};

export default MovieRow;
