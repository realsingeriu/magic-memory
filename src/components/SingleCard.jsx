import React from 'react';
import './SingleCard.css';

const SingleCard = ({card, handleChoice}) => {
  // 클릭 이벤트 핸들러 함수 정의
   function handleClick() {
    handleChoice(card) // 카드 정보를 콘솔에 출력
   }
  return (
    <div className='card'>
      <div>
        {/* 카드 앞면 */}
        <img className='front' src={card.src} alt='card front'></img>
        {/* 카드 뒷면, 클릭 이벤트에 handleClick 함수 연결 */}
        <img onClick={handleClick} className='back' src='/img/cover.png' alt='card back'></img>
      </div>
    </div>
  );
};

export default SingleCard;

