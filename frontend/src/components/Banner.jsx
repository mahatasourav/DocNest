import React, { useContext } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex bg-primaryColor rounded-lg px-6 sm:px-10 md:px-14 my-16 md:mx-10
  justify-between text-white  md:pt-6"
    >
      {/* ------Left Side ------- */}
      <div className="flex-1 lg:pl-5 py-10 md:py-16 lg:py-24 mb-1">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("login");

            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-500 px-8 py-2 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account
        </button>
      </div>
      {/* ------Right Side ------- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-med"
          src={assets.appointment_img}
          alt=""
          srcSet=""
        />
      </div>
    </div>
  );
};

export default Banner;
