import { useMemo } from "react";
import { formatTime } from "../../helpers/utils";

type HistoryItem = {
  date: string;
  duration: number;
  attempts: number;
  difficulty: string;
};

export const HistoryItem = ({
  date,
  duration,
  attempts,
  difficulty,
}: HistoryItem) => {
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);
  return (
    <li className="game-history__list-item">
      <span className="game-history__details">📅 {date}</span>
      <span className="game-history__details">⏳ {formattedDuration}</span>
      <span className="game-history__details">🎯 {attempts} attempts</span>
      <span className="game-history__details">
        🏆 {difficulty.toUpperCase()}
      </span>
    </li>
  );
};
