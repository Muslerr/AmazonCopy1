import React from 'react'
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import SearchBox from './SearchBox'

const Header = () => {
  return (
    
    <header>
      <NavBar bg='dark' variant='dark'>
        <Container>
           
           <LinkContainer to='/'>
            <NavBar.Brand>
                <img src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695" width={80} alt='Amazon logo'></img>
            </NavBar.Brand>
           </LinkContainer>
           <SearchBox/>           
           <nav className='d-flex align-items-center justify-content-end me-2 ms-4'>            
            <Link to="/cart" className='nav-link'>
                <i className='fa fa-shopping-cart text-white'></i>
            </Link>
           </nav>
           <Link to='/sign in' className='text-white nav-link'>
            sign in
           </Link>
        </Container>
      </NavBar>      
    </header>
    
  )
}

export default Header