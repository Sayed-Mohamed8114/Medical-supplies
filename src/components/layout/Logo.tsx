import React from "react";

const Logo = () => {
  return (
    <div className="flex gap-3 items-center mb-[50px]">
      <div className="w-[35px] h-[35px] bg-blue-500 rounded-md justify-center items-center flex ">
        <img src="/assets/logo.svg" alt="logo" className="w-[20px] h-[20px]" />
      </div>
      <div>
        <p className="text-[18px] font-bold ">MediLogistics</p>
        <p className="text-[#737686] text-[10px] font-semibold">
          MEDICAL INVENTORY
        </p>
      </div>
    </div>
  );
};

export default Logo;
