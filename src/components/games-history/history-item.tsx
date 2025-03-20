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
  return (
    <li className="game-history__list-item">
      <span className="game-history__details">📅 {date}</span>
      <span className="game-history__details">⏳ {duration}s</span>
      <span className="game-history__details">🎯 {attempts} attempts</span>
      <span className="game-history__details">
        🏆 {difficulty.toUpperCase()}
      </span>
    </li>
  );
};
