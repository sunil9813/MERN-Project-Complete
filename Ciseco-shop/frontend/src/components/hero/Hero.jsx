import React from "react"
import { BiSearch } from "react-icons/bi"
import { hero } from "../assets/data/data"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <BsArrowRight size={22} />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <BsArrowLeft size={22} />
      </button>
    </div>
  )
}

export const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Slider {...settings}>
            {hero.map((item) => (
              <div className='hero_content'>
                <div className='hero_content_left'>
                  <h3>{item.desc}</h3>
                  <h1>{item.title}</h1>
                  <button className='button-icon'>
                    Explore now <BiSearch size={22} className='bicon' />
                  </button>
                </div>
                <div className='hero_content_right'>
                  <img src={item.image} alt='images' />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}
