"use client";

import Image from "next/image";
import Chat from "./chat";

import { useContext } from "react";

import { PokemonContext } from "./PokemonContext";

import "./picture.css";

export default function Picture() {
  const contextData = useContext(PokemonContext);
  const poke = contextData.pokemonID.toString().padStart(3, "0");
  const randomBackgroundNumber = Math.floor(Math.random() * 23 + 1);
  return (
    <div className="outerBox">
      <div className="bannerBox">
        <div className="banner">
          <div className="title">Who is that Pokemon?</div>
        </div>
        <div className="banner1"></div>
      </div>

      <div className="main">
        <div className="poke-view">
          <div className="run">
            <button>
              <img
                width="20"
                height="20"
                src="/images/icons/runaway.svg"
                alt="running--v1"
              />{" "}
              Run Away
            </button>
          </div>
          <div className="background">
            <Image
              src={`/images/backgrounds/background_${randomBackgroundNumber}.jpg`}
              alt="Next.js Logo"
              width={600}
              height={808}
              priority
            />
          </div>
          <div className="pokemon-images">
            <Image
              className="hidden"
              src={`/images/pokemon/${poke}.png`}
              alt="Next.js Logo"
              width={300}
              height={300}
              priority
            />{" "}
            <div className="oval-shadow"></div>
          </div>
        </div>
        <div className="Talking">
          <Chat />
        </div>
      </div>
    </div>
  );
}
