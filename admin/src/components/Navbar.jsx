import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAtoken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-2 sm:pb-4 mt-4 border-b-2  bg-white">
      <div className="flex gap-4 justify-center items-center ">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
          srcset=""
        />
        <p className="px-2 sm:px-4 py-1 border border-gray-500 rounded-full text-xs cursor-pointer ">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        className="bg-primary text-white border rounded-full px-6 sm:px-10 py-1 sm:py-2 text-xs"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
