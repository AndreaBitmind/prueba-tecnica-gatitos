import { useEffect, useState } from "react";
import { getRandomFact } from "./services/facts";

export function App() {
  const [fact, setFact] = useState("lorem ipsum cat fact");
  const [imageUrl, setImageUrl] = useState();
  const [factError, setFactError] = useState();

  // recuperar la cita al cargar la pagina
  useEffect(() => {
    getRandomFact().then((newFact) => setFact(newFact));
  }, []);

  // recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ", 3).join(" ");

    fetch(
      `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        setImageUrl(`https://cataas.com${url}`);
      });
  }, [fact]);

  const handleClick = async () => {
    const newFact = await getRandomFact(setFact);
    setFact(newFact);
  };

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>App de gatitos</h1>

      <button onClick={handleClick}>Get new fact</button>

      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt="cat" />}
    </main>
  );
}
