import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div className="flex flex-col gap-8 justify-center align-center">
      <p className="text-center font-medium mt-14 text-2xl text-gray-500 ">
        CONTACT <span className="text-gray-700 font-medium">US</span>
      </p>
      <div className="flex flex-col md:flex-row gap-12 justify-center  ">
        <img
          className="w-full md:max-w-[350px]"
          src={assets.contact_image}
          alt=""
          srcSet=""
        />

        <div className="flex flex-col gap-7">
          <p className="font-medium text-gray-700 text-lg">OUR OFFICE</p>
          <p className="text-sm text-gray-500">
            00000 Willms Station <br /> Suite 000, Washington, USA
          </p>
          <p className="text-sm text-gray-500">
            Tel: (000) 000-0000 <br /> Email: greatstackdev@gmail.com
          </p>
          <p className="font-medium text-gray-700 text-lg">
            CAREERS AT PRESCRIPTO
          </p>
          <p className="text-sm text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="text-black border border-gray-700 px-6 py-3 mr-auto hover:bg-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
