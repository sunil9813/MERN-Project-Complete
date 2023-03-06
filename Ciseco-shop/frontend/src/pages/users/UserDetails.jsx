import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Loader } from "../../components/common/Loader"

export const UserDetails = () => {
  const { user, loading } = useSelector((state) => state.auth)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className='explore'>
          <div className='container'>
            <div className='profile'>
              <h1>Account infomation</h1>
              <div className='content flex-between'>
                <div className='left'>
                  <div className='img'>
                    <img src={user?.avatar?.url} alt='' />
                  </div>
                  <Link to='/me/update'>
                    <button className='priceBox'>Edit Profile</button>
                  </Link>
                </div>
                <div className='right'>
                  <h2>Full Name</h2>
                  <h3>{user?.name}</h3> <br />
                  <h2>Email Address</h2>
                  <h3>{user?.email}</h3> <br />
                  <h2>Joined On</h2>
                  <h3>{String(user?.createdAt).substring(0, 10)}</h3> <br />
                  <button className='button'>My Order</button>
                  <Link to='/password/update'>
                    <button className='button btn'>Change Password</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
