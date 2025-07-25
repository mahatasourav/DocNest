import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const Myprofile = () => {
  const [userData, setUserData] = useState({
    name: "Sourav Mahata",
    image: assets.profile_pic,
    email: "mahatasourav35@gmail.com",
    phone: "+91 887654321",
    address: {
      line1: "sourav home tarak bridge",
      line2: "matihana jhargarm",
    },
    gender: "Male",
    dob: "2003-03-10",
  });

  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-16 items-center sm:items-start">
      <div className="flex flex-col gap-4 max-w-[200px]">
        <img
          className="w-full rounded-md"
          src={userData.image}
          alt=""
          srcset=""
        />
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-center text-2xl font-medium  "
          />
        ) : (
          <p className="text-center text-2xl font-medium  ">{userData.name}</p>
        )}
      </div>

      <hr />
      {/* ------- Contact information ----- */}
      <div className="flex flex-col gap-4 pt-6">
        <p className="text-md underline text-gray-500">CONTACT INFORMATION</p>
        <div className="flex flex-col md:flex-row gap-2">
          <p className="font-medium text-gray-900">Email id : </p>

          <p className="text-primaryColor text-sm ">{userData.email}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <p className="font-medium text-gray-900">Phone: </p>
          {isEdit ? (
            <input
              type="phone"
              name="phone"
              id=""
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="text-primaryColor text-sm "
            />
          ) : (
            <p className="text-primaryColor text-sm ">{userData.phone}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <p className="font-medium text-gray-900">Address: </p>
          {isEdit ? (
            <p>
              {" "}
              <input
                type="text"
                name=""
                id=""
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { line1: e.target.value },
                  }))
                }
                className=" text-sm "
              />
              <br />
              <input
                type="text"
                name=""
                id=""
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { line2: e.target.value },
                  }))
                }
                className=" text-sm "
              />
            </p>
          ) : (
            <p className=" text-sm ">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      {/*---------- Basic information section ----- */}
      <div className="flex flex-col gap-4 pt-6">
        <p className="text-md underline text-gray-500">BASIC INFORMATION</p>
        <div className="flex flex-col md:flex-row gap-2">
          <p>Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          ) : (
            <p className=" text-sm ">{userData.gender}</p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <p>Birthday:</p>
          {isEdit ? (
            <input
              type="datetime"
              name=""
              id=""
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  dob: e.target.value,
                }))
              }
              className=" text-sm "
            />
          ) : (
            <p className=" text-sm ">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* ---- Edit button or save button  */}
      <div className="flex pt-20">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="border border-primaryColor text-black hover:bg-primaryColor hover:text-white transition-all duration-300 px-7 py-2 rounded-full flex justify-center items-center gap-2"
          >
            <FaSave />
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primaryColor text-black hover:bg-primaryColor hover:text-white transition-all duration-300 px-7 py-2 rounded-full flex justify-center items-center gap-2"
          >
            <MdModeEdit />
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Myprofile;
