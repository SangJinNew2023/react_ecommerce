import React, {createContext, useContext, useReducer, useEffect} from 'react'
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filter_reducer"

const FilterContext = createContext(); //context 생성

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,


};

export const FilterContextProvider = ({children}) => { //context provider 생성 및 접근 가능한 value 설정
    const { products } = useProductContext();
    
    const [state, dispatch] = useReducer(reducer, initialState);

//to set the grid vieww
    const setGridView = () => {
        return dispatch({type: "SET_GRIDVIEW" })
    };
    
    useEffect(() => {
        dispatch({type:"LOAD_FILTER_PRODUCTS", payload: products});
    }, [products]);

    return (
        <FilterContext.Provider value={{...state}}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => { //생성한 FilterContext 사용을 위해 useContext를 반환하는 함수 생성
    return (
        useContext(FilterContext)
    );
};