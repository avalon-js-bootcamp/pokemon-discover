import styles from './nav.module.css'
import React from 'react'
import { useState} from 'react'

function Navbar() {
    const navItems = ["Pokemon Lab", "Battle", "Poke Mart", "My Pokedex"]
return (
    <>
    <div className={styles.navcontainer}>
    <img src="./logo.png"></img>
    <div>
    <div className={styles.navredbar}>HELLO</div>
    <div className={styles.navbar}>
          {navItems.map((item) => (
            <div key={item} className={styles.navitems}>
              {item}
            </div>
          ))}
              <button className={styles.trainerbutton}>Become a Trainer</button>
        </div>
        </div>
        </div>
    </>
)
}

export default Navbar;
