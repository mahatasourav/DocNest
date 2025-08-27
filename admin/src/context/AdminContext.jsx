import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAtoken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboard, setDashboard] = useState(false);
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/admin/all-doctors",

        { headers: { aToken: aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log("All doctors", data.doctors);
      } else {
        toast.error(data.message);
        console.log("data is", data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  const changeAvailablity = async (docId) => {
    try {
      console.log("docId is", docId);
      const { data } = await axios.post(
        backendurl + "/api/admin/change-availablity",
        { docId },
        { headers: { aToken: aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  // getting here all apointments --->
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/admin/all-appointments",
        { headers: { aToken: aToken } }
      );

      if (data.success) {
        setAppointments([...data.appointments].reverse());

        console.log("All Appointments", data.appointments);
      } else {
        toast.error(data.message);
        console.log("data is", data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  const dashboardData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/admin/dashboard", {
        headers: { aToken: aToken },
      });
      if (data.success) {
        console.log("data", data);
        setDashboard(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  const cancelledAppointmentByAdmin = async (appointmentId) => {
    try {
      console.log("aToken", aToken);
      const { data } = await axios.post(
        backendurl + "/api/admin/cancelled-appointment",
        { appointmentId },
        { headers: { aToken: aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
        dashboardData();
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  const value = {
    aToken,
    setAtoken,
    backendurl,
    doctors,
    getAllDoctors,
    changeAvailablity,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelledAppointmentByAdmin,
    dashboardData,
    dashboard,
    setDashboard,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
