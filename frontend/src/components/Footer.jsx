import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-12 md:mt-28 lg:mt-40 text-sm">
        {/* ---- Left Section ------ */}

        <div className="flex flex-col gap-5">
          <img className="mb-5 w-40" src={assets.logo} alt="DocNest Logo" />
          <p className="w-full md:w-2/3 text-gray-500 leading-6">
            DocNest is your modern gateway to discover doctors, clinics, and
            diagnostic centers in Kolkata. Whether you need a consultation or
            simply exploring healthcare options — we’ve got you covered.
          </p>
        </div>

        {/* ---- Central Section ------ */}
        <div className="flex flex-col gap-9">
          <h3 className="text-xl font-medium">Explore</h3>
          <ul className="text-gray-900 flex flex-col gap-3">
            <li>Home</li>
            <li>Find Doctors</li>
            <li>Labs & Diagnostics</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ---- Right Section ------ */}
        <div className="flex flex-col gap-9">
          <h3 className="text-xl font-medium">Contact Us</h3>
          <ul className="text-gray-900 flex flex-col gap-3">
            <li>📞 +91 9876543210</li>
            <li>📩 sourav.docnest@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ---- Copyright Section ------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-500">
          © 2025 DocNest — Made with ❤️ in Kolkata. Empowering accessible
          healthcare, digitally.
        </p>
      </div>
    </div>
  );
};

export default Footer;
