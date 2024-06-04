import React, { useState, useRef } from 'react';
import rockCard from '../assets/rock.jpg';
import paperCard from '../assets/paper.jpg';
import scissorsCard from '../assets/scissor.jpg';
import hiddenCard from '../assets/hidden.png';
import rockSound from '../assets/rock.mp3';
import cardSound from '../assets/card.mp3';
import paperSound from '../assets/paper.mp3';
import scissorsSound from '../assets/scissors.mp3';
import '../styles/Game.css';

const CardGrid = ({
  playerCards,
  computerCards,
  onPlayerCardClick,
  result,
  isGameOver,
  playerScore,
  computerScore,
  roundsPlayed,
}) => {
  const [message, setMessage] = useState('');
  const [gameOverMessage, setGameOverMessage] = useState('');

  const rockAudioRef = useRef(null);
  const paperAudioRef = useRef(null);
  const scissorsAudioRef = useRef(null);
  const cardAudioRef = useRef(null);

  const handlePlayerCardClick = (cardValue) => {
    if (roundsPlayed < 3) {
      onPlayerCardClick(cardValue);
      updateMessage(cardValue, result);
    }
  };

  const updateMessage = (playerChoice, result) => {
    if (result === 'player') {
      setMessage('Victory!');
    } else if (result === 'computer') {
      setMessage('Defeat...');
    } else if (result === 'tie') {
      setMessage('It\'s a tie!');
    } else {
      setMessage('');
    }

    if (isGameOver) {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    if (playerScore > computerScore) {
      setGameOverMessage('You won the game!');
    } else if (playerScore < computerScore) {
      setGameOverMessage('You lost the game!');
    } else {
      setGameOverMessage('It\'s a tie!');
    }
  };

  const handleCardClick = (cardValue) => {
    switch (cardValue) {
      case 'rock':
        cardAudioRef.current.play();
        rockAudioRef.current.play();
        break;
      case 'paper':
        cardAudioRef.current.play();
        paperAudioRef.current.play();
        break;
      case 'scissors':
        cardAudioRef.current.play();
        scissorsAudioRef.current.play();
        break;
      default:
        break;
    }
  };
  const handleCardHover = (cardValue) => {
    switch (cardValue) {
      case 'rock':
        cardAudioRef.current.play();
        break;
      case 'paper':
        cardAudioRef.current.play();
        break;
      case 'scissors':
        cardAudioRef.current.play();
        break;
      default:
        break;
    }
  };

  return (
    <div className="game-container">
      <div className="info-container">
        <div className="info">
          <p>Player Score: {playerScore}</p>
          <p>Computer Score: {computerScore}</p>
          <p>Rounds Played: {roundsPlayed}</p>
        </div>
      </div>
      <div className="cards-container">
        <div className="player-cards-container">
          <h2 className="player-title">Player Cards</h2>
          <div className="player-cards">
            {playerCards.map((card, index) => (
              <div
                key={index}
                className="card"
                onClick={() => handleCardClick(card.value)}
                onMouseEnter={() => handleCardHover(card.value)}

              >
                <img
                  src={card.image}
                  alt={card.name}
                  onClick={() => handlePlayerCardClick(card.value)}
                  className="player-card clickable"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="computer-cards-container">
          <h2 className="computer-title">Fate Cards</h2>
          <div className="computer-cards">
            {computerCards.map((card, index) => (
              <div
                key={index}
                className="card">
                <img src={card.image} alt={card.name} className="computer-card clickable" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="message-container">
        <h2 className="message">{message}</h2>
      </div>
      {isGameOver && (
        <div className="game-over-container">
          <h1 className="game-over-message">{gameOverMessage}</h1>
        </div>
      )}
      <audio ref={rockAudioRef} src={rockSound} />
      <audio ref={paperAudioRef} src={paperSound} />
      <audio ref={scissorsAudioRef} src={scissorsSound} />
      <audio ref={cardAudioRef} src={cardSound} />
    </div>
  );
};

export default CardGrid;