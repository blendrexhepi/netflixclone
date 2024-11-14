import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full  object-cover "
        alt="signup img"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/RS-en-20241021-TRIFECTA-perspective_6a349294-4cf0-45f7-8d3a-45d033ba67de_small.jpg"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen" />

      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/70 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <form className="w-full flex flex-col py-4" onSubmit={handleSubmit}>
              <input
                className="p-3 my-2 rounded bg-gray-700"
                type="email"
                placeholder="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 my-2 rounded bg-gray-700"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="bg-red-600 py-3 my-6 font-semibold rounded">
                Sign Up
              </button>
              <div className="flex justify-between items-center  text-gray-600">
                <p>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberLogin}
                    onChange={(e) => setRememberLogin(!rememberLogin)}
                  />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="my-4 ">
                <span className="text-gray-600 mr-2">
                  Already Subscribed in Netflix?
                </span>
                <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
