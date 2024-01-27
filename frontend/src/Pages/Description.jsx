import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store.jsx";
import axios from "axios";
import { addToCartHandler } from "../utils";
import descriptionReducer from "../reducers/descriptionReducer.jsx";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import { getError } from "../utils";
import Loading from "../components/Shared/Loading.jsx";
import MessageBox from "../components/Shared/MessageBox.jsx";
import { Row,Col } from "react-bootstrap";
import CartDescription from "../components/descriptionPage/CartDescription.jsx";
import ProductDescription from "../components/descriptionPage/ProductDescription.jsx";
import Title from "../components/Shared/Title.jsx";


const initialState = { loading: true, error: "", data: [] };

const Description = () => {
    const [{ loading, error, data }, dispatch] = useReducer(
        descriptionReducer,
        initialState
      );
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  useEffect(() => {
    const getProduct = async () => {
        dispatch({type: GET_REQUEST})
        try {
            const {data} = await axios.get(`/api/v1/products/token/${token}`);
            dispatch({type: GET_SUCCESS, payload: data});
        } catch (error) {
            dispatch({type: GET_FAIL, payload: getError(error)});
        }
    }
    getProduct();
  }, [token])

  const addToCart= async () => {
     await addToCartHandler(data,cartItems,ctxDispatch);
     navigate('/cart');
  };

  return <div><Title title={data.title}></Title>
    
    {loading ? <Loading/> : error ? <MessageBox variant="danger">{error}</MessageBox>:(
          <div>
            <Row>
                <Col md={6}>
                    <img width={400} src ={data.image} alt ={data.title}></img>
                </Col>
                <Col md={3}>
                    <ProductDescription {...data}/>
                </Col>
                <Col md={3}>
                    <CartDescription addToCart={addToCart} product={data}/>
                </Col>
            </Row>
          </div>
    )}
  </div>;
};

export default Description;
