import { createContext } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const currencySymbol = "$";
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctor/doctor-list");
      console.log("data", data);
      setDoctors(data.doctors);
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/get-profile", {
        headers: { token: token },
      });

      if (data.success) {
        console.log("user profile data", data);
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendurl,
    userData,
    setUserData,
    loadUserProfileData,
    getDoctorsData,
  };
  useEffect(() => {
    getDoctorsData();
  }, []);
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
