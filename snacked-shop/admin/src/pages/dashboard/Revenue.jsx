import React from "react"
import ReactApexChart from "react-apexcharts"
import { Dashboardtitle } from "../../components/common/Dashboardtitle"

export const Revenue = () => {
  const series = [
    {
      name: "Investment",
      data: [50, 32, 45, 32, 34, 52, 41, 70, 30, 80],
    },
    {
      name: "Revenue",
      data: [31, 40, 28, 51, 42, 109, 10, 70, 40, 30],
    },
  ]
  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "month",
      categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SET", "OCT", "NOV", "DEC"],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  }

  const series1 = [90, 75, 50]
  const options1 = {
    chart: {
      height: 350,
      type: "radialBar",
      foreColor: "#4c5258",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return 249
            },
          },
        },
      },
    },
    labels: ["Complete", "In Progress", "Started"],
    colors: ["#9B51FF", "#FD7B51", "#50C8FF"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    track: {
      show: true,
      margin: 10,
    },
  }
  return (
    <>
      <section className='grid grid-cols-6 gap-7'>
        <div className='bg-white p-3 card rounded-xl col-span-4'>
          <Dashboardtitle title='Revenue History' />
          <div className='flex divide-x my-3'>
            <div className='pr-5'>
              <h1 className='text-green-500 text-2xl'>$9,279</h1>
              <span>Revenue</span>
            </div>
            <div className='pl-5'>
              <h1 className='text-red-500 text-2xl'>$5,279</h1>
              <span>Investment</span>
            </div>
          </div>
          <ReactApexChart options={options} series={series} type='area' height={350} />
        </div>
        <div className='bg-white p-3 card rounded-xl col-span-2'>
          <Dashboardtitle title='Task Overview' />
          <ReactApexChart options={options1} series={series1} type='radialBar' height={350} />
        </div>
      </section>
    </>
  )
}
