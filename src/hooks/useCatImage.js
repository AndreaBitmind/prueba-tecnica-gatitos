import { useEffect, useState } from "react";

export function useCatImage({ fact }) {
    const [imageUrl, setImageUrl] = useState();
  
    // recuperar la imagen cada vez que tenemos una cita nueva
    useEffect(() => {
      if (!fact) return;
      const threeFirstWords = fact.split(" ", 3).join(" ");
  
      fetch(
        `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
      )
        .then((res) => res.json())
        .then((response) => {
          const { url } = response;
          setImageUrl(`https://cataas.com${url}`);
        });
    }, [fact]);
  
    return { imageUrl };
}