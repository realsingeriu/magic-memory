import { useState } from "react";
import "./App.css";

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
  // 콘솔에 현재 카드 상태와 턴 수 출력
  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      {/* "New Game" 버튼 클릭 시 shuffleCards 함수 호출 */}
      <button onClick={shuffleCards}>New Game</button>

      {/* 카드를 표시하는 그리드 */}
      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div>
              {/* 카드의 앞면 */}
              <img className="front" src={card.src} alt="card front"></img>
              {/* 카드의 뒷면 */}
              <img className="back" src="/img/cover.png" alt="card back"></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
