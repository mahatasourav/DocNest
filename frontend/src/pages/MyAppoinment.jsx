import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Myappoinment = () => {
  const { token, backendurl, doctors, getDoctorsData } = useContext(AppContext);
  const [appointment, setappointment] = useState([]);
  const navigate = useNavigate();

  // const [showCancelledAppointment, setShowCancelledAppointment] =
  //   useState(true);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/user/get-appointment-list",
        { headers: { token } }
      );

      console.log("dataaa of get userAppointment", data);

      if (data.success) {
        // console.log("dataaaa", data);
        setappointment(data.apointments.reverse());
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const cancelledAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/user/cancell-apointment",
        { appointmentId },
        { headers: { token } }
      );
      console.log("data cancell", data);
      if (data.success) {
        toast.success(data.message);
        getUserAppointment();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  // for setting the payments from razorpay
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: " Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("response", response);

        try {
          const { data } = await axios.post(
            backendurl + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointment();
            navigate("/my-appointment");
            toast.success(data.message);
          } else {
            toast.error(data.error);
          }
        } catch (error) {
          console.log("error", error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // razorpay gateway integartion

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/user/payment-razorpay",
        { appointmentId },
        {
          headers: { token },
        }
      );
      console.log("appointmentId", appointmentId);
      if (data.success) {
        console.log("datao roder", data.order);
        initPay(data.order);
      } else {
        console.log("data", data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      console.log("calling................... getUserAppointment");
      getUserAppointment();
    }
  }, [token]);
  return (
    <div className="flex flex-col gap-4 mt-12">
      <p className="text-gray-600 font-medium text-lg ">My Appointments</p>
      <hr className="h-[0.5px] bg-gray-300 border-none my-4" />
      <div>
        {/* {console.log("appointment isssssssssssssssssssssss", appointment)} */}
        {appointment.map((item, index) => (
          <div>
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 md:gap-10 justify-between "
            >
              <div className="flex gap-4 p-2">
                <div>
                  <img
                    className="w-[134px] bg-indigo-50"
                    src={item.docData.image}
                    alt=""
                    srcSet=""
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-700  md:gap-3 p-4">
                  <p className="font-bold text-black">{item.docData.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.docData.speciality}
                  </p>

                  <p className={`text-md text-gray-800 hidden md:flex `}>
                    Address :
                  </p>
                  <p className="text-sm text-gray-500 hidden md:flex">
                    {item.docData.address.line1}
                  </p>
                  <p className="text-sm text-gray-500 hidden md:flex">
                    {item.docData.address.line2}
                  </p>
                  <p className="text-sm text-gray-900 mt-2 md:mt-0 font-medium ">
                    Date & Time :{" "}
                    <span className=" text-gray-500">
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-end ">
                {!item.cancelled && item.payment && (
                  <button className="sm:min-w-48 py-2 border rounded bg-indigo-50 text-stone-500 px-2">
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.payment && (
                  <button
                    onClick={(e) => appointmentRazorpay(item._id)}
                    className="tex-sm text-stone-500 sm:min-w-48 text-center py-2 border hover:bg-primaryColor hover:text-white transition-all duration-300 rounded-md"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelledAppointment(item._id)}
                    className="tex-sm text-stone-500 sm:min-w-48 text-center py-2 rounded-md border hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel <span>appointment</span>
                  </button>
                )}
                {item.cancelled && (
                  <div className="flex  md:flex-col md:justify-center md:items-center ">
                    {/* <button
                      className=""
                      // onClick={() => setShowCancelledAppointment(false)}
                    >
                      <RxCross2 />
                    </button> */}
                    <button className="py-2 px-3 border border-red-900 text-red-700 w-full rounded-md">
                      Appointment Cancelled
                    </button>
                  </div>
                )}
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
