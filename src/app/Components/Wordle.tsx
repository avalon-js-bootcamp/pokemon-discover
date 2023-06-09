"use client";
import "./Wordle.css";
import React, { useState, useEffect, useMemo } from "react";

interface LetterProps {
  attemptNumber: number;
  letterIndex: number;
  onType: (number) => void;
}

function Letter(props: LetterProps) {
  const handleOnInput = () => {
    props.onType(props.letterIndex);
  };

  return (
    <input
      type="text"
      onInput={handleOnInput}
      className="wordle-text"
      name={`wordleLetter_${props.attemptNumber}_${props.letterIndex}`}
      maxLength={1}
      required
    />
  );
}

interface WordProps {
  word: string;
  attemptNumber: number;
}

function Word(props: WordProps) {
  const { word } = props;

  const handleOnType = (number: number) => {
    const nextInput = document.querySelector(
      `input[name=wordleLetter_${props.attemptNumber}_${number + 1}]`
    ) as HTMLInputElement;

    if (nextInput) {
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
  return (
    <div className="last-guess">
      {lastGuess.map((letter, index) => {
        if (letter === splitWord[index]) {
          return (
            <div key={index} className="correct">
              {letter.toUpperCase()}
            </div>
          );
        } else if (splitWord.includes(letter)) {
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

export default function WordleGame() {
  const [word, setWord] = useState("");
  const [attempt, setAttempt] = useState(1);
  const [lastGuess, setLastGuess] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://pokemon-explore.pages.dev/data/pokemon.json")
      .then((response) => response.json())
      .then((json) => {
        const randomNumber = Math.floor(Math.random() * 151);
        const pokemon = json[`${randomNumber}`].name;
        console.log(pokemon);
        setWord(pokemon);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    let userGuess = [];

    let correctLetters = 0;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];

      const inputName = `wordleLetter_${attempt}_${i}`;

      let letterInput: HTMLInputElement | null = form.elements.namedItem(
        inputName
      ) as HTMLInputElement;

      if (letterInput) {
        const value = letterInput.value;

        if (value.toLowerCase() === letter) {
          correctLetters++;
          userGuess.push(value);
        } else {
          userGuess.push(value);
        }
      }

      setLastGuess(userGuess);
    }

    if (correctLetters === word.length) {
      alert("You won");
    } else if (attempt === MAX_ATTEMPTS) {
      alert(`${word} Ran Away`);
    } else {
      setAttempt(attempt + 1);
    }
    form.reset();
  }

  return (
    <div className="Wordle-game-board">
      <form className="Previous-Guess">
        {attempt > 1 ? (
          <PreviousWord lastGuess={lastGuess} word={word} />
        ) : null}
      </form>
      <form className="Wordle-form" onSubmit={handleFormSubmit}>
        <Word word={word} attemptNumber={attempt} />
        <button className="wordle_submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
