import { useMemo, useState } from "react";
import "./App.css";
import { fetchPokemon } from "./api";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "./components/skeletonCard";
import { ErrorAlert } from "./components/alert";
import PokemonCard from "./components/pokemonCard";
import NoData from "./components/noData";
import { PokemonItem } from "./types";

export default function App() {
  // utilising react query to show how i would normally make api calls, utilising server state as well as async fetching withouot the need of useEffect which presents a range of problems to performance
  const {
    data: pokemonData,
    error,
    isLoading,
    refetch,
  } = useQuery({ queryKey: ["pokemon"], queryFn: fetchPokemon });
  const [order, setOrder] = useState<"az" | "za" | "release">("release");

  // only rerenders when pokemonData(cache) changes or order state changes and depending on state is how it will be ordered
  const sortedPokemon = useMemo(() => {
    if (order === "az")
      return pokemonData?.sort((a, b) => a.name.localeCompare(b.name));
    else if (order === "za")
      return pokemonData?.sort((a, b) => b.name.localeCompare(a.name));
    else if (order === "release") refetch();

    return pokemonData;
  }, [pokemonData, order, refetch]);

  // sset the state value for order state
  const sortCards = (value: string) => {
    if (value === "az") {
      setOrder("az");
    } else if (value === "za") {
      setOrder("za");
    } else if ("release") {
      setOrder("release");
    }
  };
  return (
    <div className="App">
      <div className="header-container">
        <h1 className="text-4xl">Pokemon</h1>
        <select
          className="select-order"
          data-testid="pokemon-sort"
          onChange={(e) => sortCards(e.target.value)}
        >
          <option value="release">Release number</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
      {/* Added in some error handling code and loading state */}
      <div className="message-state-container">
        {error && <ErrorAlert message={error.message} />}
        {isLoading && <SkeletonCard />}
        {pokemonData?.length === 0 && <NoData />}
      </div>

      <div className="pokemon-grid">
        {sortedPokemon?.map((pokemon: PokemonItem, index: number) => (
          <PokemonCard pokemon={pokemon} index={index} key={pokemon.name} />
        ))}
      </div>
    </div>
  );
}
