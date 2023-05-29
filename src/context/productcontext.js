import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";


//createContext, useReducer를 사용할때 부모로부터 하위간의 레벨이 많은 경우 
//props로 dispatch를 계속 넘겨야하는 점을 보완
const AppContext = createContext(); 

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading : false, //for singleProducts only
    singleProduct: {}, //for singleProducts only
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState); 
  
    const getProducts = async(url) => {
        dispatch({type: "SET_LOADING" });
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({ type:"SET_API_DATA", payload: products }); //type: action , payload:는 state를 변경 할 data로 reducer에게 전송
        } catch (error) {
            dispatch({ type:"API_ERROR" });
        }
     };

    // 2nd api call for single product
    const getSingleProduct = async (url) => { //url from SingleProduct.js
        dispatch({ type: "SET_SINGLE_LOADING"}); //getSingleProduct을 호출하며 url에서 data를 받오는 시간동안 loading msg 출력
        try {
            const res = await axios.get(url); //url에서 data 받아오기
            console.log(res);
            const singleProduct = await res.data;
            console.log(singleProduct);
            dispatch({ type:"SET_SINGLE_PRODUCT", payload: singleProduct });
        } catch (error) {
            dispatch({ type:"SET_SINGLE_ERROR" });
        }
    };

    useEffect(() => {
        getProducts(API);    
    }, []);

    return (
        <AppContext.Provider value={{ ...state, getSingleProduct }}>
            {children}
        </AppContext.Provider>
    )
};

//custom hooks
const useProductContext = () => {
    return (
        useContext(AppContext)
    );
};

export { AppProvider, AppContext, useProductContext };