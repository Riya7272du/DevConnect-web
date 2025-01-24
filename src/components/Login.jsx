import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/");
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err?.response?.message || "Something went wrong");
    }
  }

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      return navigate("/");
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err?.response?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 via-purple-500 to-blue-500 pt-24">


      <div className="card bg-base-100 w-96 shadow-2xl rounded-lg -mt-40 ">
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-bold text-center text-primary mb-6 justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <form>
            {!isLoginForm && (<>
              <label className="form-control w-full max-w-xs my-4">
                <span className="label-text text-base font-semibold text-gray-700">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your First Name"
                />
              </label>
              <label className="form-control w-full max-w-xs my-4">
                <span className="label-text text-base font-semibold text-gray-700">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your Last Name"
                />
              </label></>)}
            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text text-base font-semibold text-gray-700">Email ID</span>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter your email"
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text text-base font-semibold text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </label>
            <p className="text-red-500">{error}</p>
            <div className="flex justify-center mt-6">
              <button type="button" className="btn btn-primary w-full max-w-xs text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600" onClick={isLoginForm ? handleLogin : handleSignUp}>
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            {/* <p className="text-red-500" onClick={()=>setIsLoginForm(value=>!value)}>
              {isLoginForm?"New User? SignUp here":"Existing User? Login Here"}</p> */}
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm cursor-pointer" onClick={() => setIsLoginForm(value => !value)}>
              {/* <p className="text-red-500" > */}
              {isLoginForm ? "New User? SignUp here" : "Existing User? Login Here"}</p>
            {/* Don't have an account?{" "}
              <a href="#" className="text-primary font-medium hover:underline">Sign up</a> */}
            {/* </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
