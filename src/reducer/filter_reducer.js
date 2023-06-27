const filterReducer = (state, action) => {
    switch(action.type) {
        case "LOAD_FILTER_PRODUCTS":
            //1way
            // let priceArr = action.payload.map((curElem) => curElem.price) //각각의 price를 priceArr에 대입
            //console.log(Math.max.apply(null, priceArr)) apply를 사용해 priceArr을 입력으로 받음

            //2way
            // let priceArr = action.payload.map((curElem) => curElem.price) //각각의 price를 priceArr에 대입
            // let maxprice = priceArr.reduce((initiaVal, curElem) => 
            //     Math.max(initialVal, curVal)
            // ;)

            //3way
            let priceArr = action.payload.map((curElem) => curElem.price) //각각의 price를 priceArr에 대입
            let maxPrice = Math.max(...priceArr);

            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: {...state.filters, maxPrice, price: maxPrice},
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
        
        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value
                }
            };
        
        case "FILTER_PRODUCTS":
            let {all_products } = state;
            
            let tempFilterProduct = [...all_products];
            console.log(tempFilterProduct)

            const { text, category, company, color, price} = state.filters;
            console.log(text)

            if(text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text);
                });
            };

            if(category !== "all") {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.category === category);
            };

            if(company !== "all") {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
                );
            };
            
            if(color !== "all") {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.colors.includes(color)
                    );
            };

            if(price === 0) {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.price == price
                );
            } else {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.price <= price
                );
            } 

            // console.log("tempFilterProduct", temFilterProduct)             
            return {
                ...state,
                filter_products: tempFilterProduct,
            };

           

        case "CLEAR_FILTERS": // 기본 filter data 전달
            return {
                ...state,
                filters:{
                ...state.filters,
                text: "",
                category: "all",
                company: "all",
                color:"all",
                maxPrice: 0,
                price: state.filters.maxPrice,
                minPrice: state.filters.maxPrice,
                },
            };

        default: 
            return state;
    };
};

export default filterReducer;