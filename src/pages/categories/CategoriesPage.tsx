import DashboardLayout from "@/mainLayout/DashboardLayout";
import React from "react";
import MainHeading from "@/components/layout/MainHeading";

const CategoriesPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Categories Management"
        description="Manage your categories efficiently and effectively"
      />
    </DashboardLayout>
  );
};

export default CategoriesPage;
