import { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export function App() {
  const [fact, setFact] = useState("lorem ipsum cat fact");
  const [imageUrl, setImageUrl] = useState();

  // recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        return res.json;
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
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

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt="cat" />}
    </main>
  );
}
