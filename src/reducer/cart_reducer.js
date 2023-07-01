import React from 'react'

const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let {id, color, amount, product } = action.payload;

    // takle the existing product
    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color
    );

    if (existingProduct) {
      let updateProduct = state.cart.map((curElem) =>{
        if(curElem.id === id + color) {
          let newAmount = curElem.amount + amount;
          if(newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        };
      });
      return {
        ...state,
        cart: updateProduct,
      };
    } else {
      let cartProduct = {
        id : id + color,
        name : product.name,
        color,
        amount,
        image : product.image[0].rul,
        price: product.price,
        max: product.stock,
      };
    }

    return {
      ...state,
      cart: [...state.cart, cartProduct],
    };
  }
  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload)
    return {
      ...state,
      cart: updatedCart,
    }
  };
  //to empty or to clear to cart
  if(action.type === "CLEAR_CART") {
    return {
      ...state,
      cart:[],
    }
  }
  return state;
}

export default cartReducer
