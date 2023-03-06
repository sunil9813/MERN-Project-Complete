import React from "react"
import { steps } from "../assets/data/data"

export const Step = () => {
  return (
    <>
      <section className='steps'>
        <div className='container grid4'>
          {steps.map((item) => (
            <div className='steps_boxs' key={item.id}>
              <div className='steps_boxs_img'>
                <img src={item.cover} alt='cover' />
              </div>
              <button>Step {item.id}</button>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
