import React from "react";

const MainHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col items-start gap-2 mb-10 ">
      <h1 className="text-[22px] md:text-[32px] font-bold text-[#000000]">
        {title}
      </h1>
=======
    <div className="flex flex-col items-start gap-2 mb-10">
      <h1 className="text-[32px] font-bold text-[#000000]">{title}</h1>
>>>>>>> master
      <p className="text-[14px] text-[#7C808D] max-w-[300px]">{description}</p>
    </div>
  );
};

export default MainHeading;
