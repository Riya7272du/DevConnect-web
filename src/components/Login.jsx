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

  const resetFields = () => {
    setEmailId("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setError("");
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      resetFields();
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed! Try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      resetFields();
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Sign-up failed! Try again.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-900">
      {/* Branding Section */}
      <div className="sm:w-1/2 flex flex-col justify-center items-center bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white p-4 sm:p-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Developers Connect</h1>
        <p className="text-lg text-gray-400 mb-6 text-center px-6">
          Join the community of developers to connect, collaborate, and code.
        </p>
      </div>

      {/* Form Section */}
      <div className="w-full sm:w-1/2 flex justify-center items-center p-4">
        <div className="card bg-gray-300 w-full max-w-sm shadow-lg rounded-lg p-6">
          <div className="card-body">
            <h2 className="text-center text-xl font-semibold mb-4 text-gray-800">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <form>
              {!isLoginForm && (
                <>
                  <label className="form-control w-full my-3">
                    <span className="font-medium text-gray-600">First Name</span>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full mt-2 bg-gray-100 text-gray-900"
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </label>
                  <label className="form-control w-full my-3">
                    <span className="font-medium text-gray-600">Last Name</span>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full mt-2 bg-gray-100 text-gray-900"
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </label>
                </>
              )}
              <label className="form-control w-full my-3">
                <span className="font-medium text-gray-600">Email ID</span>
                <input
                  type="email"
                  value={emailId}
                  className="input input-bordered w-full mt-2 bg-gray-100 text-gray-900"
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="Enter your email"
                />
              </label>
              <label className="form-control w-full my-3">
                <span className="font-medium text-gray-600">Password</span>
                <input
                  type="password"
                  value={password}
                  className="input input-bordered w-full mt-2 bg-gray-100 text-gray-900"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </label>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="btn bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white w-full"
                  onClick={isLoginForm ? handleLogin : handleSignUp}
                >
                  {isLoginForm ? "Login" : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-4">
              <p
                className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                onClick={() => {
                  setIsLoginForm((prev) => !prev);
                  resetFields();
                }}
              >
                {isLoginForm
                  ? "New to Developers Connect? Sign Up here"
                  : "Already have an account? Login here"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
