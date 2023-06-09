"use client";
import React, { useEffect } from "react";
import "./Keyboard.css";

export default function Keyboard() {
  useEffect(() => {
    const textBox = document.querySelector(".wordle-text");
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (textBox) {
          textBox.value += btn.innerText;
        }
      });
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("click", () => {
          if (textBox) {
            textBox.value += btn.innerText;
          }
        });
      });
    };
  }, []);

  return (
    <div className="keyboard">
      <div className="row"></div>
      <div className="row">
        <button className="btn">Q</button>
        <button className="btn">W</button>
        <button className="btn">E</button>
        <button className="btn">R</button>
        <button className="btn">T</button>
        <button className="btn">Y</button>
        <button className="btn">U</button>
        <button className="btn">I</button>
        <button className="btn">O</button>
        <button className="btn">P</button>
      </div>
      <div className="row">
        <button className="btn">A</button>
        <button className="btn">S</button>
        <button className="btn">D</button>
        <button className="btn">F</button>
        <button className="btn">G</button>
        <button className="btn">H</button>
        <button className="btn">J</button>
        <button className="btn">K</button>
        <button className="btn">L</button>
      </div>
      <div className="row">
        <button className="btn enter">Enter</button>
        <button className="btn">Z</button>
        <button className="btn">X</button>
        <button className="btn">C</button>
        <button className="btn">V</button>
        <button className="btn">B</button>
        <button className="btn">N</button>
        <button className="btn">M</button>
        <button className="btn delete">Delete</button>
      </div>
    </div>
  );
}
