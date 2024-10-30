import React from "react";
// import NavBar from "./NavBar";
import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/profile"; // Ensure the casing matches your file name
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path ="/" element={<Feed />} /> {/* Default route for "/" */}
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
