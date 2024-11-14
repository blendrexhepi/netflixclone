import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" absolute flex justify-between w-full items-center p-4 z-50">
      <Link to="/">
        <h1 className="text-red-500 font-bold text-4xl">NETFLIX</h1>
      </Link>

      {user?.email ? (
        <div>
          <Link to="/profile">
            <button className="pr-4">Profile</button>
          </Link>

          <Link to="/signup">
            <button
              onClick={handleLogout}
              className="bg-red-500 px-6 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="pr-4">Log In</button>
          </Link>

          <Link to="/signup">
            <button className="bg-red-500 px-6 py-2 rounded cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
