import React, { useState, useRef, useEffect } from 'react';
import Result from './Result';
import CardGrid from './CardGrid';
import { getComputerChoice, determineWinner } from '../utils/gameLogic';
import rockCard from '../assets/rock.jpg';
import paperCard from '../assets/paper.jpg';
import scissorsCard from '../assets/scissor.jpg';
import hiddenCard from '../assets/hidden.png';
import '../styles/Game.css';
import '../styles/Win.css';
import '../styles/DeathMessage.css';
import hope from '../assets/hope.png';
import death from '../assets/death.png';
import tie from '../assets/tie.png';
import rockSound from '../assets/rock.mp3';
import paperSound from '../assets/paper.mp3';
import scissorsSound from '../assets/scissors.mp3';
import lose from '../assets/lose.mp3';
import win from '../assets/win.mp3';



const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [message, setMessage] = useState('');
  const [computerCards, setComputerCards] = useState([
    { name: 'Hidden', image: hiddenCard, value: 'rock' },
    { name: 'Hidden', image: hiddenCard, value: 'paper' },
    { name: 'Hidden', image: hiddenCard, value: 'scissors' },
  ]);

  const playerCards = [
    { name: 'Rock', image: rockCard, value: 'rock' },
    { name: 'Paper', image: paperCard, value: 'paper' },
    { name: 'Scissors', image: scissorsCard, value: 'scissors' },
  ];

  const rockAudioRef = useRef(null);
  const paperAudioRef = useRef(null);
  const scissorsAudioRef = useRef(null);
  const loseAudioRef = useRef(null);
  const winAudioRef = useRef(null);

  useEffect(() => {
    if (roundsPlayed === 3) {
      if (playerScore > computerScore) {
        winAudioRef.current.play();
        setTimeout(() => {
          const winningAnimation = document.createElement("div");
          winningAnimation.classList.add("winning-animation");
          document.body.appendChild(winningAnimation);
          setTimeout(() => {
            winningAnimation.remove();
          }, 1000);
        }, 1000);
      } else if (playerScore < computerScore) {
        loseAudioRef.current.play();
      }
    }
  }, [roundsPlayed, playerScore, computerScore]);
  

  const handlePlayerChoice = (choice) => {
    if (roundsPlayed >= 3) return; // Prevent further plays after 3 rounds

    setPlayerChoice(choice);
    const computerChoice = getComputerChoice();
    setComputerCards(
      computerCards.map((card) =>
        card.value === computerChoice.value
          ? { ...card, image: getCardImage(computerChoice.value) }
          : card
      )
    );
    setComputerChoice(computerChoice);
    const winner = determineWinner(choice, computerChoice.value);
    setResult(winner);

    if (winner === 'player') {
      setPlayerScore(playerScore + 1);
    } else if (winner === 'computer') {
      setComputerScore(computerScore + 1);
    }

    setRoundsPlayed(roundsPlayed + 1);

    if (roundsPlayed < 2) { // Only show messages for the first two rounds
      let messageToSet = '';
      if (winner === 'player') {
        messageToSet = <img src={hope} alt="Hope" className="hope-image" />;
      } else if (winner === 'computer') {
        messageToSet = <img src={death} alt="Death" className="death-image" />;
      } else if (winner === 'tie') {
        messageToSet = <img src={tie} alt="Tie" className="tie-image" />;
      }

      setTimeout(() => {
        setMessage(messageToSet);
      }, 400);

      setTimeout(() => {
        setMessage('');
      }, 2000);

      // Reset the state after a hand is played
      setTimeout(() => {
        setPlayerChoice(null);
        setComputerCards(
          computerCards.map((card) => ({ ...card, image: hiddenCard }))
        );
        setComputerChoice(null);
        setResult(null);
        setMessage('');
      }, 2000);
    } else { // Directly show the final result after the third round
      setMessage('');
    }
  };

  const getCardImage = (value) => {
    switch (value) {
      case 'rock':
        return rockCard;
      case 'paper':
        return paperCard;
      case 'scissors':
        return scissorsCard;
      default:
        return hiddenCard;
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setPlayerScore(0);
    setComputerScore(0);
    setRoundsPlayed(0);
    setComputerCards([
      { name: 'Hidden', image: hiddenCard, value: 'rock' },
      { name: 'Hidden', image: hiddenCard, value: 'paper' },
      { name: 'Hidden', image: hiddenCard, value: 'scissors' },
    ]);
  };

  return (
    <div>
      {result && (
        <div className="dynamic-message">
          <h2>{message}</h2>
          {roundsPlayed === 3 && (
            <>
              <h3>
                {playerScore > computerScore
                  ? 'You won your dance with fate!'
                  : playerScore < computerScore
                  ? 'You lost your dance with fate!'
                  : 'It\'s a tie!'}
              </h3>
              <button onClick={resetGame} className="play-again-button">
                Dance Again
              </button>
            </>
          )}
        </div>
      )}
      <div className={`game-content ${result ? 'blur-background' : ''}`}>
        <CardGrid
          playerCards={playerCards}
          computerCards={computerCards}
          onPlayerCardClick={handlePlayerChoice}
          result={result ? `${result.toUpperCase()}!` : null}
          isGameOver={roundsPlayed >= 3}
          playerScore={playerScore}
          computerScore={computerScore}
          roundsPlayed={roundsPlayed}
        />
        <Result result={result} />
      </div>
      <audio ref={rockAudioRef} src={rockSound} />
      <audio ref={paperAudioRef} src={paperSound} />
      <audio ref={scissorsAudioRef} src={scissorsSound} />
      <audio ref={loseAudioRef} src={lose} />
      <audio ref={winAudioRef} src={win} />
    </div>
  );
};

export default Game;