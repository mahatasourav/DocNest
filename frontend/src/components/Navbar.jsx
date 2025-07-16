import React, { use, useState } from "react";
import { assets } from "../assets/assets_frontend/assets"; // Assuming you have an assets folder for images
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex justify-between items-center py-4 text-sm mb-4 border-b border-b-gray-400">
      <img className="w-46 cursor-pointer" src={assets.logo} alt="" srcSet="" />
      <ul className="hidden md:flex items-start gap-6 font-semibold">
        <NavLink to={"/"}>
          <li className="py-1">HOME</li>
          <hr className=" border-none outline-none h-0.5 w-4/5 bg-primaryColor m-auto hidden " />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">ALL DOCTORS </li>
          <hr className=" border-none outline-none h-0.5 w-4/5 bg-primaryColor m-auto hidden " />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
          <hr className=" border-none outline-none h-0.5 w-4/5 bg-primaryColor m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className=" border-none outline-none h-0.5 w-4/5 bg-primaryColor m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flesx items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative ">
            <img
              className="w-10 rounded-full   "
              src={assets.profile_pic}
              alt=""
              srcset=""
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt=""
              srcset=""
            />
            <div className="absolute top-full right-0 pt-8 bg-white text-base font-medium  p-4 z-20 hidden group-hover:block ">
              <div className="flex flex-col gap-4 p-4 w-auto">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appoinment")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appoinments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Log Out
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primaryColor text-white px-8 py-3 font-light rounded-full md:block hidden"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
