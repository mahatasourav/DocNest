import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDocs, setRelDocs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, docId, speciality]);
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-6 mt-14">
      <h1 className="text-3xl  font-medium font-mono">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
        {console.log("relDocs", docId, speciality)}
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDocs.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`), scrollTo(0, 0);
            }}
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
    </div>
  );
};

export default RelatedDoctors;
