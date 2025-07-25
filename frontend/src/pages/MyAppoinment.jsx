import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Myappoinment = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col gap-4 mt-12">
      <p className="text-gray-600 font-medium text-lg ">My Appointments</p>
      <hr cclassName="h-[0.5px] bg-gray-300 border-none my-4" />
      <div>
        {doctors.slice(0, 4).map((item, index) => (
          <div>
            <div key={index} className="flex gap-10 justify-between ">
              <div>
                <img
                  className="w-[134px] bg-indigo-50"
                  src={item.image}
                  alt=""
                  srcset=""
                />
              </div>
              <div className="flex-1 text-sm text-zinc-700 gap-3">
                <p className="font-bold text-black">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
                <p className="text-md text-gray-800">Address :</p>
                <p className="text-sm text-gray-500">{item.address.line1}</p>
                <p className="text-sm text-gray-500">{item.address.line2}</p>
                <p className="text-sm text-gray-900 font-medium">
                  Date & Time :{" "}
                  <span className=" text-gray-500">28 Aug 2025 | 10:30 AM</span>
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end  ">
                <button className="tex-sm text-stone-500 sm:min-w-48 text-center py-2 border hover:bg-primaryColor hover:text-white transition-all duration-300 rounded-md">
                  Pay Online
                </button>
                <button className="tex-sm text-stone-500 sm:min-w-48 text-center py-2 rounded-md border hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel appointment
                </button>
              </div>
            </div>
            <hr className="h-[0.5px] bg-gray-300 border-none my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappoinment;
