import React from 'react'
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/filter_context";

const Sort = () => {
  //grid_view가 boolean 값을 이용해 정렬 형태와 버튼의 스타일 변경
  //filter_products은 제품 갯수 표현에 사용
  const{filter_products, grid_view, setGridView, setListView, sorting } = useFilterContext();

  return (
    <Warpper className="sort-section">
      {/* 1st column */}
      <div className="sorting-list--grid">
        <button 
        className={grid_view ? "active sort-btn" : "sort-btn"}
        onClick={setGridView}>
          <BsFillGridFill className="icon" />
        </button>

        <button 
        className={!grid_view ? "active sort-btn": "sort-btn"}
        onClick={setListView}>
          <BsList className="icon" />
        </button>
      </div>
 
      {/* 2nd column */}
      <div className="product-data">
        <p>{`${filter_products.length} Product Available`}</p>
      </div>

      {/* 3rd column */}
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select name="sort" id="sort" className="sort-selection--style" onClick={sorting}>
            <option value="lowest">Price(lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price(highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Name(a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Name(z-a)</option>
          </select>
        </form>
      </div>
    </Warpper>
  );
};
//<option value="#" disabled></option>은 <br/> 대신 사용

const Warpper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 1rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }

`;
export default Sort