import "./chat.css";
import WordleGame from "./Wordle";
import { ChatBubble } from "./chat-bubble";
import { useState } from "react";

export default function Chat() {
  const [gameState, setGameState] = useState("playing");

  const handleWin = () => {
    setGameState("winner");
  };

  const handleRestart = () => {
    setGameState("playing");
  };

  return (
    <div className="wordle">
      {gameState === "playing" && (
        <>
          <div>
            <ChatBubble
              name="Professor Hazel"
              message="Ah, welcome to my lab! Can you guess the name of this fascinating
Pokémon we have here?"
            />
          </div>
          <div>
            <WordleGame onGameWin={handleWin} />
          </div>
        </>
      )}

      {gameState === "winner" && (
        <>
          <div>
            <ChatBubble
              name="Professor Hazel"
              message="Congratulations! You guessed correctly! You are a true Pokémon Master!"
            />
          </div>
          <button onClick={handleRestart}>Restart</button>
        </>
      )}
    </div>
  );
}
