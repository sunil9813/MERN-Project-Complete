import { AllOrderList, AllProductReview, AllUserList, CartPage, ConfirmOrder, CreateProduct, Dashboard, Footer, ForgotPassword, Header, Home, Login, NewPassword, OrderDetails, OrderList, Payment, ProductList, ProductPage, ProtectedRoute, Register, Shipping, Success, UpdateOrders, UpdatePassword, UpdateProduct, UpdateProfile, UpdateUser, UserDetails, ViewUserDetails } from "./routes"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ScrollTop from "./components/scrollTop/ScrollTop"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loadUser } from "./redux/actions/authAction"
import { useEffect } from "react"
import store from "./redux/store"
import { useState } from "react"
import axios from "axios"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

function App() {
  // npm i @stripe/stripe-js  @stripe/react-stripe-js
  const [stripeApiKey, setStripeApiKey] = useState("")

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/stripeapi")
      setStripeApiKey(data.stripeApiKey)
      //console.log(data.stripeApiKey)
    }
    getStripeApiKey()
  }, [])

  //if user is login xa bhane login state ma not go
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <ScrollTop />
        <Switch>
          {/* Admin  */}
          <ProtectedRoute exact isAdmin={true} path='/dashboard' component={Dashboard} />
          <ProtectedRoute exact isAdmin={true} path='/admin/product' component={ProductList} />
          <ProtectedRoute exact isAdmin={true} path='/admin/create' component={CreateProduct} />
          <ProtectedRoute exact isAdmin={true} path='/admin/products/:id' component={UpdateProduct} />
          <ProtectedRoute exact isAdmin={true} path='/admin/order' component={AllOrderList} />
          <ProtectedRoute exact isAdmin={true} path='/admin/order/:id' component={UpdateOrders} />
          <ProtectedRoute exact isAdmin={true} path='/admin/users' component={AllUserList} />
          <ProtectedRoute exact isAdmin={true} path='/admin/user/:id' component={UpdateUser} />
          <ProtectedRoute exact isAdmin={true} path='/admin/user/view/:id' component={ViewUserDetails} />
          <ProtectedRoute exact isAdmin={true} path='/admin/review' component={AllProductReview} />

          {/*--------- Normal User----------  */}
          {/* product  */}
          <Route exact path='/' component={Home} />
          <Route exact path='/search/:keyword' component={Home} />
          <Route exact path='/details/:id' component={ProductPage} />

          {/* user authication  */}
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <ProtectedRoute exact path='/me' component={UserDetails} />
          <ProtectedRoute exact path='/me/update' component={UpdateProfile} />
          <ProtectedRoute exact path='/password/update' component={UpdatePassword} />
          <Route exact path='/password/forgot' component={ForgotPassword} />
          <Route exact path='/password/reset/:token' component={NewPassword} />

          {/* order  */}
          <ProtectedRoute exact path='/order/me' component={OrderList} />
          <ProtectedRoute exact path='/order/:id' component={OrderDetails} />

          {/* cart   */}
          <ProtectedRoute exact path='/cart' component={CartPage} />
          <ProtectedRoute exact path='/shipping' component={Shipping} />
          <ProtectedRoute exact path='/confirm' component={ConfirmOrder} />
          <ProtectedRoute exact path='/success' component={Success} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute exact path='/payment' component={Payment} />
            </Elements>
          )}
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
//"proxy": "http://127.0.0.1:5000"
