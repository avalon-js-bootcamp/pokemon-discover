import "./chat.css";
import WordleGame from "./Wordle";
import { ChatBubble } from "./chat-bubble";
import { useState, useContext } from "react";
import { PokemonContext } from "./PokemonContext";

export default function Chat() {
  const word = useContext(PokemonContext).word;
  const [gameState, setGameState] = useState("playing");

  const handleGameStateChange = (newGameState: string) => {
    setGameState(newGameState);
  };

  const handleRestart = () => {
    setGameState("playing");
    location.reload();
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
        </>
      )}

      {gameState === "illegal" && (
        <>
          <div>
            <ChatBubble
              name="Professor Hazel"
              message="User! This isnt the time to use that! Only use ENTER after you have filled all the letters."
            />
          </div>
        </>
      )}

      {(gameState === "playing" || gameState === "illegal") && (
        <div>
          <WordleGame gameState={handleGameStateChange} />
        </div>
      )}

      {gameState === "winner" && (
        <>
          <div>
            <ChatBubble
              name="Professor Hazel"
              message={`All Right! ${
                word.charAt(0).toUpperCase() + word.slice(1)
              } was caught! Would you like to try catch another?`}
            />
          </div>
          <button onClick={handleRestart}>Restart</button>
        </>
      )}

      {gameState === "failed" && (
        <>
          <div>
            <ChatBubble
              name="Professor Hazel"
              message={`${
                word.charAt(0).toUpperCase() + word.slice(1)
              } escaped using Run Away`}
            />
          </div>
          <button onClick={handleRestart}>Restart</button>
        </>
      )}
    </div>
  );
}
