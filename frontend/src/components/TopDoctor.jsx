import React, { use, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-6 mt-14">
      <h1 className="text-3xl  font-medium font-mono">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
          >
            <img className="bg-blue-50" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center text-center gap-2 text-green-500">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium ">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="text-gray-600 bg-blue-50 px-12 py-3 rounded-full mt-4 md:mt-10 hover:bg-blue-100 transition-all duration-300"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctor;
