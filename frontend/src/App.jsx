import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Appoinment from "./pages/Appoinment";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctor from "./pages/Doctor";
import MyAppoinment from "./pages/MyAppoinment";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appoinment />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:specality" element={<Doctor />} />
        <Route path="/my-appoinment" element={<MyAppoinment />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
