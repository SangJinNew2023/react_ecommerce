import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Star = ({ stars, reviews }) => {
    const ratingStart = Array.from({ length: 5 }, (elem, index) => {//length가 5이고 [1,2,3,4,5] array 생성 후 index(0,1,2,3,4)를 차례대로 반환
      console.log(index);  
      let number = index + 0.5;

        return (
            <span key={index}>
                {stars >= index + 1 ? ( //stars index +1 즉(1,2,3,4,5)과 같거나 크면 꽉찬 별 1개
                <FaStar className="icon" />
                ) : stars >= number ? (  //아니면 starts가 number(0.5,1.5,2.5,3.5,4.5,5.5)와 같거나 큰지 비교 true이면 FaStarHalfAlt(반별) 1개 아니면 AiOutlineStar
                <FaStarHalfAlt className="icon" />
                ) : (
                <AiOutlineStar className="icon" />
                )}
            </span>
        );
    });

  return (
    <Wrapper>
        <div className="icon-style">
            {ratingStart}
            <p>({reviews} customer reviews)</p>
        </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 2rem;
      color: orange;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;
export default Star;