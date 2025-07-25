import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center justify-center gap-5 rounded-lg p-6 mt-10"
    >
      <p className="text-3xl font-medium">Find by Speciality</p>
      <p className="text-center text-1xl font-semibold text-gray-600">
        Simply browse through our extensive list of trusted doctors,
        <br /> schedule your appointment hassle-free.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer text-shrink-0 hover:translate-y-[-10px] transition-all duration-300"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img
              className="w-16 sm:w-24 mb-2"
              src={item.image}
              alt=""
              srcSet=""
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
