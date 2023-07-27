"use client";

import { createContext, useState, useEffect, PropsWithChildren } from "react";

type PokemonContext = {
  pokemonID: number;
  word: string;
};

export const PokemonContext = createContext<PokemonContext>(
  {} as PokemonContext
);

export const PokemonProvider = ({ children }: PropsWithChildren) => {
  const [word, setWord] = useState("");
  const [pokemonID, setPokemonID] = useState(0);

  useEffect(() => {
    fetch("https://pokemon-explore.pages.dev/data/pokemon.json")
      .then((response) => response.json())
      .then((json) => {
        const randomNumber = Math.floor(Math.random() * 151);
        setWord(json[`${randomNumber}`].name);
        setPokemonID(json[`${randomNumber}`].id);
      })
      .catch((error) => console.error(error));
  }, []);

  // Render the context provider only when the data is available
  return (
    <PokemonContext.Provider value={{ word, pokemonID }}>
      {word && pokemonID ? children : null}
    </PokemonContext.Provider>
  );
};
