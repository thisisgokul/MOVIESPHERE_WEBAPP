import React from "react";
import Home from "./sections/Home";
import Signup from "./sections/Signup"
import Login from "./sections/Login"
import { Route,Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Home" element={<Home/>}/>
    </Routes>
  );
};

export default App;
