import React from "react"
import { useState } from "react"
import { AiOutlineCheck } from "react-icons/ai"
import { GiModernCity, GiWorld } from "react-icons/gi"
import { TbNumbers } from "react-icons/tb"
import { IoLocationOutline } from "react-icons/io5"
import { MdOutlineWifiCalling3 } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { saveShippingInfo } from "../../redux/actions/cartAction"
import { CartPage } from "./CartPage"
import { countries } from "countries-list"
import { CheckOutStep } from "./CheckOutStep"

export const Shipping = () => {
  const countriesList = Object.values(countries) // US : United State

  const { shippingInfo } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
  const [country, setCountry] = useState(shippingInfo.country)

  const dispatch = useDispatch()
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }))
    history.push("/confirm")
  }
  return (
    <>
      <CheckOutStep shipping />
      <section className='shipping'>
        <div className='container'>
          <form onSubmit={submitHandler}>
            <div className='shipping_content flex-between'>
              <div className='shipping_content_info'>
                <h3>Shipping summary</h3>
                <div className='shipping_content_info_box'>
                  <div className='shipping_content_info_box_icon'>
                    <IoLocationOutline size={25} />
                  </div>
                  <div className='shipping_content_info_box_text'>
                    <div className='flex'>
                      <h4>Address</h4>
                      <AiOutlineCheck size={20} />
                    </div>
                    <input type='text' name='address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                  </div>
                </div>
                <div className='shipping_content_info_box'>
                  <div className='shipping_content_info_box_icon'>
                    <GiModernCity size={25} />
                  </div>
                  <div className='shipping_content_info_box_text'>
                    <div className='flex'>
                      <h4>City</h4>
                      <AiOutlineCheck size={20} />
                    </div>
                    <input type='text' name='city' value={city} onChange={(e) => setCity(e.target.value)} required />
                  </div>
                </div>
                <div className='shipping_content_info_box'>
                  <div className='shipping_content_info_box_icon'>
                    <MdOutlineWifiCalling3 size={25} />
                  </div>
                  <div className='shipping_content_info_box_text'>
                    <div className='flex'>
                      <h4>Phone Number</h4>
                      <AiOutlineCheck size={20} />
                    </div>
                    <input type='text' name='phoneNo' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                  </div>
                </div>
                <div className='shipping_content_info_box'>
                  <div className='shipping_content_info_box_icon'>
                    <TbNumbers size={25} />
                  </div>
                  <div className='shipping_content_info_box_text'>
                    <div className='flex'>
                      <h4>Postal Code</h4>
                      <AiOutlineCheck size={20} />
                    </div>
                    <input type='text' name='postalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                  </div>
                </div>
                <div className='shipping_content_info_box'>
                  <div className='shipping_content_info_box_icon'>
                    <GiWorld size={25} />
                  </div>
                  <div className='shipping_content_info_box_text'>
                    <div className='flex'>
                      <h4>Country</h4>
                      <AiOutlineCheck size={20} />
                    </div>
                    <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                      <option>Select Country</option>
                      {countriesList.map((countrys) => (
                        <option key={countrys.name} value={countrys.name}>
                          {countrys.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='shipping_content_item'>
                <CartPage class1='class1' class2='class2' show={true} grid3='grid3' />
                <div className='shipping-btn'>
                  <button className='button'> Confirm Order </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
