import React from 'react'
import { FaMinus, FaPlus } from "react-icons/fa"

const CartAmountToggle = ( {amount, setDecrease , setIncrease} ) => {
  return  (
    <div className= "cart-button">
        <div className="amount-toggle">
            <button onClick={() => setDecrease()}> 
                <FaMinus />
            </button>
            <div className="amount-style"> { amount }</div>
            <button onClick={() => setIncrease()}>
                <FaPlus />
            </button>
        </div>
    </div>
  );
};

export default CartAmountToggle;

//onClick에 함수를 바로 호출하면 함수의 결과값을 onClick에 적용
