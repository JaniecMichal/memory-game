import { useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { HistoryItem } from "./history-item";

import "./gameHistory.scss";
import { HistoryGamePagination } from "./history-pagination";

const ITEMS_PER_PAGE = 5;

export const GameHistory = () => {
  const history = useGameStore((state) => state.history);
  const [currentPage, setCurrentPage] = useState(0);

  const maxPages = Math.ceil(history.length / ITEMS_PER_PAGE);

  const currentHistory = history.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="game-history">
      <h2 className="game-history__heading">🏆 Game History</h2>
      {history.length === 0 ? (
        <p>No completed games yet.</p>
      ) : (
        <>
          <ul className="game-history__list">
            {currentHistory.map((game, index) => (
              <HistoryItem
                key={index}
                date={game.date}
                duration={game.duration}
                attempts={game.attempts}
                difficulty={game.difficulty}
              />
            ))}
          </ul>

          {history.length > ITEMS_PER_PAGE && (
            <HistoryGamePagination
              currentPage={currentPage}
              maxPages={maxPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};
