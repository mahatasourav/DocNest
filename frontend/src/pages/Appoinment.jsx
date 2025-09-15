import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Appoinment = () => {
  const { docId } = useParams();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();
  const { doctors, currencySymbol, token, backendurl, getDoctorsData } =
    useContext(AppContext);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    if (!docInfo) {
      console.error("Doctor not found");
      return;
    }
    setDocInfo(docInfo);
    // console.log("docInfo", docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  // Function to fetch available slots for the doctor
  // This is a placeholder function; you would replace it with actual API call logic

  const getAvailableSlots = async () => {
    setDocSlot([]); //Reset the slots before fetching new ones
    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      // Create a new date object for each day
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //set the time to 10:00 AM
      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
          currentDate.getMinutes() > 30 ? 0 : 30,
          0,
          0
        );
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      //set end time to 21:00 for the same date
      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);

      endTime.setHours(21, 0, 0, 0);

      //colleting all slots for the day
      let timeSlots = [];
      let slotTime = new Date(currentDate);

      while (slotTime < endTime) {
        let formattedTime = slotTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        console.log("docInfo", docInfo);
        const slotTim = formattedTime;
        // console.log("slotTim", slotTim);

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTim)
            ? false
            : true;
        // console.log("isSlotAvailable", isSlotAvailable);
        // console.log("slotDate", slotDate);
        // console.log(
        //   "slot_booked[slotDate].includes",
        //   docInfo.slots_booked[slotDate].includes(slotTim)
        // );
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(slotTime),
            time: formattedTime,
          });
        }

        slotTime.setMinutes(slotTime.getMinutes() + 30); // Increment by 30 minutes
      }
      allSlots.push({
        date: currentDate.toLocaleDateString(),
        slots: timeSlots,
      });
      // console.log("timeSlots", timeSlots, i);
    }

    setDocSlot(allSlots);
    console.log("Available slots:", allSlots);
  };

  // booking appointment function api call here
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlot[slotIndex].slots[0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;

      // console.log("date :", slotDate);

      const { data } = await axios.post(
        backendurl + "/api/user/book-apointment ",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointment");
      } else {
        toast.error(data.message);
        toast.error(error.message);
      }
    } catch (error) {
      console.log("error err", error);
    }
  };

  // ✅ Correctly calling in useEffect
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // For checking
  useEffect(() => {
    // console.log("docSlot is thisxxxxxxxx", docSlot);
  }, [docSlot]);

  return (
    docInfo && (
      <div>
        {/* ------Doctor Details ------- */}

        <div className="flex flex-col sm:flex-row items-center gap-4 my-5 px-4">
          <div>
            <img
              className="bg-primaryColor w-full sm:max-w-72 rounded-lg px-4"
              src={docInfo.image}
              alt=""
              srcSet=""
            />
          </div>
          {/* ---Doctor Name , Degree , About , Appointment fees --- */}
          <div className="flex-1 border border-gray-400 rounded-xl p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ">
            <p className="text-3xl font-medium flex items-center gap-2">
              {docInfo.name}{" "}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt=""
                sizes=""
                srcSet=""
              />
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
              <p className="text-gray-500">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="px-2 py-0.5 mt-1 test-xs rounded-full border border-gray-100 ">
                {docInfo.experience}
              </button>
            </div>
            <div className="flex flex-col gap-2 text-gray-600 text-sm mt-1">
              <p className="flex items-center gap-1.5 text-semibold">
                About{" "}
                <img className="w-4" src={assets.info_icon} alt="" srcSet="" />
              </p>{" "}
              <p className="w-3/4">{docInfo.about}</p>
            </div>

            <p className="flex gap-4 my-4 text-center">
              Appointment fee : ₹{docInfo.fees}.00
            </p>
          </div>
        </div>

        {/* ----- Booking slots ------- */}

        <div className="flex flex-col justify-center sm:ml-72 sm:pl-4 mt-4 font gap-4 text-center md:text-start px-8 ">
          <p>Booking slots</p>
          <div className="flex flex-col sm:flex-row gap-4 ">
            {docSlot.length > 0 &&
              docSlot.map((item, index) => (
                <div
                  key={index}
                  className={`text-center py-2 md:py-6 min-w-16 rounded-full cursor-pointer ${
                    index === slotIndex
                      ? "bg-primaryColor text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  onClick={() => setSlotIndex(index)}
                >
                  {/* {console.log("item ", item, index)} */}
                  <p>
                    {item.slots[0] &&
                      daysOfWeek[item.slots[0].datetime.getDay()]}
                  </p>
                  <p> {item.slots[0] && item.slots[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex fex-col sm:flex-row gap-4 mt-4 overflow-auto scrollbar-hide">
            {docSlot.length > 0 &&
              docSlot[slotIndex].slots.map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primaryColor text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <div className="flex justify-center items-center  ">
            <button
              onClick={bookAppointment}
              className="bg-primaryColor text-white text-sm px-14 py-3 rounded-full font-light my-6 md:mr-auto  "
            >
              Book an appointment
            </button>
          </div>
        </div>
        {/* ---- Related Doctors ------- */}

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appoinment;
