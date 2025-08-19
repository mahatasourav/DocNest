import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctor = () => {
  const { specality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (specality) {
      setFilterDoc(doctors.filter((item) => item.speciality === specality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col items-start sm:flex-row justify-between gap-4 my-2">
        <div className="">
          <p
            className={`sm:hidden my-1 mx-2 px-4 rounded cursor-pointer py-1 border border-gray-300 ${
              showFilter && "bg-primaryColor text-white"
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filter
          </p>
        </div>
        <div
          className={`${
            showFilter === false ? "hidden sm:flex" : "flex"
          }  flex-col gap-4 text-gray-600 text-sm mt-5`}
        >
          <p
            onClick={() =>
              specality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${
              specality === "General physician"
                ? "bg-indigo-100 text-black"
                : "hover:bg-indigo-100"
            }`}
          >
            General physician
          </p>
          <p
            onClick={() =>
              specality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${
              specality === "Gynecologist"
                ? "bg-indigo-100 text-black"
                : "hover:bg-indigo-100"
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              specality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${
              specality === "Dermatologist"
                ? "bg-indigo-100 text-black"
                : "hover:bg-indigo-100"
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              specality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${
              specality === "Pediatricians"
                ? "bg-indigo-100 text-black"
                : "hover:bg-indigo-100"
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              specality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${
              specality === "Neurologist"
                ? "bg-indigo-100 text-black"
                : "hover:bg-indigo-100"
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              specality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${
              specality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : "hover:bg-indigo-100"
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {filterDoc.map((item, index) => (
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
                <p className="text-gray-900 text-lg font-medium ">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
