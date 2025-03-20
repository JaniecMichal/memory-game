import { useGameStore } from "../../store/gameStore";
import { Tile } from "../tile";
import "./board.scss";

export const Board = () => {
  const tiles = useGameStore((state) => state.tiles);
  const matchedPairs = useGameStore((state) => state.matchedPairs);
  const startGame = useGameStore((state) => state.startGame);
  const isGameActive = useGameStore((state) => state.isGameActive);
  const difficulty = useGameStore((state) => state.difficulty);

  if (!isGameActive) {
    return <NonActiveBoard />;
  }

  return (
    <div className="board-container">
      {matchedPairs * 2 === tiles.length && isGameActive ? (
        <div className="win-message">
          🎉 You won! <button onClick={startGame}>Play Again</button>
        </div>
      ) : (
        <div className={`board ${difficulty}`}>
          {tiles.map((tile) => (
            <Tile key={tile.id} {...tile} />
          ))}
        </div>
      )}
    </div>
  );
};

const NonActiveBoard = () => (
  <div className="board-placeholder">
    <div className="board hard">
      {Array.from({ length: 32 }).map((_, index) => (
        <div key={index} className="placeholder-tile"></div>
      ))}
    </div>
    <div className="overlay">
      <p className="overlay__text">
        Select difficulty and click{" "}
        <span className="highlighted-text">Start Game</span> to begin!
      </p>
    </div>
  </div>
);
