import React from "react"
import { TotalSection, Revenue, DashboardOrder, DashboardCountry, DashboradSocial, DashboardCustomer } from "../../routes/index"

export const Dashboard = () => {
  return (
    <>
      <section className='p-7'>
        <TotalSection />
        <Revenue />
        <DashboardOrder />
        <DashboardCountry />
        <DashboradSocial />
        <DashboardCustomer />
      </section>
    </>
  )
}
