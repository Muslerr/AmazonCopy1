import React, { useContext } from 'react'
import { Store } from '../Store'
import  Title  from '../components/Shared/Title.jsx';
import Checkout from '../components/cartPage/Checkout.jsx';
import ItemsInCart from '../components/cartPage/ItemsInCart.jsx';
import { toast,axios,Row,Col } from '../imports.js';
import {ADD_TO_CART,REMOVE_FROM_CART} from '../actions.jsx'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {state,dispatch:ctxDispatch} = useContext(Store);
  const {cart} = state;
  const {cartItems}=cart;
  const navigate=useNavigate();

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping")
  };

  const updateCartHandler= async(product, quantity)=>{
    try {
        const { data } = await axios.get(`/api/v1/products/${product._id}`);
    
        if (data.countInStock < quantity) {
          alert("Sorry, product is out of stock");
          return;
        }
        ctxDispatch({
          type: ADD_TO_CART,
          payload: { ...product, quantity },
        });
      } catch (error) {
        toast(error.message);
      }
  }
  
  const removeProductHandler = async (product) => {
    console.log("reached cart ")
    ctxDispatch({ type: REMOVE_FROM_CART, payload: product });
  };

  
    return (
    <div>
        <Title title="Shopping Cart"></Title>
        <Row>
            <Col md={8}>
            <ItemsInCart  cartItems={cartItems}
             updateCartHandler={updateCartHandler}
             removeProductHandler={removeProductHandler}
            />
            </Col>
            <Col md={4}>
            <Checkout cartItems={cartItems}
             checkoutHandler={checkoutHandler}/>
            </Col>
        </Row>
    </div>
  )
}

export default Cart