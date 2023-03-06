import React from "react"
import { product } from "../../components/assets/data"
import { Dashboardtitle } from "../../components/common/Dashboardtitle"

export const Progress = ({ done }) => {
  return (
    <div className='w-full bg-gray-200 rounded-full h-1.5'>
      <div
        className='bg-blue h-1.5 rounded-full opacity-0 w-0'
        style={{
          opacity: 1,
          width: `${done}%`,
        }}
      ></div>
    </div>
  )
}

export const DashboardCountry = () => {
  return (
    <>
      <section className='grid grid-cols-2 gap-7'>
        <div className='bg-white p-3 card rounded-xl col-span-1'>World Map</div>
        <div className='bg-white p-3 card rounded-xl col-span-1'>
          <Dashboardtitle title='Revenue History' />
          {product.map((item, key) => (
            <>
              <div className='flexCenter mb-5' key={key}>
                <div className='size-60 border-solid border-2 border-gray-200 rounded-xl flexCenter'>
                  <img src={item.images} alt='' />
                </div>
                <div className='flex justify-between w-full flex-col ml-3'>
                  <div className='grid w-full mb-4 grid-cols-3 place-items-end'>
                    <span>{item.name.slice(0, 20)}...</span>
                    <label>(4,216 Orders)</label>
                    <h3 className='text-black col-span-1'>42%</h3>
                  </div>
                  <Progress done={42} />
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  )
}
