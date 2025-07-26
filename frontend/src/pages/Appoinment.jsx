import React, { use, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Appoinment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

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

        timeSlots.push({
          datetime: new Date(slotTime),
          time: formattedTime,
        });
        slotTime.setMinutes(slotTime.getMinutes() + 30); // Increment by 30 minutes
      }
      allSlots.push({
        date: currentDate.toLocaleDateString(),
        slots: timeSlots,
      });
      // console.log("timeSlots", timeSlots, i);
    }

    setDocSlot(allSlots);
    // console.log("Available slots:", allSlots);
  };
  // ✅ Correctly calling in useEffect
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // For checking
  useEffect(() => {
    console.log("docSlot", docSlot);
  }, [docSlot]);

  return (
    docInfo && (
      <div>
        {/* ------Doctor Details ------- */}

        <div className="flex flex-col sm:flex-row items-center gap-4 my-5">
          <div>
            <img
              className="bg-primaryColor w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
              srcSet=""
            />
          </div>
          {/* ---Doctor Name , Degree , About , Appointment fees --- */}
          <div className="flex-1 border border-gray-400 rounded-xl p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
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
              Appointment fee : ${docInfo.fees}
            </p>
          </div>
        </div>

        {/* ----- Booking slots ------- */}

        <div className="flex flex-col justify-center sm:ml-72 sm:pl-4 mt-4 font gap-4  ">
          <p>Booking slots</p>
          <div className="flex flex-col sm:flex-row gap-4 ">
            {docSlot.length > 0 &&
              docSlot.map((item, index) => (
                <div
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
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
          <div className="flex justify-start items-start">
            <button className="bg-primaryColor text-white text-sm px-14 py-3 rounded-full font-light my-6 mr-auto ">
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
