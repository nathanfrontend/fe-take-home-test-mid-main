import { PokemonItem } from "../types";
import { formatIndex } from "../lib/utils";
import { TagsList } from "./tagsList";

type TPokemonCardProps = {
  pokemon: PokemonItem;
  index: number;
};
const PokemonCard: React.FunctionComponent<TPokemonCardProps> = ({
  pokemon,
  index,
}) => {
  return (
    <div className="pokemon-card" data-testid="pokemon-card">
      <img
        className="pokemon-card-sprite"
        loading="lazy"
        alt={pokemon.name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`}
      />
      <div className="pokemon-card-text-container">
        <span className="pokemon-card-name" data-testid="pokemon-card-name">
          {pokemon.name}
        </span>
        <span className="pokemon-card-number" data-testid="pokemon-card-number">
          {formatIndex(index)}
        </span>
        <span>
          <TagsList tags={pokemon.types} />
        </span>
      </div>
    </div>
  );
};

export default PokemonCard;
