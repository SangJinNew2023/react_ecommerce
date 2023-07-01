import React from 'react'
import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from '../reducer/cart_reducer'

const CartContext = createContext();

const getLocalCartData = () => {
  let newCartData = localStorage.getItem("thapaCart")
  if (newCartData === []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  // cart: [],
  cart:getLocalCartData(),
  total_item:"",
  total_amount:"",
  shipping_fee: 50000,
};

const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({type:"ADD_TO_CART", payload: { id, color, amount, product}});
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  };

  //to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART"});
  };

// to add the data in localStorage
//get vs set
//JSON.stringify JS값이나 객체를 JSON문자열로 변환
useEffect(()=> {
  localStorage.setItem("SangjinCart", JSON.stringify(cart));
}, []);

  return (
  <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart }}>
    {children}
  </CartContext.Provider>
  );
};

const useCartContext = () => {
  return (
    useContext(CartContext)
  );
};
export{ CartProvider, useCartContext };