import DashboardLayout from "@/mainLayout/DashboardLayout";
import MainHeading from "@/components/layout/MainHeading";

const NewSupplier = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Add New Supplier"
        description="Add a new supplier to the system"
      />

      <section>
        <div className="flex flex-col md:flex-row gap-10 bg-white p-8 shadow-lg rounded-2xl w-[80%] mx-auto">
          {/* Name input */}
          <div className="w-full">
            <label htmlFor="supplierName">Supplier Name</label>
            <input
              type="text"
              id="supplierName"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:border-blue-700"
            />
          </div>

          {/* email */}
          <div className="w-full">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-[#E4E7EC] rounded-lg focus:outline-none focus:border-blue-700"
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default NewSupplier;
