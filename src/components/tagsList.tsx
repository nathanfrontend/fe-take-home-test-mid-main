import { PokemonType } from "@/types";

export function TagsList({ tags }: { tags: PokemonType[] }) {
  return (
    <div className="flex ">
      {tags?.map((tag) => (
        <button
          className="tags-list"
          data-testid="pokemon-card-type"
          key={tag.slot}
        >
          {tag.type.name}
        </button>
      ))}
    </div>
  );
}
