import SidebarLg from "@/components/layout/SidebarLg";
import Topbar from "@/components/layout/Topbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <SidebarLg />
      <div className="ms-0 md:ms-[200px]">
        <Topbar />

        <div className="mt-[65px] p-8 bg-[#F3F3FE] h-[calc(100vh-65px)]">
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
