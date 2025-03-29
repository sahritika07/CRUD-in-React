import React from "react";
import "./style.css";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup";
import Error from "./Components/Error";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
