import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";
import { Textarea } from "@/shadcn_ui/components/ui/textarea";

const NewCategory = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Add New Category"
        description="Add a new category to the system"
      />

      <div className="flex flex-col w-full gap-5 bg-white p-8 shadow-lg rounded-2xl  mx-auto md:max-w-2xl">
        {/* Name input */}
        <div className="w-full">
          <label className="text-[14px] font-bold block mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter category name"
            className="w-full rounded-md px-3 py-1.5 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
          />
        </div>

        <div className="w-full">
          <label className="text-[14px] font-bold block mb-1">
            Description
          </label>
          <Textarea
            placeholder="Enter notes"
            className="w-full h-20 rounded-md px-3 py-2 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-end items-center gap-3 w-full mt-5">
          <button className="w-full py-2 bg-[#4860D2] rounded-md text-white font-medium text-[14px]">
            Add Category
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewCategory;
