import rockCard from '../assets/rock.jpg';
import paperCard from '../assets/paper.jpg';
import scissorsCard from '../assets/scissor.jpg';

export const CHOICES = [
  { name: 'Rock', image: rockCard, value: 'rock' },
  { name: 'Paper', image: paperCard, value: 'paper' },
  { name: 'Scissors', image: scissorsCard, value: 'scissors' },
];

export function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

export function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}