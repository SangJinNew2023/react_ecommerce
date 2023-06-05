const filterReducer = (state, action) => {
    switch(action.type) {

        case "LOAD_FILTER_PRODUCTS":
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
            };
        
        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            };


        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            };
            
        case "GET_SORT_VALUE":
            // let userSortValue = document.getElementById("sort"); //"sort" is from sort.js
            // let sort_value = userSortValue.options[userSortValue.selectedIndex].value; // value is from <option> in sort.js
            return {
                ...state, 
                sorting_value: action.payload,
            };
        
        case "SORTING_PRODUCTS":
            let newSortData;
            const{ filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];

            const sortingProducts = (a, b) => {
                if (sorting_value === "lowest") {
                    return a.price - b.price; //오름차순 정렬을 의미[1,2,3,4]
                };

                if (sorting_value === "highest") {
                    return b.price - a.price; //내림 차순으로 정렬[4,3,2,1]
                };

                if(sorting_value === "a-z") {             
                //localeCompare는 브라우저가 제공하는 비교 메서드, -1은 왼쪽, 1은 오른쪽이 순서가 빠르다는 의미, 0은 같다는 뜻
                    return a.name.localeCompare(b.name);
                };

                if(sorting_value === "z-a") {
                        return b.name.localeCompare(a.name);
                };
            };
            newSortData = tempSortProduct.sort(sortingProducts);

            return {
                ...state,
                filter_products: newSortData,
            };

        default: return state;
    };

};

export default filterReducer;