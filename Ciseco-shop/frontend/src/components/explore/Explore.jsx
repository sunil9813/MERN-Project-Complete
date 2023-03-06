import React from "react"
import { BsArrowRight } from "react-icons/bs"
import { explore } from "../assets/data/data"

export const Explore = () => {
  return (
    <>
      <section className='explore'>
        <div className='container'>
          <h1>Start exploring.</h1>
          <div className='explore_heading'>
            <div className='explore_heading_content'>
              {explore.map((c, i) => (
                <button className='flex-center' key={i}>
                  <i className='icon'>{c.icon}</i>
                  <span>{c.catgeory}</span>
                </button>
              ))}
            </div>
          </div>
          <div className='explore_content grid3'>
            {explore.map((item, i) => (
              <div className='explore_content_box' key={i}>
                <div className='explore_content_box_img flex-between flex-center'>
                  <div className='img size-100'>
                    <img src={item.images} alt='images' />
                  </div>
                  <h5>{item.totalProduct} Products</h5>
                </div>
                <div className='explore_content_box_title'>
                  <h4>{item.desc}</h4>
                  <h2>{item.title}</h2>
                </div>
                <a href='/'>
                  See Collection <BsArrowRight className='aicon' />
                </a>
                <div className='explore_content_box_cover'>
                  <img src={item.cover} alt='' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
