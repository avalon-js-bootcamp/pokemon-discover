import Image from "next/image";
import styles from "./page.module.css";

import WordleGame from "./Components/Wordle";

import "./nav.module.css";
import Navbar from "./nav";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}></div>

      <Navbar />

      <div className={styles.center}>
        <Image
          src="/images/pokemon/001.png"
          alt="Next.js Logo"
          width={300}
          height={300}
          priority
        />
      </div>
      <div>
        <WordleGame></WordleGame>
      </div>
    </main>
  );
}
