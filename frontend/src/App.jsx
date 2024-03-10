import { useState } from 'react'
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { Footer } from './components/Shared/Footer'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { HomePage } from './Pages/homePage'
import Header from './components/Shared/Header'
import SignIn from './Pages/signIn.jsx'
import SignUp from './Pages/signUp.jsx'
import {ToastContainer} from 'react-toastify'
import Description from './Pages/Description.jsx';
import Cart from './Pages/Cart.jsx';
import Shipping from './Pages/Shipping.jsx';
import Payment from './Pages/Payment.jsx';
import SubmitOrder from './Pages/SubmitOrder.jsx';
import Summary from './Pages/Summary.jsx';
import Search from './Pages/Search.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='d-flex flex-column side-allPage min-width'>
    <ToastContainer position='bottom-center' limit={1}/>
      <Header></Header>
      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path = "/" element = {<HomePage/>}></Route>
            <Route path = "/signin" element = {<SignIn/>}></Route>
            <Route path = "/signUp" element = {<SignUp/>}></Route>
            <Route path = "/Cart" element = {<Cart/>}></Route>
            <Route path = "/Shipping" element = {<Shipping/>}></Route>
            <Route path = "/Payment" element = {<Payment/>}></Route>
            <Route path = "/product/:token" element = {<Description/>}></Route>
            <Route path = "/orders/:id" element = {<Summary/>}></Route>
            <Route path="/placeorder" element={<SubmitOrder />}></Route>
            <Route path="/search" element={<Search />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </div>
  </BrowserRouter>
  )
}

export default App
