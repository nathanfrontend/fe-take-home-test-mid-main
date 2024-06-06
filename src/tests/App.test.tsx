import { fireEvent, render, screen } from "@testing-library/react";
import App from ".././App";
import * as ReactQuery from "@tanstack/react-query";
import PokemonCard from "../components/pokemonCard";
import { PokemonItem } from "@/types";
import { TagsList } from "../components/tagsList";
//mutable
const dummyPokemonData = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    types: [
      {
        slot: 1,
        type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      },
    ],
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
    types: [
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/",
        },
      },
      {
        slot: 2,
        type: {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/",
        },
      },
    ],
  },
  {
    name: "Venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
    types: [
      {
        slot: 1,
        type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      },
    ],
  },
  {
    name: "Abra",
    url: "https://pokeapi.co/api/v2/pokemon/63/",
    types: [
      {
        slot: 1,
        type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      },
    ],
  },
];

jest.mock("@tanstack/react-query", () => {
  const original: typeof ReactQuery = jest.requireActual(
    "@tanstack/react-query"
  );

  return {
    ...original,
    useQuery: () => ({
      isLoading: false,
      error: {},
      data: dummyPokemonData,
      refetch: jest.fn(),
    }),
  };
});

describe("Pokemon App", () => {
  it("renders 'Pokemon' as a title", () => {
    render(<App />);
    const titleElement = screen.getByText("Pokemon");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders a list of Pokemon cards", async () => {
    render(<App />);
    const pokemonCards = await screen.findAllByTestId("pokemon-card");
    expect(pokemonCards).toHaveLength(dummyPokemonData.length);
  });

  it("renders the list of Pokemon cards in the order of the cards' release numbers by default", async () => {
    render(<App />);
    const pokemonCards = await screen.findAllByTestId("pokemon-card-name");
    pokemonCards.forEach((card, index) => {
      expect(card.textContent).toBe(dummyPokemonData[index].name);
    });
  });
  it("renders the list of Pokemon cards in the order of AZ", async () => {
    render(<App />);

    const select = screen.getByTestId("pokemon-sort");
    fireEvent.change(select, { target: { value: "az" } });
    const pokemonCards = await screen.findAllByTestId("pokemon-card-name");

    pokemonCards.forEach((card, index) => {
      expect(card.textContent).toBe(dummyPokemonData[index].name);
    });
  });
  it("renders the list of Pokemon cards in the order of ZA", async () => {
    render(<App />);

    const select = screen.getByTestId("pokemon-sort");
    fireEvent.change(select, { target: { value: "za" } });
    const pokemonCards = await screen.findAllByTestId("pokemon-card-name");

    pokemonCards.forEach((card, index) => {
      expect(card.textContent).toBe(dummyPokemonData[index].name);
    });
  });

  it("renders pokemon cards with leading 0's", async () => {
    render(
      <PokemonCard pokemon={dummyPokemonData[0] as PokemonItem} index={5} />
    );
    // Check if the rendered output is correctly padded
    const displayElement = screen.getByTestId("pokemon-card-number");
    expect(displayElement.textContent).toBe("005");
  });

  it("renders pokemon cards with types", async () => {
    render(<TagsList tags={dummyPokemonData[1].types} />);
    // Check if the rendered output is correctly padded
    const displayElement = screen.getAllByTestId("pokemon-card-type");
    dummyPokemonData[1].types.forEach((item, index) => {
      expect(displayElement[index]).toHaveTextContent(item.type.name);
    });
  });
});
