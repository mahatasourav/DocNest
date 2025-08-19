import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { token, setToken, backendurl } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "signup") {
        const { data } = await axios.post(backendurl + "/api/user/register", {
          name,
          email,
          password,
        });
        console.log("data", data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col m-auto gap-4 min-w-[340px] sm:min-w-96 items-start p-8 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "signup" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "signup" ? "sign up" : "log in"} to book appointment
        </p>
        {state === "signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              name=""
              id=""
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            name=""
            id=""
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            name=""
            id=""
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-primaryColor text-white w-full py-2 text-base rounded-md"
        >
          {state === "signup" ? "Create Account" : "Login"}
        </button>
        {state === "signup" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-primaryColor underline cursor-pointer"
              onClick={() => setState("login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              className="text-primaryColor underline cursor-pointer"
              onClick={() => setState("signup")}
            >
              {" "}
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
