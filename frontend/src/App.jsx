import { useState } from 'react'
import './App.css'
import Title from './components/Shared/Title'
import { Footer } from './components/Shared/Footer'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { HomePage } from './Pages/homePage'
import Header from './components/Shared/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='d-flex flex-column side-allPage min-width'>
      <Header></Header>
      <main>
        <Container className='mt-3'>
          <Routes>
            <Route path = "/" element = {<HomePage/>}></Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </div>
  </BrowserRouter>
  )
}

export default App
