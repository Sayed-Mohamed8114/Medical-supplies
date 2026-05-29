import { sidebarLinks } from "@/constants";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

const SidebarLg = () => {
  const pathName = useLocation();
  return (
    <aside className="hidden md:block fixed top-0 left-0 h-screen w-[200px] p-4 bg-white border-e border-e-[#C3C6D7] shadow-sm">
      <Logo />
      <ul className="flex flex-col gap-4">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={`py-2 px-4 text-[14px] transition-colors rounded-md cursor-pointer ${pathName.pathname === link.path ? "bg-[#F3F3FE] text-[#004AC6] font-bold " : "hover:bg-[#F3F3FE] text-[#737686]"}`}
          >
            {link.label}
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarLg;
