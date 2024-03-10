import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store.jsx';
import Title from '../components/Shared/Title.jsx';
import CheckoutSteps from '../components/Shared/CheckoutSteps.jsx';
import { Container,Form ,Button} from '../imports.js';
import { SAVE_SHIPPING_ADDRESS } from '../actions.jsx';



const Shipping = () => {
  
  const navigate= useNavigate();
  const {state,dispatch:ctxDispatch} = useContext(Store);
  const {userInfo,cart:{cartItems}}=state;

  
  useEffect(() => {
    if(cartItems.length ===0)
       navigate("/"); 
    if(!userInfo){
        navigate("/signin?redirect=/shipping")
     }
  }, []);

  const submitHandler= (e) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    ctxDispatch({type: SAVE_SHIPPING_ADDRESS, payload: data});
    navigate("/payment");
  }
  
  return (
    <div>
      <Title title="Shipping Details"></Title>
      <CheckoutSteps step1 step2 />
      <Container className="small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control name="fullName" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control name="address" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City:</Form.Label>
            <Form.Control name="city" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control name="postalCode" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country:</Form.Label>
            <Form.Control name="country" required></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default Shipping