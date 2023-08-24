import "./chat.css";
import WordleGame from "./Wordle";
import Image from "next/image";
export default function Chat() {
  console.log("Hello");

  return (
    <div className="wordle">
      <div className="nameplate">Profressor Hazel</div>
      <div className="conversation">
        <div className="chatbox">
          Ah, welcome to my lab! Can you guess the name of this fascinating
          Pokémon we have here?
        </div>
        <div className="portrait">
          <Image
            src={"/images/icons/profressor.jpg"}
            width={130}
            height={130}
            alt="Next.js Logo"
            priority
          />
        </div>
      </div>
      <div>
        <WordleGame></WordleGame>
      </div>
    </div>
  );
}
