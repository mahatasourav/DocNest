import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { getAllDoctors, doctors, aToken, changeAvailablity } =
    useContext(AdminContext);

  useEffect(() => {
    getAllDoctors();
  }, [aToken]);
  return (
    <div>
      <div className="grid grid-cols-5 pt-5 gap-4 px-3 mx-10 sm:px-0 ">
        {doctors &&
          doctors.map((item, index) => (
            <div
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-6px] transition-all duration-300"
            >
              <img
                className="bg-blue-50 hover:bg-blue-400"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center text-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={item.available}
                    onChange={() => changeAvailablity(item._id)}
                  />
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium ">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorList;
