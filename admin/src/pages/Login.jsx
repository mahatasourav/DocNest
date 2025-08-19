import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import AdminContextProvider, { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAtoken, backendurl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmithandler = async (e) => {
    e.preventDefault();

    //api call for login and here u will get aToken from bakckend that will store in localstorage and will help to restore session  ----->

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendurl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAtoken(data.token);
          console.log("data token", data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      // console.log("error", error);
    }
  };

  return (
    <form onSubmit={onsubmithandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col m-auto gap-3 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] shadow-lg">
        <p className="text-2xl font-semibold ">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            name=""
            id=""
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            name=""
            id=""
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base "
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login ?
            <span
              onClick={() => setState("Doctor")}
              className="cursor-pointer text-primary "
            >
              Click here
            </span>{" "}
          </p>
        ) : (
          <p>
            {" "}
            Admin Login ?{" "}
            <span
              onClick={() => setState("Admin")}
              className="cursor-pointer text-primary "
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
