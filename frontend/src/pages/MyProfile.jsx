import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Myprofile = () => {
  const { userData, setUserData, loadUserProfileData, token, backendurl } =
    useContext(AppContext);
  const [image, setImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("imageFile", image);
      const { data } = await axios.post(
        backendurl + "/api/user/update-profile",
        formData,
        {
          headers: { token: token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };
  return (
    userData && (
      <div className="flex flex-col md:flex-row gap-3 md:gap-16 items-center sm:items-start">
        <div className="flex flex-col gap-4 max-w-[200px]">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block cursor-pointer relative">
                <img
                  className="w-36 h-36 rounded-lg object-cover   opacity-75"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img
                  className="w-10  absolute bottom-4 right-12"
                  src={image ? "" : assets.upload_icon}
                  alt=""
                  srcset=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                hidden
                id="image"
              />
            </label>
          ) : (
            <img
              className="w-36 h-36 rounded-lg object-cover"
              src={userData.image}
              alt=""
              srcset=""
            />
          )}

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
            <p className="text-center text-2xl font-medium  ">
              {userData.name}
            </p>
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
              onClick={updateUserProfileData}
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
    )
  );
};

export default Myprofile;
