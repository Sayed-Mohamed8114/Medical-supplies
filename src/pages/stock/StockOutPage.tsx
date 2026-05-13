import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";
import { Textarea } from "@/shadcn_ui/components/ui/textarea";
import { DatePickerDemo } from "@/components/ui/DatePicker";
import SelectItems from "@/components/ui/SelectItems";

const StockOutPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Stock Out"
        description="Track and manage your stock outs"
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

        {/* buttons */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-3 w-full mt-5">
          <button className="w-full px-10 py-2 bg-[#FF5757] rounded-md text-white font-medium text-[14px] cursor-pointer hover:bg-[#FF5757]/90 transition-all">
            Remove Stock
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StockOutPage;
