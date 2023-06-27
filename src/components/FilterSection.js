import React from 'react'
import { useFilterContext } from "../context/filter_context";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../helpers/FormatPrice";
import {Button} from "../styles/Button";

const FilterSection = () => {
  const { 
    filters: { text, category, color, price, maxPrice, minPrice },
    all_products, 
    updateFilterValue,
    clearFilters,
  } = useFilterContext();

  //to get the unique data of each fields
  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) =>{
      return curElem[attr];
    });
    console.log(all_products)
    console.log(newVal);

    //"All"값과 new Set()을 이용해 제품들의 컬러 정보를 모두 합치고(중복은 제거) 반환
    //빈 배열에 .concat을 통해 ...newVal의 값을 합쳐서 넣는다.
    //.concat이 아닌 flat()을 이용하여 간단하게 만듬
    //하위배열을 이어 붙여 새로운 배열을 반환
    if (attr === "colors") {
      // return (["All", ...new Set([].concat(...newVal))]);
      newVal = newVal.flat()
      console.log(newVal)
    }
    return (newVal = ["all", ...new Set(newVal)])
  };

  //we need unique data for category, company
  const categoryData = getUniqueData(all_products, "category");
  const companyData = getUniqueData(all_products, "company");
  const colorsData = getUniqueData(all_products, "colors");
  console.log(companyData)
  
  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
          type="text" 
          name="text"
          placeholder="Search"
          value={text}
          onChange={updateFilterValue} 
          />
        </form>    
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button 
              key={index}
              type="button"
              name="category"
              value={curElem}
              className={curElem === category ? "active" : ""}
              onClick={updateFilterValue}>
                {curElem}
            </button>
            );
          })};
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>
        <form action="#">
          <select 
          name="company" 
          id="company" 
          className="filter-company--select" 
          onClick={updateFilterValue}>
            {
              companyData.map((curElem, index) => {
                return <option key={index} value={curElem} name="company">
                  {curElem}
                </option>;
              })};
          </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style"> 
          { colorsData.map((curColor, index) => {
            console.log(curColor);
              if (curColor === "all") {
                return (
                  <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  className="color-all-style"
                  onClick={updateFilterValue}>
                  all
                  </button>
              )
            };
            console.log(color, curColor)

            return (
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                className={ color === curColor ? "btnStyle active" : "btnStyle" }
                onClick={updateFilterValue}
                style={{ backgroundColor: curColor }}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            )}
          )}
        </div>
        < div className="filter_price">
          <h3>Price</h3>
          <p><FormatPrice price={price} /></p>
          <input 
          type="range" 
          name="price"
          min={minPrice} 
          max={maxPrice} 
          value={price} 
          onChange={updateFilterValue} 
          />
        </div>
        <div className="filter-clear">
              <Button className="btn" onClick={clearFilters}> 
              clear Filters
              </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const  Wrapper = styled.section `
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all-style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }

  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor:pointer;

    &:hover {
      opacity: 1;
    }
  }
    .active {
      opacity: 1;
    }

    .checkStyle {
      font-size: 1rem;
      color:#fff;
    }

    .filter_price {
      input {
        margin: 0.5rem 0 1rem 0;
        padding: 0;
        box-shadow: none;
        cursor: pointer;
      }
    }

    .filter-shipping {
      display: flex;
      align-items: center;
      gap:1rem;
    }

    .filter-clear .btn {
      background-color: #ec7083;
      color: #000;
    }
`;
export default FilterSection;