import { useGameStore } from "../../store/gameStore";
import { IconType } from "react-icons";
import "./tile.scss";

type TileProps = {
  id: number;
  icon: IconType;
  isRevealed: boolean;
  isMatched: boolean;
};

export const Tile = ({ id, icon: Icon, isRevealed, isMatched }: TileProps) => {
  const revealTile = useGameStore((state) => state.revealTile);

  const flipped = isRevealed || isMatched;

  return (
    <div
      className={`tile-wrapper ${flipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={() => !flipped && revealTile(id)}
    >
      <div className="tile-inner">
        <div className="tile-front"></div>
        <div className="tile-back">
          <Icon size={40} />
        </div>
      </div>
    </div>
  );
};
