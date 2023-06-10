import React, {createContext, useContext, useReducer, useEffect} from 'react'
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filter_reducer"

//context 생성
const FilterContext = createContext(); 

//initial data 생성
const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "lowest",
    filters: {
        text: "",
        category: "all",
        company: "all",
        color:"all",
    },
};

//context provider 생성 및 initial value 설정
export const FilterContextProvider = ({children}) => { 
    const { products } = useProductContext(); //useProductContext()를 통해 prudcts data에 불러옴
    
    //context provider내부에 useReducer를 사용 action에 따른 결과값 return 후 state 값을 동적으로 변경
    const [state, dispatch] = useReducer(reducer, initialState);

//to set the grid vieww
    const setGridView = () => {
        return dispatch({type: "SET_GRID_VIEW" })
    };

//to set the list vieww   
    const setListView = () => {
        return dispatch({type: "SET_LIST_VIEW" })
    };

// sorting function
    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({ type: "GET_SORT_VALUE", payload: userValue});
    };

    //update the filter values
    const updateFilterValue =(event) => {
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({type:"UPDATE_FILTERS_VALUE", payload: { name, value } });
    };

    //to sort the product
    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" });
        dispatch({ type: "SORTING_PRODUCTS" });
    }, [products, state.sorting_value, state.filters]);

    //to load all the products for grid and list view
    useEffect(() => {
        dispatch({type:"LOAD_FILTER_PRODUCTS", payload: products});
    }, [products]);

    return (
        <FilterContext.Provider value={{...state, setGridView, setListView, sorting, updateFilterValue}}>
            {children}
        </FilterContext.Provider>
    );
};

//생성한 FilterContext 사용을 위해 useContext를 반환하는 함수 생성
export const useFilterContext = () => { 
    return (
        useContext(FilterContext)
    );
};