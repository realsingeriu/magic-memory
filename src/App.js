import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

// 카드 이미지
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  // 카드와 턴 수 스테이트 만들기
  const [cards, setCards] = useState([]); //카드 상태
  const [turns, setTurns] = useState(0); // 턴 수 상태
  const [choiceOne, setChoiceOne] = useState(null); // 처음 선택 카드
  const [choiceTwo, setChoiceTwo] = useState(null); // 두번째 선택 카드
  const [disabled, setDisabled] = useState(false); // 선택할 수 없을 때 true
  const [wrongAttempts, setWrongAttempts] = useState(0); // 틀린 횟수 설정

  //카드 섞기
  const shuffleCards = () => {
    // 카드 이미지를 두 배로 복제하고, 무작위로 섞은 뒤 각각의 카드에 고유한 id 부여
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    // 섞인 카드를 상태로 설정(저장)하고, 턴 수를 0으로 초기화
    setCards(shuffledCards);
    setTurns(0);
  };
  //카드 선택시 기억하기
  function handleChoice(card) {
    //console.log(card);
    // 첫번째 선택이 있으면 두번째에 넣고 없으면 첫번째에 입력
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //선택들을 비교하기(useEffect)
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); // 다른 선택을 할 수 없도록 한다
      if (choiceOne.src === choiceTwo.src) {
        // 같은 이미지의 카드들만 matched를 true로 업데이트함
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("틀렸네요.");
        // 틀렸을경우 카운트 +1씩 올라가도록 설정
        setWrongAttempts((prevAttempts) => prevAttempts + 1);
        setTimeout(resetTurn, 500);
      }
    }
  }, [choiceOne, choiceTwo, setCards]);

  // 맞추거나 틀렸을때 선택들을 모두 초기화
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      {/* "New Game" 버튼 클릭 시 shuffleCards 함수 호출 */}
      <button onClick={shuffleCards}>New Game</button>
      {/* 틀린 횟수 설정  */}
      <h2>틀린 횟수: {wrongAttempts}</h2>
      {/* 카드를 표시하는 그리드 */}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
