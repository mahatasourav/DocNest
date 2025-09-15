import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const AllApointments = () => {
  const {
    appointments,
    setAppointments,
    getAllAppointments,
    aToken,
    backendurl,
    cancelledAppointmentByAdmin,
  } = useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5 overflow-y-auto flex flex-col gap-4">
      <p>All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overscroll-y-scroll ">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]  items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50
           "
            key={index}
          >
            <p className="max-sm:hidden"> {index + 1}</p>
            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={item.userData.image}
                alt=""
                srcset=""
              />
              <p>{item.userData.name}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>

            <p>
              {slotDateFormat(item.slotDate)},{item.slotTime}
            </p>

            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 object-cover rounded-full bg-gray-300"
                src={item.docData.image}
                alt=""
                srcset=""
              />
              <p>{item.docData.name}</p>
            </div>
            <p> ₹{item.amount}.00</p>
            <p className="flex justify-center items-center">
              {item.cancelled ? (
                <p className="text-red-600 text-xs font-medium"> Cancelled</p>
              ) : (
                <p>
                  <MdOutlineCancel
                    onClick={() => cancelledAppointmentByAdmin(item._id)}
                  />
                </p>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointments;
