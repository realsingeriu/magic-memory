import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

// 카드 이미지
const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  // 카드와 턴 수 스테이트 만들기
  const [cards, setCards] = useState([]); //카드 상태
  const [turns, setTurns] = useState(0); // 턴 수 상태
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

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
      if (choiceOne.src === choiceTwo.src) {
        console.log("카드를 맞췄어요!");
        resetTurn();
      } else {
        console.log("틀렸네요.");
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  // 맞추거나 틀렸을때 선택들을 모두 초기화
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      {/* "New Game" 버튼 클릭 시 shuffleCards 함수 호출 */}
      <button onClick={shuffleCards}>New Game</button>

      {/* 카드를 표시하는 그리드 */}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
