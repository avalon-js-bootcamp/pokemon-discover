"use client";
import "./Wordle.css";
import React, { useState, useContext } from "react";
import { PokemonContext } from "./PokemonContext";

interface LetterProps {
  attemptNumber: number;
  letterIndex: number;
  onType: (arg0: number, event: any) => void;
}

function Letter(props: LetterProps) {
  const handleOnInput = () => {
    props.onType(props.letterIndex, event);
  };

  return (
    <input
      type="text"
      onInput={handleOnInput}
      className="wordle-text"
      name={`wordleLetter_${props.attemptNumber}_${props.letterIndex}`}
      maxLength={1}
      required
      disabled
    />
  );
}

interface WordProps {
  word: string;
  attemptNumber: number;
  setCurrentGuess: (param: string[]) => void;
  currentGuess: string[];
}

function Word(props: WordProps) {
  const { word, setCurrentGuess, currentGuess } = props;

  const handleOnType = (
    number: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const nextInput = document.querySelector(
      `input[name=wordleLetter_${props.attemptNumber}_${number + 1}]`
    ) as HTMLInputElement;
    const prevInput = document.querySelector(
      `input[name=wordleLetter_${props.attemptNumber}_${number - 1}]`
    ) as HTMLInputElement;

    if (value === "" && prevInput) {
      setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
      prevInput.focus();
    } else if (nextInput) {
      setCurrentGuess([...currentGuess, value]);
      nextInput.focus();
    }
  };

  function renderLetters() {
    let letters: JSX.Element[] = [];

    for (let i = 0; i < word.length; i++) {
      letters.push(
        <Letter
          onType={handleOnType}
          attemptNumber={props.attemptNumber}
          letterIndex={i}
          key={i}
        />
      );
    }

    return letters;
  }

  return <div className="wordle-word">{renderLetters()}</div>;
}

const MAX_ATTEMPTS = 5;

type Props = {
  word: string;
  lastGuess: string[];
};

function PreviousWord({ lastGuess, word }: Props) {
  let splitWord = word.split("");

  for (let i = 0; i < lastGuess.length; i++) {
    const keyboardLetter = document.querySelector(
      `.${lastGuess[i].toUpperCase()}`
    );
    let splitWord = word.split("");
    if (lastGuess[i].toLowerCase() === splitWord[i]) {
      keyboardLetter?.classList.add("hit");
    } else if (splitWord.includes(lastGuess[i].toLowerCase())) {
      keyboardLetter?.classList.add("nearly");
    } else {
      keyboardLetter?.classList.add("miss");
    }
  }
  return (
    <div className="last-guess">
      {lastGuess.map((letter, index) => {
        if (letter.toLowerCase() === splitWord[index]) {
          return (
            <div key={index} className="correct">
              {letter.toUpperCase()}
            </div>
          );
        } else if (splitWord.includes(letter.toLowerCase())) {
          return (
            <div key={index} className="same">
              {letter.toUpperCase()}
            </div>
          );
        } else {
          return (
            <div key={index} className="wrong">
              {letter.toUpperCase()}
            </div>
          );
        }
      })}
    </div>
  );
}

type PropTypes = {
  gameState: (newGameState: string) => void;
};

