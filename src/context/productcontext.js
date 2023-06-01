import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";


//createContext, useReducer를 사용할때 부모로부터 하위간의 레벨이 많은 경우 
//props로 dispatch를 계속 넘겨야하는 점을 보완

//context 생성
const AppContext = createContext(); 

//data를 받아올 api 주소 
const API = "https://api.pujakaitem.com/api/products";

//context를 통해 전달할 intial data 설정
const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading : false, //for singleProducts only
    singleProduct: {}, //for singleProducts only
};

// context provider 생성
const AppProvider = ({ children }) => {
    //context provider내부에 useReducer를 사용 action에 따른 결과값 return 후 state 값을 동적으로 변경
    const [state, dispatch] = useReducer(reducer, initialState); 
    
    // api로 부터 모든 products data 받아오는 함수
    const getProducts = async(url) => {
        dispatch({type: "SET_LOADING" });
        try {
            const res = await axios.get(url);
            const products = await res.data;
            console.log("products", products);
            
            //type: action , payload:는 state를 변경 할 data로 reducer에게 전송
            dispatch({ type:"SET_API_DATA", payload: products }); 
        } catch (error) {
            dispatch({ type:"API_ERROR" });
        }
     };

    // 2nd api call for single product
    const getSingleProduct = async (url) => { //url from SingleProduct.js
        //getSingleProduct을 호출하며 url에서 data를 받오는 시간동안 loading msg 출력
        dispatch({ type: "SET_SINGLE_LOADING"}); 
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

    useEffect(() => { //rendering시 getProducts(API);를 통해 api로 부터 data 받아옴
        getProducts(API);    
    }, []);

    return (
        //provider의 value에 initialState를 담고있는 state와 getSingleProduct()함수를 포함시켜 전역 및 props drilling 회피
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