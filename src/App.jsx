import React from "react";
// import NavBar from "./NavBar";
import Body from "./Body";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Profile from "./profile";
import Login from "./Login";
function App() {
  return (
    <>
     <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />}/>
          <Route path="/profile" element={<Profile />}/>
          </Route>
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
