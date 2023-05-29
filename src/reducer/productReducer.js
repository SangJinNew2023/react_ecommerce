
const ProductReducer = (state, action) => {
    // if(action.type === "SET_LOADING") {
    //     return {
    //         ...state,
    //         isLoading: true,
    //     };
    // }
    // if (action.type ==="API_ERROR") {
    //     return {
    //         ...state,
    //         isLoading: false,
    //         isError: true,
    //     };
    //     return (
    //         state
    //     )
    // }

    switch (action.type) { //dispactch로 전달된 action.type에 따른 반환 값을 달리함
        case "SET_LOADING":
           return {
            ...state, //기본 state에 isLoading: true를 추가
            isLoading: true,
           };

        case "SET_API_DATA":
            const featureData = action.payload.filter((curElem)=> { //payload에서 curElem에 해당하는 data 반환
                return curElem.featured === true;
            });

            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featureProducts: featureData,
            };

        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        
        case "SET_SINGLE_LOADING":
            return {
                ...state,
                isSingleLoading :true,
            };

        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                isSingleLoading :false,
                singleProduct: action.payload,
            };

        case "SET_SINGLE_ERROR":
            return {
                ...state,
                isSingleLoading :false,
                isError: true,
            };

        default:
            return state;

    }
};

export default ProductReducer;