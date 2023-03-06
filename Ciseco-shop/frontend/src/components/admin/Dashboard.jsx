import React, { useEffect } from "react"
import { Sidebar } from "../../routes"
import auser from "../../components/assets/images/auser.png"
import { Link } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { getAdminProducts } from "../../redux/actions/productAction"
import { getAllOrders } from "../../redux/actions/orderAction"
import { Loader } from "../common/Loader"
import { getAllUsers } from "../../redux/actions/authAction"

export const Dashboard = () => {
  const dispatch = useDispatch()

  const { products } = useSelector((state) => state.products)
  const { orders, totalAmount, loading } = useSelector((state) => state.allOrder)
  const { users } = useSelector((state) => state.allUser)
  const { user } = useSelector((state) => state.auth)

  let outOfStock = 0
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1
    }
  })
  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <>
      <main className='main dashboard'>
        <Sidebar />
        <section className='admin'>
          <h1 className='admin-title'>Dashboard</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className='title mt'>
                <div className='text w-50'>
                  <h2>Welcome back {user.name}!</h2>
                  <p>You’ve got to start with the customer experience and work back toward the technology – not the other way around.</p>
                </div>
                <div className='img w-50'>
                  <img src={auser} alt='' />
                </div>
              </div>
              <div className='boxItems'>
                <h2>Total Amount</h2>
                <h3>{totalAmount?.toFixed(2)}</h3>
              </div>
              <div className='grid4'>
                <div className='box'>
                  <h2>Products</h2>
                  <h3>{products?.length}</h3>

                  <Link to='/admin/product'>
                    <span>View Details</span>
                    <span>
                      <BsArrowRight />
                    </span>
                  </Link>
                </div>
                <div className='box'>
                  <h2>Orders</h2>
                  <h3>{orders && orders?.length}</h3>

                  <Link to='/admin/order'>
                    <span>View Details</span>
                    <span>
                      <BsArrowRight />
                    </span>
                  </Link>
                </div>
                <div className='box'>
                  <h2>Users</h2>
                  <h3>{users && users?.length}</h3>

                  <Link to='/admin/users'>
                    <span>View Details</span>
                    <span>
                      <BsArrowRight />
                    </span>
                  </Link>
                </div>
                <div className='box'>
                  <h2>Out of Stock</h2>
                  <h3>{outOfStock}</h3>

                  <Link to='/admin/product'>
                    <span>View Details</span>
                    <span>
                      <BsArrowRight />
                    </span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  )
}
