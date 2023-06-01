
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
    //dispactch로 전달된 action.type에 따른 return 값 
    switch (action.type) { 
        //initial state와 islodaing: true 전달, api로 부터 data를 받아는 단계
        case "SET_LOADING":
           return {
            ...state, 
            isLoading: true,
           };
        
        //productconext.js에서 전달받은 action.payload.products 중 featured===ture인것만 featureProducts에 담고
        //{...state, isLoading: false, products: action.payload, featureProducts: featureData} 형태로 반환
        case "SET_API_DATA":
            const featureData = action.payload.filter((curElem)=> {  //curElem은 products data 중 featured===ture 인것만 담아 반환 
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