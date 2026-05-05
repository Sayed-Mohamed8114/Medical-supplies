import React from "react";
import { NavLink } from "react-router-dom";

const BtnAddNewSm = () => {
  return (
    <NavLink
      to={"/supplier/new"}
      className="md:hidden absolute bottom-10 right-4 bg-blue-700 text-white p-4 rounded-full shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
    >
      <img src="/assets/icons/plus.svg" alt="add" />
    </NavLink>
  );
};

export default BtnAddNewSm;
