import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";

import SelectItems from "@/components/ui/SelectItems";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import { Textarea } from "@/shadcn_ui/components/ui/textarea";

const StockInPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Stock In"
        description="Track and manage your stock ins"
      />

      <div className="md:max-w-2xl flex flex-col gap-4 md:m-auto p-6 items-center bg-white rounded-md shadow-xl">
        {/* select + quantity */}
        <div className="md:w-full  flex flex-col md:flex-row items-center justify-between gap-5 mb-3">
          <div className="w-full ">
            <label className="text-[14px] font-bold block mb-1">Items</label>
            <SelectItems />
          </div>
          <div className="w-full">
            <label className="text-[14px] font-bold block mb-1">Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="w-full rounded-md px-3 py-1.5 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
            />
          </div>
        </div>

        {/* date + supplier */}
        <div className="md:w-full flex flex-col md:flex-row items-center justify-between gap-5 mb-3">
          <div className="w-full">
            <label className="text-[14px] font-bold block mb-1">Date</label>
            <DatePickerDemo />
          </div>
          <div className="w-full">
            <label className="text-[14px] font-bold block mb-1">Supplier</label>
            <input
              type="text"
              placeholder="Enter supplier"
              className="w-full rounded-md px-3 py-2 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
            />
          </div>
        </div>

        {/* notes */}
        <div className=" w-full mb-3">
          <label className="text-[14px] font-bold block mb-1">Note</label>
          <Textarea
            placeholder="Enter notes"
            className="w-full rounded-md px-3 py-2 outline-none border border-[#A8A8A8] text-[14px] font-normal text-[#2F2F2F] placeholder-[#A8A8A8]"
          />
        </div>

        {/* buttons */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-3 w-full mt-5">
          <button className="w-full py-2 bg-[#4860D2] rounded-md text-white font-medium text-[14px]">
            Add Stock
          </button>
          <button className="w-full py-2 bg-[#EEEEEE] rounded-md text-[#2F2F2F] font-normal text-[14px]">
            Cancel
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StockInPage;
