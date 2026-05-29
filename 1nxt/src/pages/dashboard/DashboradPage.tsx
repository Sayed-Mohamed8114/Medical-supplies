import DashboardLayout from "@/mainLayout/DashboardLayout";
import CardBox from "./components/Card";
import MainHeading from "@/components/layout/MainHeading";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Dashboard Overview"
        description="Real time stock overview and monitoring"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CardBox
          title="Card 1"
          value="2,847"
          change="+10%"
          description="This card uses the small size variant."
          src="/assets/icons/items-active.svg"
          background="bg-[#DBE1FF]"
        />
        <CardBox
          title="Card 2"
          value="24"
          change="-10%"
          description="This card uses the small size variant."
          src="/assets/icons/low-stock.svg"
          background="bg-[#FFDAD6]"
        />
        <CardBox
          title="Card 3"
          value="159"
          change="+10%"
          description="This card uses the small size variant."
          src="/assets/icons/expiry-soon.svg"
          background="bg-[#FFDBCD]"
        />
        <CardBox
          title="Card 4"
          value="15"
          change="+10%"
          description="This card uses the small size variant."
          src="/assets/icons/total-supplier.svg"
          background="bg-[#DCE2F3]"
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
