import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Sidebar, Dashboard, Layout, LogInHome, Product, UserProfile, Login, Register, Forget, Reset, EditProfile, ViewProduct, EditProduct, AddProduct, AllUserList, ViewUser, UpdateUser, AllProduct } from "./routes/index"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Homes } from "./pages/login/Homes"
import { useDispatch } from "react-redux"
import { SET_LOGIN } from "./redux/auth/authSlice"
import axios from "axios"
import { getLoginStatus } from "./services/authServices"

axios.defaults.withCredentials = true
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])

  return (
    <>
      {/*<Router>
        <ToastContainer />
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <main className={isOpen ? "changeWidth" : "restWidth"}>
          <Header />
          <Switch>
            <Route exact path='/dashboard'>
              <Dashboard />
            </Route>
            <Route exact path='/product'>
              <Product />
            </Route>
            <Route exact path='/newProduct'>
              <AddProduct />
            </Route>
            <Route exact path='/categories'>
              <Category />
            </Route>
            <Route exact path='/profile'>
              <UserProfile />
            </Route>
          </Switch>
        </main>
      </Router>*/}
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path='/dashboard'
            element={
              <Sidebar>
                <Layout>
                  <Dashboard />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/'
            element={
              <LogInHome>
                <Homes />
              </LogInHome>
            }
          />
          <Route
            path='/login'
            element={
              <LogInHome>
                <Login />
              </LogInHome>
            }
          />
          <Route
            path='/register'
            element={
              <LogInHome>
                <Register />
              </LogInHome>
            }
          />
          <Route path='/forget' element={<Forget />} />
          <Route path='/resetpassword/:resetToken' element={<Reset />} />
          <Route
            path='/profile'
            element={
              <Sidebar>
                <Layout>
                  <UserProfile />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/edit-profile'
            element={
              <Sidebar>
                <Layout>
                  <EditProfile />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/product'
            element={
              <Sidebar>
                <Layout>
                  <Product />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/newProduct'
            element={
              <Sidebar>
                <Layout>
                  <AddProduct />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/product-details/:id'
            element={
              <Sidebar>
                <Layout>
                  <ViewProduct />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/edit-product/:id'
            element={
              <Sidebar>
                <Layout>
                  <EditProduct />
                </Layout>
              </Sidebar>
            }
          />

          {/* access for only admin */}
          <Route
            path='/admin/getalluser'
            element={
              <Sidebar>
                <Layout>
                  <AllUserList />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/admin/user-details/:id'
            element={
              <Sidebar>
                <Layout>
                  <ViewUser />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/admin/edit-user/:id'
            element={
              <Sidebar>
                <Layout>
                  <UpdateUser />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/admin/products'
            element={
              <Sidebar>
                <Layout>
                  <AllProduct />
                </Layout>
              </Sidebar>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
