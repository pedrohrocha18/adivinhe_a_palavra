import React from "react";
import Button from "./Button";

const GameOver = ({ retry, score }) => {
  return (
    <div>
      <h1>Fim de Jogo!</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <Button description={"Reiniciar Jogo"} onClick={retry} />
    </div>
  );
};

export default GameOver;
