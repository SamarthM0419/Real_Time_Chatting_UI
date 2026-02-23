import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("samarth2534@gmail.com");
  const [password, setPassword] = useState("Samarth@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "auth/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-base-300 to-base-200 
                    px-4 pb-24"
    >
      <div className="card w-full max-w-md bg-base-100/80 backdrop-blur-md shadow-xl border border-primary/20 rounded-2xl">
        <div className="card-body space-y-5">
          <h2 className="text-3xl font-bold text-center text-primary tracking-wide">
            Welcome Back
          </h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80">Username:</span>
            </label>
            <input
              type="text"
              value={emailId}
              placeholder="Enter your username"
              className="input input-bordered bg-base-200/60 focus:border-primary focus:outline-none"
              onChange={() => setEmailId(emailId.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content/80">Password:</span>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="input input-bordered bg-base-200/60 focus:border-primary focus:outline-none"
              onChange={() => setPassword(password.target.value)}
            />
          </div>
          <p className="text-red-600">Error Message</p>
          <div className="pt-2">
            <button
              className="btn btn-primary w-full text-base font-semibold tracking-wide hover:scale-[1.02] transition-all duration-300"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <p className="text-center text-sm text-base-content/60">
            Don’t have an account?{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