export default function WordleGame(props: PropTypes) {
  const contextData = useContext(PokemonContext);
  const word = contextData.word;
  const [attempt, setAttempt] = useState(1);
  const [lastGuess, setLastGuess] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const picture = document.querySelector(".hidden");

    if (picture === null) {
      return;
    }

    let userGuess = [];
    let correctLetters = 0;
    let allInputsFilled = true;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const inputName = `wordleLetter_${attempt}_${i}`;
      let letterInput: HTMLInputElement | null = form.elements.namedItem(
        inputName
      ) as HTMLInputElement;

      if (letterInput) {
        const value = letterInput.value;

        if (!value) {
          allInputsFilled = false;
        }

        if (value.toLowerCase() === letter) {
          correctLetters++;
        }

        userGuess.push(value);
      }
    }

    if (!allInputsFilled) {
      props.gameState("illegal");
      return;
    }

    setLastGuess(userGuess);
    setCurrentGuess([]);

    if (correctLetters === word.length) {
      picture.className = "";
      props.gameState("winner");
    } else if (attempt === MAX_ATTEMPTS) {
      picture.className = "";
      props.gameState("failed");
    } else {
      picture.classList.add(`hidden${attempt}`);
      setAttempt(attempt + 1);
    }

    form.reset();
  }

  function handleLetterInput(event: any) {
    const currentInput = document.querySelector(
      `input[name=wordleLetter_${attempt}_${currentGuess.length}]`
    ) as HTMLInputElement;
    const nextInput = document.querySelector(
      `input[name=wordleLetter_${attempt}_${currentGuess.length + 1}]`
    ) as HTMLInputElement;

    if (currentInput) {
      const value = event.target.textContent;
      currentInput.value = value;
      setCurrentGuess([...currentGuess, value]);
    }
    if (nextInput) {
      nextInput.focus();
    }
  }

  function handleLetterDelete() {
    const prevInput = document.querySelector(
      `input[name=wordleLetter_${attempt}_${currentGuess.length - 1}]`
    ) as HTMLInputElement;

    if (prevInput) {
      prevInput.value = "";
      prevInput.focus();
      setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));
    }
  }

  return (
    <div className="Wordle-game-board">
      <form className="Previous-Guess">
        {attempt > 1 ? (
          <PreviousWord lastGuess={lastGuess} word={word} />
        ) : null}
      </form>
      <form className="Wordle-form" onSubmit={handleFormSubmit}>
        <Word
          word={word}
          setCurrentGuess={setCurrentGuess}
          currentGuess={currentGuess}
          attemptNumber={attempt}
        />
        <div className="keyboard">
          <div className="keyboard-row">
            <div className="letter Q" onClick={handleLetterInput}>
              Q
            </div>
            <div className="letter W" onClick={handleLetterInput}>
              W
            </div>
            <div className="letter E" onClick={handleLetterInput}>
              E
            </div>
            <div className="letter R" onClick={handleLetterInput}>
              R
            </div>
            <div className="letter T" onClick={handleLetterInput}>
              T
            </div>
            <div className="letter Y" onClick={handleLetterInput}>
              Y
            </div>
            <div className="letter U" onClick={handleLetterInput}>
              U
            </div>
            <div className="letter I" onClick={handleLetterInput}>
              I
            </div>
            <div className="letter O" onClick={handleLetterInput}>
              O
            </div>
            <div className="letter P" onClick={handleLetterInput}>
              P
            </div>
          </div>
          <div className="keyboard-row">
            <div className="letter A" onClick={handleLetterInput}>
              A
            </div>
            <div className="letter S" onClick={handleLetterInput}>
              S
            </div>
            <div className="letter D" onClick={handleLetterInput}>
              D
            </div>
            <div className="letter F" onClick={handleLetterInput}>
              F
            </div>
            <div className="letter G" onClick={handleLetterInput}>
              G
            </div>
            <div className="letter H" onClick={handleLetterInput}>
              H
            </div>
            <div className="letter J" onClick={handleLetterInput}>
              J
            </div>
            <div className="letter K" onClick={handleLetterInput}>
              K
            </div>
            <div className="letter L" onClick={handleLetterInput}>
              L
            </div>
          </div>
          <div className="keyboard-row">
            <button className="letter wordle_submit" type="submit">
              ENTER
            </button>
            <div className="letter Z" onClick={handleLetterInput}>
              Z
            </div>
            <div className="letter X" onClick={handleLetterInput}>
              X
            </div>
            <div className="letter C" onClick={handleLetterInput}>
              C
            </div>
            <div className="letter V" onClick={handleLetterInput}>
              V
            </div>
            <div className="letter B" onClick={handleLetterInput}>
              B
            </div>
            <div className="letter N" onClick={handleLetterInput}>
              N
            </div>
            <div className="letter M" onClick={handleLetterInput}>
              M
            </div>
            <div className="letter back" onClick={handleLetterDelete}>
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 0H7C6.31 0 5.77 0.311111 5.41 0.782222L0 8L5.41 15.2089C5.77 15.68 6.31 16 7 16H22C23.1 16 24 15.2 24 14.2222V1.77778C24 0.8 23.1 0 22 0ZM22 14.2222H7.07L2.4 8L7.06 1.77778H22V14.2222ZM10.41 12.4444L14 9.25333L17.59 12.4444L19 11.1911L15.41 8L19 4.80889L17.59 3.55556L14 6.74667L10.41 3.55556L9 4.80889L12.59 8L9 11.1911L10.41 12.4444Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
