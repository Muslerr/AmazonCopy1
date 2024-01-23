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
          </Routes>
        </Container>
      </main>
      <Footer/>
    </div>
  </BrowserRouter>
  )
}

export default App
