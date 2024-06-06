export type PokemonItem = {
    name: string;
    url: string;
    cardNumber: number;
    sprite: string;
    types: PokemonType[];
  };
  
  export type PokemonType = {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  };
  export type PokemonDetails = {
    types: PokemonType[];
  }

  