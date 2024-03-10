import React from "react";
import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store.jsx";
import axios from "axios";
import { addToCartHandler } from "../utils";
import descriptionReducer from "../reducers/descriptionReducer.jsx";
import {
  GET_FAIL,
  GET_REQUEST,
  GET_SUCCESS,
  CLEAR_ORDER_DETAILS,
} from "../actions";
import { getError } from "../utils";
import Loading from "../components/Shared/Loading.jsx";
import MessageBox from "../components/Shared/MessageBox.jsx";
import { Row, Col, Card, Button,Link } from "../imports.js";

import Title from "../components/Shared/Title.jsx";
import OrderSummary from "../components/Shared/OrderSummary.jsx";
import PaymentSummary from "../components/Shared/PaymentSummary.jsx";
import { toast } from "react-toastify";

const initialState = { loading: true, error: "", data: [] };

const Summary = () => {
  const [{ loading, error, data }, dispatch] = useReducer(
    descriptionReducer,
    initialState
  );
  const params = useParams();
  const { id } = params;
  const [cart, setCart] = useState({
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "",
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
  });
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;
  useEffect(() => {
    const getOrder = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        console.log(userInfo.token);
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/orders/${id}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: GET_SUCCESS, payload: data });
        setCart({
          cartItems: data.order.orderItems,
          shippingAddress: data.order.shippingAddress,
          paymentMethod: data.order.paymentMethod,
          itemsPrice: data.order.itemsPrice,
          taxPrice: data.order.taxPrice,
          shippingPrice: data.order.shippingPrice,
          totalPrice: data.order.totalPrice,
        });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: getError(error) });
        toast.error(getError(error));
      }
      ctxDispatch({ type: CLEAR_ORDER_DETAILS });
    };
    getOrder();
  }, []);
  const nav =()=>{
    navigate('/');
  }
  return (
    <div>
      <Title title="Order Confirmed" />
      <h1 className="my-3">Order Confirmed</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          <Col md={8}>
            <OrderSummary cart={cart} status={"details-unpaid"} />
          </Col>
          <Col md={4}>
            <PaymentSummary status="details-unpaid" cart={cart} />
            <Row >
              {(
                <Button onClick={nav} variant="primary" >
                  Back to Home Page
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Summary;
