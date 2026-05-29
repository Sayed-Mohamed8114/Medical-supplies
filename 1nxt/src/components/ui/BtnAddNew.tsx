import { NavLink } from "react-router-dom";

const BtnAddNew = ({ content, link }: { content: string; link: string }) => {
  return (
    <NavLink
      to={link}
      className="hidden md:flex items-center gap-2 mb-10 bg-blue-700 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
    >
      <img src="/assets/icons/plus.svg" alt="add" />
      {content}
    </NavLink>
  );
};

export default BtnAddNew;
