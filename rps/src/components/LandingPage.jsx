import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import backgroundMusic from '../assets/ost.mp3';
import zawa from '../assets/zawazawa.wav';
import useSound from 'use-sound';

const LandingPage = () => {
  const backgroundMusicRef = useRef(null);
  const [playSound] = useSound(zawa);

  useEffect(() => {
    const backgroundMusic = backgroundMusicRef.current;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        backgroundMusic.play().catch((error) => {
          console.error('Error playing background music:', error);
        });
      } else {
        backgroundMusic.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Play the audio when the component mounts
    backgroundMusic.play().catch((error) => {
      console.error('Error playing background music:', error);
    });

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      backgroundMusic.pause();
    };
  }, []);

  const handlePlaySound = () => {
    playSound();
  };

  return (
    <div className="landing-page">
      <audio ref={backgroundMusicRef} id="background-music" loop>
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <header className="header">
        <h1 className="title">Rock, Paper, Scissors</h1>
        <p className="subtitle">The ultimate game of wits and strategy</p>
      </header>

      <main className="main-content">
        <section className="game-description">
          <h2>About the Game</h2>
          <p>
            Rock, Paper, Scissors: a sinister dance with fate.
          </p>
          <p>Each move is an omen of victory or doom.</p>
          <p>Not for the faint-hearted.</p>
        </section>

        <section className="game-rules">
          <h2>How to Play</h2>
          <p>Rock beats Scissors</p>
          <p>Scissors beat Paper</p>
          <p>Paper beats Rock</p>
          <p>Best of 3 wins!</p>
        </section>

        <section className="call-to-action">
          <Link to="/game" className="play-button" onClick={handlePlaySound}>
            Meet Your Fate
          </Link>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2023 Rock, Paper, Scissors. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;