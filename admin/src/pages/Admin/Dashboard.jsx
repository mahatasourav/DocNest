import React, { useContext, useEffect, useState } from "react";

import { assets } from "../../assets/assets_admin/assets";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const {
    aToken,
    backendurl,
    cancelledAppointmentByAdmin,
    dashboardData,
    dashboard,
    setDashboard,
  } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      dashboardData();
    }
  }, [aToken]);
  return (
    <div className="bg-gray-200 w-full">
      <div className="flex flex-col gap-10 max-w-[70vw] h-screen overflow-hiddenpt-6 mt-6">
        {/* upper section  */}
        <div className="   flex flex-col md:flex-row justify-evenly gap-8 px-12   m-x-auto">
          {console.log("dashboard", dashboard)}
          <div className="w-[300px] bg-white flex justify-start items-center py-3 px-6 gap-6 rounded-lg ">
            <img src={assets.doctor_icon} alt="" srcset="" />
            <p className="flex flex-col gap-0.5 ">
              <span className="text-xl font-bold">
                {" "}
                {dashboard && dashboard.dashboardData.doctors}
              </span>
              <span className="text-gray-600">Doctors</span>
            </p>
          </div>

          <div className="w-[300px] bg-white flex justify-start items-center py-3 px-6 gap-6 rounded-lg ">
            <img src={assets.appointments_icon} alt="" srcset="" />
            <p className="flex flex-col gap-0.5 ">
              <span className="text-xl font-bold">
                {" "}
                {dashboard && dashboard.dashboardData.appointments}
              </span>
              <span className="text-gray-600">Appointments</span>
            </p>
          </div>

          <div className="w-[300px] bg-white flex justify-start items-center py-3 px-6 gap-6 rounded-lg  ">
            <img src={assets.patients_icon} alt="" srcset="" />
            <p className="flex flex-col gap-0.5 ">
              <span className="text-xl font-bold">
                {dashboard && dashboard.dashboardData.patients}
              </span>
              <span className="text-gray-600">Patients</span>
            </p>
          </div>
        </div>
        {/* lower section  */}
        <div className="flex flex-col gap-6  max-w-[65vw] m-x-auto mx-12 bg-white rounded-lg pl-8 py-6">
          <div className="flex flex-row gap-3 items-center text-center">
            <img src={assets.list_icon} alt="" srcset="" />
            <p>Latest Appointments</p>
          </div>

          <hr />
          <div className="flex flex-col gap-4">
            {/* // map here */}
            {dashboard?.dashboardData?.latestAppointments?.map(
              (item, index) => (
                <div className="flex flex-row justify-between gap-4 px-2 mr-8 items-center hover:bg-gray-200 py-2">
                  {console.log("item 0 is", item)}
                  <div className="flex flex-row justify-center items-center gap-4 ">
                    <img
                      className="w-12 h-12 bg-gray-400 rounded-full object-cover"
                      src={item.docData.image}
                      alt=""
                    />
                    <div className="flex flex-col gap-0.5">
                      <p className="font-semibold ">{item.docData.name}</p>
                      <p className="text-xs ">
                        Booking on {slotDateFormat(item.slotDate)}
                      </p>
                    </div>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-600 text-xs font-medium">
                      {" "}
                      Cancelled
                    </p>
                  ) : (
                    <button
                      onClick={() => cancelledAppointmentByAdmin(item._id)}
                    >
                      {" "}
                      <MdOutlineCancel className="text-3xl" />
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
