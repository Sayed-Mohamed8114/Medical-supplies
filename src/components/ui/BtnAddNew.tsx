import { NavLink } from "react-router-dom";

const BtnAddNew = () => {
  return (
    <NavLink
      to={"/supplier/new"}
      className="hidden md:flex items-center gap-2 mb-10 bg-blue-700 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
    >
      <img src="/assets/icons/plus.svg" alt="add" />
      Add Supplier
    </NavLink>
  );
};

export default BtnAddNew;
