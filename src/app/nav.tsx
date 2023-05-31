import styles from './nav.module.css'
import React from 'react'
import { useState} from 'react'

function Navbar() {
    const navItems = ["Pokemon Lab", "Battle", "Poke Mart", "My Pokedex"]
return (
    <>
    <div className={styles.navContainer}>
        <div className={styles.icons}>
    <img src="/images/hamburger.png" className={styles.hamburgerIcon}></img>
    <img src="/images/logo.png" className={styles.logoIcon}></img>
    <img src="/images/account.png" className={styles.accountIcon}></img>
    </div>
    <div className={styles.navRight}>
    <div className={styles.navRedBar}>HELLO</div>
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
    </>
)
}



export default Navbar;
