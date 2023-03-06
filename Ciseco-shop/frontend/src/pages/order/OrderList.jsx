import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Loader } from "../../components/common/Loader"
import { myOrders, clearError } from "../../redux/actions/orderAction"
import { Link } from "react-router-dom"
import { AiFillEye } from "react-icons/ai"
import { SearchBox } from "../common/SearchBox"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

export const OrderList = () => {
  const dispatch = useDispatch()

  const { loading, error, orders } = useSelector((state) => state.myOrders)

  useEffect(() => {
    dispatch(myOrders())

    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [dispatch, error])

  return (
    <>
      <section className='orderList explore'>
        <div className='container'>
          <h1>My Orders</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className='content'>
                {/* to do search  */}
                <h4>to do search & pagination</h4>
                <SearchBox />
                <div className='tableContent'>
                  <table>
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>ID</th>
                        <th>No of Items</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{order._id}</td>
                          <td>{order.orderItems.length}</td>
                          <td>${order.totalPrice}</td>
                          <td>{order.orderStatus && String(order.orderStatus).includes("Delivered") ? <label className='green'>{order.orderStatus}</label> : <label className='red'>{order.orderStatus}</label>}</td>
                          <td>
                            <Link to={`/order/${order._id}`} className='view'>
                              <AiFillEye className='icon' size={20} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='pagination'>
                    <div className='box1'>
                      <p>Showing 1 to 3 of 3 entries</p>
                    </div>
                    <div className='box flex'>
                      <div className='row flex'>
                        <h4>Row per page :</h4>
                        <select name='' id='' className='btn'>
                          <option value=''>10</option>
                          <option value=''>20</option>
                          <option value=''>30</option>
                          <option value=''>40</option>
                          <option value=''>50</option>
                        </select>
                      </div>
                      <div className='flex buttons'>
                        <button className='btn'>
                          <BsArrowLeft />
                        </button>
                        <button className='btn'>
                          <BsArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <section className='history orderList'>
        <div className='container'>
          <h1>Order History</h1>
          <div className='grid2'>
            {orders?.map((o, i) => (
              <div className='history_content' key={i}>
                <div className='history_heading'>
                  <h4>#{o._id}</h4>
                  <span>{String(o?.createdAt).substring(0, 10)}</span>
                  <label>{o.orderStatus && String(o.orderStatus).includes("delivered") ? <label className='green'>{o.orderStatus}</label> : <label className='red'>{o.orderStatus}</label>}</label>
                </div>
                <div className='history_items'>
                  {o.orderItems.map((i) => (
                    <div className='item' key={i}>
                      <div className='img size-100' style={{ width: "15%" }}>
                        <img src={i.image} alt='' />
                      </div>
                      <div className='name' style={{ width: "65%" }}>
                        <p>{i.name}</p>
                        <h4>Quantity : {i.quantity}</h4>
                      </div>
                      <div className='review' style={{ width: "20%" }}>
                        <button className='priceBox'>${i.price.toFixed(2)}</button>
                        <button className='rev'>Leave review</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
