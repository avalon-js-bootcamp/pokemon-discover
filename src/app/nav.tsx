import styles from './nav.module.css'
import React from 'react'
import { useState} from 'react'

function Navbar() {
    const navItems = ["Pokemon Lab", "Battle", "Poke Mart", "My Pokedex"]
return (
    <>
    <div className={styles.navcontainer}>
    <img src="/public/logo.jpg"></img>
    <div className={styles.navright}>
    <div className={styles.navredbar}>HELLO</div>
    <div className={styles.navbar}>
        <div className={styles.navitemscontainer}>
            <div className={styles.navitems}>
          {navItems.map((item) => (
            <div key={item} className={styles.navitem}>
              {item}
            </div>
          ))}
          </div>
          </div>
              <button className={styles.trainerbutton}>Become a Trainer</button>
        </div>
        </div>
        </div>
    </>
)
}



export default Navbar;
