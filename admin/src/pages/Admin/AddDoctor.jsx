import React, { useContext } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [education, setEducation] = useState();
  const [address2, setAddress2] = useState("");
  const [address1, setAddress1] = useState("");
  const [about, setAbout] = useState("");

  const { backendurl, aToken } = useContext(AdminContext);
  const onsubmithandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        toast.error("Image Not Selected");
      }
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("degree", education);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("about", about);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("imageFile", docImg);
      formData.forEach((value, key) => {
        console.log(` ${key} :${value}`);
      });
      const { data } = await axios.post(
        backendurl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken: aToken } }
      );
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setAbout("");
        setName("");
        setEmail("");
        setPassword("");
        setEducation("");
        setExperience("");
        setFees("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error is", error);
      console.log("error response is", error.response);
      toast.error(error.response.data.message);
    }
  };
  return (
    <form
      onSubmit={onsubmithandler}
      className="flex flex-col gap-6 mt-4 px-8 md:px-10 w-full mr-24"
    >
      <p className="font-medium "> Add Doctor</p>
      <div className="flex flex-col gap-6 bg-white  border-2 border-[#d8d8d8] px-6  md:px-8 py-4 md:py-8 rounded-md">
        <div className="flex gap-4  items-center   text-gray-500">
          <img
            className="w-16 bg-gray-200 rounded-full cursor-pointer"
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt=""
            srcset=""
          />{" "}
          <label htmlFor="doc-img" className="cursor-pointer">
            {docImg ? (
              <p>
                <FaEdit /> change doctor picture
              </p>
            ) : (
              <p>
                {" "}
                <IoMdCloudUpload /> Upload doctor picture
              </p>
            )}
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-24 text-gray-600 ">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Doctor name</p>
              <input
                type="text"
                name=""
                id=""
                placeholder="Name"
                required
                className="border rounded py-2 px-3"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Doctor Email</p>
              <input
                type="email"
                name=""
                id=""
                placeholder="Email"
                required
                className="border rounded py-2 px-3"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Doctor Password</p>
              <input
                type="password"
                name=""
                id=""
                placeholder="Password"
                required
                className="border rounded py-2 px-3"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Experience</p>
              <select
                name=""
                id=""
                className="border rounded py-2 px-3"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10+ Year">10+ Year</option>
              </select>
            </div>
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Fees</p>
              <input
                type="number"
                name=""
                id=""
                placeholder="Your fees"
                required
                className="border rounded py-2 px-3"
                onChange={(e) => setFees(e.target.value)}
                value={fees}
              />
            </div>
          </div>
          <div className="w-full h-[300px]  flex lg:flex-1  flex-col gap-4 ">
            <div className=" flex-1 flex flex-col gap-2 ">
              <p>Speciality</p>
              <select
                name="speciality"
                id=""
                className="border rounded py-2 px-3"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Education</p>
              <input
                type="text"
                placeholder="Education"
                required
                className="border rounded py-2 px-3"
                onChange={(e) => setEducation(e.target.value)}
                value={education}
              />
            </div>
            <div className=" flex-1 flex flex-col gap-1 ">
              <p>Address1</p>
              <input
                type="text"
                placeholder="Address1"
                required
                className="border rounded py-2 px-3 "
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
              />
              <input
                type="text"
                placeholder="Address2"
                required
                className="border rounded py-2 px-3 mt-4"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </div>
        <div className="  flex flex-col gap-2 ">
          <p className="text-gray-400 text-medium">About me</p>
          <textarea
            name=""
            id=" "
            placeholder="write about yourself"
            rows={5}
            className="mr-24 px-3 py-2 border border-gray-300 rounded"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          ></textarea>
        </div>
        <button className=" bg-primary border text-white py-2 px-8 w-44 rounded-full  ">
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
