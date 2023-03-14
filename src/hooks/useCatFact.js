import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts";

export const useCatFact = () => {
    const [fact, setFact] = useState("lorem ipsum cat fact");
  
    const refreshFact = () => {
      getRandomFact().then((newFact) => setFact(newFact));
    };
    // recuperar la cita al cargar la pagina
    useEffect(refreshFact, []);
  
    return { fact, refreshFact };
  };