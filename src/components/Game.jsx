import React, { useRef, useState } from "react";
import Button from "./Button";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");
    inputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a Palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="wordContainer">
        {letters.map((letter, index) =>
          guessedLetters.includes(letter) ? (
            <span key={index} className="letters">
              {letter}
            </span>
          ) : (
            <span className="blankSquare" key={index}></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            id="letter"
            maxLength={1}
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={inputRef}
          />
          <Button description={"Jogar"} />
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((wrong, index) => (
          <span key={index}>{wrong} </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
