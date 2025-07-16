import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div>
      <p>Find by Speciality</p>
      <p>
        Simply browse through our extensive list of trusted doctors,
        <br /> schedule your appointment hassle-free. hiiiiiiiiiii
      </p>
      <div>
        {specialityData.map((item, index) => (
          <Link key={index} to={`/doctor/${item.speciality}`}>
            <img src={item.image} alt="" srcset="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
