"use client";

import styles from "./nav.module.css";
import React from "react";
import { useState } from "react";

function Navbar() {
  const navItems = ["Pokemon Lab", "Battle", "Poke Mart", "My Pokedex"];
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <>
      <div className={styles.navStretch}>
        <div className={isNavExpanded ? styles.greyScreen : "none"}></div>
        <div className={styles.navMobileContainer}>
          <div
            className={
              isNavExpanded ? styles.navExpanded : styles.navNotExpanded
            }
          >
            <div className={styles.navItemsContainer}>
              <div className={styles.closeIconContainer}>
                <button
                  className={styles.navButtons}
                  onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                  }}
                >
                  <img src="/images/close.svg" className={styles.closeIcon} />
                </button>
              </div>

              <div className={styles.navItems}>
                {navItems.map((item) => (
                  <div key={item} className={styles.navItem}>
                    {item}
                    <svg
                      className={styles.arrow}
                      viewBox="0 0 39 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28.1171 0.117249L26.288 1.94639L34.0482 9.70666H0.318848V9.70674V12.2935V12.2936H34.048L26.288 20.0536L28.1171 21.8827L39 11L28.1171 0.117249Z"
                        fill="#BBBBBB"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <button className={styles.trainerButton}>Become a Trainer</button>
          </div>
        </div>

        <div className={styles.navContainer}>
          <div className={styles.icons}>
            <button
              className={styles.navButtons}
              onClick={() => {
                setIsNavExpanded(!isNavExpanded);
              }}
            >
              <img
                src="/images/hamburger.svg"
                className={styles.hamburgerIcon}
              />
            </button>

            <img src="/images/logo.svg" className={styles.logoIcon}></img>
            <img src="/images/account.png" className={styles.accountIcon}></img>
          </div>
          <div className={styles.navRight}>
            <div className={styles.navRedBar}>
              <div className={styles.header}>
                <div className={styles.stats}>
                  <div className={styles.pokecoinContainer}>
                    <img
                      src="/images/pokecoin.png"
                      className={styles.pokecoin}
                    ></img>{" "}
                    Pokecoin
                  </div>
                  <div className={styles.pokeballContainer}>
                    <img
                      src="/images/pokeball.png"
                      className={styles.pokeball}
                    ></img>{" "}
                    Pokeball
                  </div>
                </div>
              </div>
              <div className={styles.weather}>
                <img
                  src="/images/umbrella.png"
                  className={styles.umbrellaIcon}
                ></img>
              </div>
            </div>
            <div className={styles.navBar}>
              <div className={styles.navItemsContainer}>
                <div className={styles.navItems}>
                  {navItems.map((item) => (
                    <div key={item} className={styles.navItem}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <button className={styles.trainerButton}>Become a Trainer</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
