import { useEffect, useState } from "react";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

export function App() {
  const [fact, setFact] = useState("lorem ipsum cat fact");
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);

        const firstWord = fact.split(" ", 3).join(" ");
        console.log(firstWord);

        fetch(
          `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
        )
          .then((res) => res.json())
          .then((response) => {
            const { url } = response;
            setImageUrl(`https://cataas.com${url}`);
          });
      });
  }, []);

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
