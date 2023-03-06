import { Footer, Header, Home, ProductPage } from "./routes"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import ScrollTop from "./components/scrollTop/ScrollTop"

function App() {
  return (
    <>
      <Router>
        <Header />
        <ScrollTop />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/details/:id' component={ProductPage} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
