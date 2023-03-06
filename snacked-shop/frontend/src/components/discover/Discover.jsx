import React from "react"
import { discover } from "../assets/data/data"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn control-top' onClick={onClick}>
      <button className='next'>
        <BsArrowRight size={22} />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn control-top' onClick={onClick}>
      <button className='prev'>
        <BsArrowLeft size={22} />
      </button>
    </div>
  )
}
export const Discover = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  const color = ["#fefce8", "#fef2f2", "#f0fdf4", "#f0fdf4"]
  return (
    <>
      <section className='discover'>
        <div className='container'>
          <div className='discover_content'>
            <div className='title_head'>
              <h1>
                DIscover more. <span>Good things are waiting for you</span>
              </h1>
            </div>
            <div className='discover_content_items'>
              <Slider {...settings}>
                {discover.map((item, key) => (
                  <div className='discover_content_items_item' key={key}>
                    <div className={`discover_content_items_item_box flex ${item.bgcolor}`}>
                      <div className='discover_content_items_item_box_text'>
                        <span>{item.desc}</span>
                        <h2>{item.title}</h2>
                        <button className='button-primary'>Show me all</button>
                      </div>
                      <div className='discover_content_items_item_box_img'>
                        <img src={item.cover} alt='' />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
