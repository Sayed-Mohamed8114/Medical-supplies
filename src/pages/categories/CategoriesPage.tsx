import DashboardLayout from "@/mainLayout/DashboardLayout";
import React from "react";
import MainHeading from "@/components/layout/MainHeading";
import BtnAddNew from "@/components/ui/BtnAddNew";
import BtnAddNewSm from "@/components/ui/BtnAddNewSm";
import TableSection from "@/components/ui/Table";

const CategoriesPage = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <MainHeading
          title="Categories Management"
          description="Manage your categories efficiently and effectively"
        />
        <BtnAddNew content="Add New Category" link="/category/new" />
      </div>
      <section className="relative pb-[100px]">
        <TableSection
          headers={[
            { id: "name", name: "Category Name" },
            { id: "description", name: "Description" },
            { id: "items", name: "Total Items" },
            { id: "actions", name: "Actions" },
          ]}
          bodyData={[
            {
              id: "1",
              name: "BioMed Solutions Inc.",
              description: "Medical Supplies",
              items: "48 items",
            },
            {
              id: "1",
              name: "BioMed Solutions Inc.",
              description: "Medical Supplies",
              items: "48 items",
            },
            {
              id: "1",
              name: "BioMed Solutions Inc.",
              description: "Medical Supplies",
              items: "48 items",
            },
          ]}
        />
        <BtnAddNewSm link="/category/new" />
      </section>
    </DashboardLayout>
  );
};

export default CategoriesPage;
