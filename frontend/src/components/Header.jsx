import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex md:flex-row flex-col bg-primaryColor flex-wrap items-center justify-center gap-6 rounded-lg px-4 md:px-6 lg:px-10 ">
      {/* ------- Left Side ----- */}
      <div className="  flex flex-col md:items-start sm:items-center justify-center gap-5">
        <p className="  text-2xl md:text-5xl font-bold text-white m-auto">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row  items-center gap-3 justify-center text-white text-sm font-semibold">
          <img className="w-28" src={assets.group_profiles} alt="" srcSet="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center justify-center gap-2 bg-white text-grey  px-10 py-4  rounded-full hover:scale-105 transition-all duration-300"
        >
          Book Appoinment{" "}
          <img src={assets.arrow_icon} alt="" srcSet="" className="w-3" />
        </a>
      </div>
      {/* ------- Right Side ----- */}
      <div className="md:w-1/2 relative ">
        <img
          className="w-full h-5/6 absoulte  "
          src={assets.header_img}
          alt=""
          srcSet=""
        />
      </div>
    </div>
  );
};

export default Header;
