<<<<<<< HEAD
import DashboardLayout from "@/mainLayout/DashboardLayout";
import React from "react";
import MainHeading from "@/components/layout/MainHeading";
=======
import DashboardLayout from '@/mainLayout/DashboardLayout'
import React from 'react'
import MainHeading from '@/components/layout/MainHeading'
>>>>>>> master

const SettingPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Settings"
        description="Manage your settings and preferences"
      />
<<<<<<< HEAD

      {/* Account Profile Section */}
      <div className="flex flex-col w-full gap-5 bg-white p-8 shadow-lg rounded-2xl  mx-auto md:max-w-2xl mb-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] font-bold text-[#2F2F2F]">
            Account Profile
          </h3>
          <p className="text-[11px] text-[#7C808D] font-normal">
            Update your personal information and how others see you.
          </p>
        </div>
        {/* Name + email */}
        <div className="md:w-full flex flex-col md:flex-row items-center justify-between gap-5 mb-3">
          <div className="w-full">
            <label className="text-[14px] font-bold block mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              className="w-full rounded-md px-3 py-1.5 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
            />
          </div>
          <div className="w-full">
            <label className="text-[14px] font-bold block mb-1">email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full rounded-md px-3 py-1.5 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="w-full">
          <label className="text-[14px] font-bold block mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full rounded-md px-3 py-1.5 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
          />
          <p className="text-[10px] text-[#7C808D] font-normal mt-1">
            Minimum 12 characters with at least one special character.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-end items-center gap-3 w-full mt-5">
          <button className="w-full md:w-fit px-3 py-2 bg-[#4860D2] rounded-md text-white font-medium text-[14px] cursor-pointer">
            Update Profile
          </button>
        </div>
      </div>

      {/* Default Minimal Stock Level */}
      <div className="flex flex-col md:flex-row items-center w-full gap-5 bg-white p-8 shadow-lg rounded-2xl  mx-auto md:max-w-2xl">
        <div className="w-full ">
          <label
            htmlFor="minimalStockLevel"
            className="text-[13px] font-bold block mb-2"
          >
            Default Minimal Stock Level
          </label>
          <input
            type="number"
            id="minimalStockLevel"
            placeholder="Enter minimal stock level"
            className="w-full rounded-md px-3 py-1.5 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-end items-center gap-3 w-full mt-5">
          <button className="w-full md:w-fit px-3 py-2 bg-[#4860D2] rounded-md text-white font-medium text-[14px] cursor-pointer">
            Update Stock
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingPage;
=======
    </DashboardLayout>
  )
}

export default SettingPage
>>>>>>> master
