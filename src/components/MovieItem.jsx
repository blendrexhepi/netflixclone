import React, { useState } from "react";
import { createImageUrl } from "../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

const MovieItem = ({ movie }) => {
  const [like, setLike] = useState(false);

  const { user } = useAuth();

  const markFavShow = async () => {
    const userEmail = user?.email;

    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
    } else {
      alert("Please login to mark as favourite");
    }
  };

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded overflow-hidden m-2 cursor-pointer">
      <img
        className="w-full h-40 block object-cover object-top"
        src={createImageUrl(movie.backdrop_path, "w500")}
        alt={movie.title}
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-sm md:text-sm flex justify-center items-center h-full font-bold">
          {movie.title}
        </p>
        <p className="cursor-pointer" onClick={markFavShow}>
          {like ? (
            <FaHeart
              size={20}
              className="absolute top-2 left-2 text-gray-300"
            />
          ) : (
            <FaRegHeart
              className="absolute top-2 left-2 text-gray-300"
              size={20}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default MovieItem;
