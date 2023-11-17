import React from 'react';
import './SingleCard.css';

const SingleCard = (props) => {
  return (
    <div className='card'>
      <div>
        {/* 카드 앞면 */}
        <img className='front' src={props.card.src} alt='card front'></img>
        {/* 카드 뒷면 */}
        <img className='back' src='/img/cover.png' alt='card back'></img>
      </div>
    </div>
  );
};

export default SingleCard;

