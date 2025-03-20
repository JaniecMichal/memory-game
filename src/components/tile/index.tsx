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

  return (
    <div
      className={`tile ${isMatched ? "matched" : ""}`}
      onClick={() => !isRevealed && !isMatched && revealTile(id)}
    >
      {isRevealed || isMatched ? (
        <Icon size={40} />
      ) : (
        <div className="cover"></div>
      )}
    </div>
  );
};
