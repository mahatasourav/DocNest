import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddDoctor from "./pages/Admin/AddDoctor";
import AllApointments from "./pages/Admin/AllApointments";
import Dashboard from "./pages/Admin/Dashboard";
import DoctorList from "./pages/Admin/DoctorList";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <>
      {aToken ? (
        <div>
          <ToastContainer />
          <Navbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              <Route path="/" element={<></>} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/all-apointments" element={<AllApointments />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor-list" element={<DoctorList />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          <Login />
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default App;
