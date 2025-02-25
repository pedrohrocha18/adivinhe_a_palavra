// react
import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css";

// data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedCategory, setPickedCategory] = useState();
  const [pickedWord, setPickedWord] = useState();
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetter] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickeCategoryWord = useCallback(() => {
    // retorna as CHAVES do objeto
    const categories = Object.keys(words);

    // escolhe uma chave "categoria" de forma aleatória
    const category = categories[Math.floor(Math.random() * categories.length)];

    // escolhe uma palavra dentro da chave "categoria" escolhida
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStates();
    // desestruturação do objeto
    const { category, word } = pickeCategoryWord();

    // transforma a palavra em letras minúsculas e separa as letras
    const wordLetters = word.toLowerCase().split("");

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickeCategoryWord]);

  const verifyLetter = (leter) => {
    const normalizedLetter = leter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetter((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  function clearLetterStates() {
    setGuessedLetter([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    if(gameStage !== "game") return;

    const uniqueLetters = [...new Set(letters)];

    console.log(score);

    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore + 100);

      startGame();
    }
  }, [guessedLetters, startGame, letters, gameStage]);

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  return (
    <div>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
