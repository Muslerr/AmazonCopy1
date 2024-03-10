import { useContext, useEffect, useState } from "react";
import { Store } from "../Store.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils.jsx";
import Title from "../components/Shared/Title.jsx";
import CheckoutSteps from "../components/Shared/CheckoutSteps.jsx";
import { Col, Row, axios } from "../imports.js";
import OrderSummary from "../components/Shared/OrderSummary.jsx";
import PaymentSummary from "../components/Shared/PaymentSummary.jsx";
import { CLEAR_CART } from "../actions.jsx";

const SubmitOrder = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, []);

  const submitOrderHandler = async () => {
    try {
      setLoading(true);
      const orderData = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };
      const { data } = await axios.post("/api/v1/orders", orderData, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      ctxDispatch({ type: CLEAR_CART });
      console.log(data);
      localStorage.removeItem("cartItems");
      const orderId = data.order._id;
      console.log(orderId , "order id ");    
      navigate(`/orders/${orderId}`);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  cart.taxPrice = round2(cart.itemsPrice * 0.17);
  cart.shippingPrice =
    cart.itemsPrice > 50
      ? round2(cart.itemsPrice * 0.1)
      : round2(cart.itemsPrice * 0.02);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  return (
    <div>
      <Title title="Order Summary" />
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="my-3">Order Summary</h1>
      <Row>
        <Col md={8}>
          <OrderSummary cart={cart} status={"submitOrder"} />
        </Col>
        <Col md={4}>
          <PaymentSummary
            loading={loading}
            submitOrderHandler={submitOrderHandler}
            status="submitOrder"
            cart={cart}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SubmitOrder;
