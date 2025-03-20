import { useGameStore } from "../../store/gameStore";
import "./gameHistory.scss";
import { HistoryItem } from "./history-item";

export const GameHistory = () => {
  const history = useGameStore((state) => state.history);

  return (
    <div className="game-history">
      <h2 className="game-history__heading">🏆 Game History</h2>
      {history.length === 0 ? (
        <p>No completed games yet.</p>
      ) : (
        <ul className="game-history__list">
          {history.map((game, index) => (
            <HistoryItem
              key={index}
              date={game.date}
              duration={game.duration}
              attempts={game.attempts}
              difficulty={game.difficulty}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
