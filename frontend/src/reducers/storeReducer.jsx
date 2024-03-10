import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_CART,REMOVE_FROM_CART, SAVE_SHIPPING_ADDRESS,SAVE_PAYMENT_METHOD,CLEAR_CART,CLEAR_ORDER_DETAILS } from "../actions";

const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_SIGNIN: {
      return { ...state, userInfo: payload };
    }
    
    case USER_SIGNOUT: {
      return { ...state, 
        userInfo: null ,
        cart:{cartItems:[],shippingAddress:{},paymentMethod:""},
    };
    }
    
    case ADD_TO_CART: {
      const newItem = payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));      
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    
    case REMOVE_FROM_CART:{
        console.log("case remove")
        const cartItems = state.cart.cartItems.filter((product) => product._id !== payload._id)
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems} };
    }

    case SAVE_SHIPPING_ADDRESS:{
        localStorage.setItem("shippingAddress", JSON.stringify(payload));
        return{...state,cart:{...state.cart,shippingAddress: payload}}
    }

    case SAVE_PAYMENT_METHOD:{
        return {...state,cart:{...state.cart,paymentMethod: payload}}
    }
    case CLEAR_CART: {
        return { ...state, cart: { ...state.cart, cartItems: [] }};
    }
    case CLEAR_ORDER_DETAILS: {
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");  
        console.log("reached store reducer");      
        return { ...state, cart: {...state.cart, shippingAddress:{},paymentMethod:""}};
    }



    default:
      return { ...state };
  }
};
export default storeReducer;
