import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard"

// Card Images and match state
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  // Hooks
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  // Shuffle cards function
  const shuffleCards = () => {
    // Create cards board
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    // Set choices to null
    setChoiceOne(null);
    setChoiceTwo(null);
    // Store the board in a state
    setCards(shuffledCards);
    // Set the turn value
    setTurns(0);
  };

  // Define if it is first or second choice function
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Compare 2 selected cards when the choices are made
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      // If card matches
      if (choiceOne.src === choiceTwo.src) {
        // Iterate over the cards
        setCards(prevCards => {
          return prevCards.map(card => {
            //Find card that matches
            if (card.src === choiceOne.src) {
              // Assign true
              return {...card, matched: true}
              // To all the other cards
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
        
      }
    }
  }, [choiceOne, choiceTwo])
  

  // Reset function
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }
 

  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
      {cards.map((card) => (
      <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
    ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
