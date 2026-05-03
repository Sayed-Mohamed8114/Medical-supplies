import { sidebarLinks } from "@/constants";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../shadcn_ui/components/ui/sheet";
import Logo from "./Logo";
import { NavLink, useLocation } from "react-router-dom";
export default function SidebarSm() {
  const pathName = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <img
          src="/assets/icons/burger.svg"
          alt="burger"
          className="w-6 h-6 cursor-pointer md:hidden"
        />
      </SheetTrigger>
      <SheetContent className="md:hidden max-w-[230px] p-4 pt-12 overflow-y-auto">
        <Logo />
        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={`py-2 px-4 text-[#737686] text-[14px] font-normal transition-colors rounded-md cursor-pointer ${pathName.pathname === link.path ? "bg-[#F3F3FE] text-[#004AC6]" : "hover:bg-[#F3F3FE]"}`}
            >
              {link.label}
            </NavLink>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

// <SheetClose asChild>
//   <Button variant="outline">Close</Button>
// </SheetClose>;
