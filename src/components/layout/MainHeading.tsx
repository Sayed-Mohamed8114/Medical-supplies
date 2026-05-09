import React from "react";

const MainHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 mb-10">
      <h1 className="text-[32px] font-bold text-black">{title}</h1>
      <p className="text-[14px] text-gray-500 max-w-125">{description}</p>
    </div>
  );
};

export default MainHeading;
