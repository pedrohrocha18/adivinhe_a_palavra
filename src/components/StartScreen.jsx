import React from "react";
import Button from "./Button";

const StartScreen = ({ startGame }) => {
  return (
    <div>
      <h1>Qual é a Palavra ?</h1>
      <Button description={"Iniciar Jogo"} onClick={startGame} />
    </div>
  );
};

export default StartScreen;
