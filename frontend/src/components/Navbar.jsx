import React, { use, useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets"; // Assuming you have an assets folder for images
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const Logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between  items-center py-4 text-sm mb-4 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-46 cursor-pointer"
        src={assets.logo}
        alt=""
        srcSet=""
      />
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
      <div className="flex items-center gap-4 pl-1 md:pl-10 ">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative ml-10 lg:ml-36">
            <img
              className="w-10 h-10 rounded-full object-cover "
              src={userData.image}
              alt=""
              srcSet=""
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt=""
              srcSet=""
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
                  onClick={() => navigate("/my-appointment")}
                  className="hover:text-black cursor-pointer"
                >
                  Appoinments
                </p>
                <p onClick={Logout} className="hover:text-black cursor-pointer">
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
        <img
          onClick={() => setShowMenu(true)}
          src={assets.menu_icon}
          alt=""
          srcset=""
          className=" w-6 md:hidden"
        />

        {/* ---- Mobile Menu ------ */}
        <div
          className={`${
            showMenu ? "fixed w-full " : "h-0 w-0"
          } md:hidden right-0 bottom-0 top-0 overflow-hidden z-30 bg-white transition-all duration-300`}
        >
          <div className="flex justify-between items-center px-8 mt-4">
            <img className="w-36 cursor-pointer" src={assets.logo} alt="" />
            <img
              className="w-10"
              src={assets.cross_icon}
              alt=""
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-6 mt-12 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-3 py-2 rounded inline-block"> Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-3 py-2 rounded inline-block"> ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-3 py-2 rounded inline-block"> ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-3 py-2 rounded inline-block"> CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
