import React from "react"
import ReactApexChart from "react-apexcharts"

export const DashboradSocial = () => {
  const series = [
    {
      name: "Facebook",
      data: [120, 200, 140, 180, 110, 160, 100, 130, 30, 80],
    },
  ]
  const options = {
    chart: {
      height: 250,
      type: "area",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      type: "month",
      categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SET", "OCT", "NOV", "DEC"],
      labels: {
        show: false,
        formatter: false,
      },
    },
  }

  const series1 = [
    {
      name: "Twitter",
      data: [10, 40, 30, 20, 35, 30, 20, 25, 15, 25, 30, 25],
    },
  ]
  const options1 = {
    chart: {
      height: 250,
      type: "bar",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          show: false,
        },
      },
    },
    yaxis: {
      show: false,
    },
    colors: "#3461ff",
    xaxis: {
      type: "month",
      categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SET", "OCT", "NOV", "DEC"],
      labels: {
        show: false,
      },
    },
  }

  const series2 = [
    {
      name: "Youtube",
      data: [20, 15, 10, 20, 25, 15, 25, 20, 30, 35],
    },
  ]
  const options2 = {
    chart: {
      height: 250,
      type: "line",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#f90c0c"],
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      type: "month",
      categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SET", "OCT", "NOV", "DEC"],
      labels: {
        show: false,
      },
    },
  }

  return (
    <>
      <section className='grid grid-cols-3 gap-7'>
        <div className='bg-white p-3 card rounded-xl col-span-1'>
          <div className='flex justify-between items-center mb-3'>
            <div>
              <h1 className='text-primary text-2xl'>24.5K</h1>
              <span>Facebook Followers</span>
            </div>
            <div className=''>
              <img src='https://img.icons8.com/color/48/000000/facebook-circled--v1.png' alt='img' />
            </div>
          </div>
          <ReactApexChart options={options} series={series} type='area' height={150} />
        </div>
        <div className='bg-white p-3 card rounded-xl col-span-1'>
          <div className='flex justify-between items-center mb-3'>
            <div>
              <h1 className='text-primary text-2xl'>37.8K</h1>
              <span>Twitter Followers</span>
            </div>
            <div className=''>
              <img src='https://img.icons8.com/color/48/000000/twitter.png' alt='img' />
            </div>
          </div>
          <ReactApexChart options={options1} series={series1} type='bar' height={150} />
        </div>
        <div className='bg-white p-3 card rounded-xl col-span-1'>
          <div className='flex justify-between items-center mb-3'>
            <div>
              <h1 className='text-primary text-2xl'>56.9K</h1>
              <span>Youtube Subscribers</span>
            </div>
            <div className=''>
              <img src='https://img.icons8.com/color/48/000000/youtube-play.png' alt='img' />
            </div>
          </div>
          <ReactApexChart options={options2} series={series2} type='line' height={150} />
        </div>
      </section>
    </>
  )
}
