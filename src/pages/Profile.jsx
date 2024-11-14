import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import MovieItem from "../components/MovieItem";
import { createImageUrl } from "../services/movieServices";
import { AiOutlineClose } from "react-icons/ai";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.email), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += offset;
  };

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie),
    });
  };

  return (
    <div>
      <div>
        <img
          className="block w-full h-[500px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/RS-en-20241021-TRIFECTA-perspective_6a349294-4cf0-45f7-8d3a-45d033ba67de_small.jpg"
        />

        <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]"></div>
        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold my-2">My Shows</h1>
          <p className="font-light text-gray-400 text-lg">{user?.email}</p>
        </div>
      </div>

      <h2 className="font-bold capitalize p-2">Fav Shows</h2>

      <div className="relative flex items-center group">
        <FaChevronCircleLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          id={`slider`}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded overflow-hidden m-2 cursor-pointer"
            >
              <img
                className="w-full h-40 block object-cover object-top"
                src={createImageUrl(movie.backdrop_path, "w500")}
                alt={movie.title}
              />
              <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p className="whitespace-normal text-sm md:text-sm flex justify-center items-center h-full font-bold">
                  {movie.title}
                </p>

                <p>
                  <AiOutlineClose
                    className="absolute right-0 top-0"
                    size={25}
                    onClick={() => handleUnlikeShow(movie)}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
        <FaChevronCircleRight
          onClick={() => slide(+500)}
          className="bg-white rounded-full absolute right-2 text-gray-700 z-10 opacity-80 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </div>
  );
};

export default Profile;
