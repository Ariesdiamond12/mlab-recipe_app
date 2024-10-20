import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/add-recipe/:id" element={<AddRecipe />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
