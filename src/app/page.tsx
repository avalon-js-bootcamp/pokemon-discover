import Image from "next/image";
import "./styles/page.css"


export default function Home() {
  const randomPokemonNumber =Math.floor(Math.random() * 151)
  const poke = randomPokemonNumber.toString().padStart(3,"0")
 const randomBackgroundNumber=Math.floor(Math.random() * 23)

  return (
  

    <div className="main"><div className="banner">  <div className="tittle">Who is that Pokemon?</div></div>
    
        <div className="background">
          <div className="run"> 
          <button><img  width="20" height="20" src="https://img.icons8.com/ios/50/running--v1.png" alt="running--v1"/>  Run Away</button>
 </div>
            
        <Image
            src={`/images/backgrounds/background_${randomBackgroundNumber}.jpg`}
          alt="Next.js Logo"
          width={600}
          height={797}
          priority
        />
                <div className="pokemon-images hidden"><Image
          src={`/images/pokemon/${poke}.png`}
          alt="Next.js Logo"
          width={300}
          height={300}
          priority
        />   <div className="oval-shadow"></div></div>
     <div className="wordle"><div className="conversation">box here
     </div>
     <div className="blanks">fill in blank here</div>
     <div className="keyboards">keyboards here</div>

</div>

      </div>

    </div>
  );
}
