import React from "react"
import ReactApexChart from "react-apexcharts"
import { HiShoppingCart, HiUserGroup } from "react-icons/hi"
import { FaUserAlt } from "react-icons/fa"
import { AiFillEye } from "react-icons/ai"

export const DashboardOrder = () => {
  const series_order = [80]
  const options_order = {
    chart: {
      height: 270,
      type: "radialBar",
    },
    colors: ["#1BA598"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        track: {
          background: "#B5F8F1",
          strokeWidth: "97%",
        },
        dataLabels: {
          show: false,
        },
      },
    },
  }
  const series_viewer = [60]
  const options_viewer = {
    chart: {
      height: 270,
      type: "radialBar",
    },
    colors: ["#7B52C2"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        track: {
          background: "#EBDFFF",
          strokeWidth: "97%",
        },
        dataLabels: {
          show: false,
        },
      },
    },
  }
  const series_impressions = [70]
  const options_impressions = {
    chart: {
      height: 270,
      type: "radialBar",
    },
    colors: ["#EC3A76"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        track: {
          background: "#FFD9E6",
          strokeWidth: "97%",
        },
        dataLabels: {
          show: false,
        },
      },
    },
  }
  const series_follower = [90]
  const options_follower = {
    chart: {
      height: 270,
      type: "radialBar",
    },
    colors: ["#FFC722"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        track: {
          background: "#FCEBB9",
          strokeWidth: "97%",
        },
        dataLabels: {
          show: false,
        },
      },
    },
  }
  return (
    <>
      <section className='grid grid-cols-4 gap-4'>
        <div className='bg-white p-3 py-5 card rounded-xl text-center relative'>
          <span>Orders</span>
          <h2 className='text-2xl mt-1 mb-5'>9,254</h2>
          <ReactApexChart options={options_order} series={series_order} type='radialBar' height={270} />
          <HiShoppingCart className='absolute bottom-[40%] left-[40%] text-5xl text-black' />
          <span>Complete</span>
          <h2 className='text-2xl mt-1'>5632</h2>
        </div>
        <div className='bg-white p-3 py-5 card rounded-xl text-center relative'>
          <span>Unique Visitors</span>
          <h2 className='text-2xl mt-1 mb-5'>5,2684</h2>
          <ReactApexChart options={options_viewer} series={series_viewer} type='radialBar' height={270} />
          <FaUserAlt className='absolute bottom-[43%] left-[43%] text-4xl text-black' />
          <span>Increased since Last Week</span>
          <h2 className='text-2xl mt-1'>25%</h2>
        </div>
        <div className='bg-white p-3 py-5 card rounded-xl text-center relative'>
          <span>Impressions</span>
          <h2 className='text-2xl mt-1 mb-5'>7,362</h2>
          <ReactApexChart options={options_impressions} series={series_impressions} type='radialBar' height={270} />
          <AiFillEye className='absolute bottom-[43%] left-[43%] text-4xl text-black' />
          <span>Increased since Last Week</span>
          <h2 className='text-2xl mt-1'>45%</h2>
        </div>
        <div className='bg-white p-3 py-5 card rounded-xl text-center relative'>
          <span>Followers</span>
          <h2 className='text-2xl mt-1 mb-5'>4278K</h2>
          <ReactApexChart options={options_follower} series={series_follower} type='radialBar' height={270} />
          <HiUserGroup className='absolute bottom-[43%] left-[43%] text-4xl text-black' />
          <span>Increased since Last Week</span>
          <h2 className='text-2xl mt-1'>55%</h2>
        </div>
      </section>
    </>
  )
}
