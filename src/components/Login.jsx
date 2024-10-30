import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./../utils/constants";

const Login = () => {
const [emailId,setEmailId]=useState("riya@gmail.com");
const [password,setPassword]=useState("Riyaa@123");
const dispatch=useDispatch();
const navigate=useNavigate();
const handleLogin=async()=>{

  try{
    const res=await axios.post(BASE_URL+"/login",{
    emailId,
    password,
  },{withCredentials:true});
  dispatch(addUser(res.data));
 return navigate("/");
}
catch(err){
  console.error(err);
}
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 via-purple-500 to-blue-500">
      <div className="card bg-base-100 w-96 shadow-2xl rounded-lg -mt-40">
        <div className="card-body p-8">
          <h2 className="card-title text-3xl font-bold text-center text-primary mb-6 justify-center">Login</h2>
          <form>
            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text text-base font-semibold text-gray-700">Email ID</span>
              <input 
                type="text" 
                value={emailId}
                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                onChange={(e)=> setEmailId(e.target.value)}
                placeholder="Enter your email" 
              />
            </label>
            <label className="form-control w-full max-w-xs my-4">
              <span className="label-text text-base font-semibold text-gray-700">Password</span>
              <input 
                type="text"
                value={password} 
                className="input input-bordered w-full max-w-xs mt-2 bg-white text-gray-900"
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Enter your password" 
              />
            </label>
            <div className="flex justify-center mt-6">
              <button type="button" className="btn btn-primary w-full max-w-xs text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <a href="#" className="text-primary font-medium hover:underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
