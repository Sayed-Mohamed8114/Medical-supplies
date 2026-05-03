import DashboardLayout from '@/mainLayout/DashboardLayout'
import React from 'react'
import MainHeading from '@/components/layout/MainHeading'

const SettingPage = () => {
  return (
    <DashboardLayout>
      <MainHeading
        title="Settings"
        description="Manage your settings and preferences"
      />
    </DashboardLayout>
  )
}

export default SettingPage