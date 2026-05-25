import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";
import { Textarea } from "@/shadcn_ui/components/ui/textarea";

const NewSupplier = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Add New Supplier"
        description="Add a new supplier to the system"
      />

      <div className="flex flex-col w-full gap-5 bg-white p-8 shadow-lg rounded-2xl  mx-auto md:max-w-2xl">
        {/* Name input */}
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

        <div className="md:w-full flex flex-col md:flex-row items-center justify-between gap-5 mb-3">
          <div className="w-full">
            <label className="text-[14px] font-bold block mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full rounded-md px-3 py-1.5 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
            />
          </div>
          <div className="w-full">
            <label className="text-[14px] font-bold block mb-1">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              className="w-full rounded-md px-3 py-1.5 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-end items-center gap-3 w-full mt-5">
          <button className="w-full py-2 bg-[#4860D2] rounded-md text-white font-medium text-[14px]">
            Add Supplier
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewSupplier;
