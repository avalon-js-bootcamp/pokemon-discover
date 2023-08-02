import styles from "./page.module.css";
import "./components/page.css";
import Picture from "./components/picture";
import { PokemonProvider } from "./components/PokemonContext";

import "./nav.module.css";
import Navbar from "./nav";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}></div>

      <PokemonProvider>
        <Navbar />
        <Picture />
      </PokemonProvider>
    </main>
  );
}
