import { useGameStore } from "../../store/gameStore";

import "./difficulty-selector.scss";

export const DifficultySelector = () => {
  const difficulty = useGameStore((state) => state.difficulty);
  const setDifficulty = useGameStore((state) => state.setDifficulty);

  return (
    <div className="difficulty-selector">
      <p>🎯 Select Difficulty:</p>
      <div className="buttons">
        <button
          className={`difficulty-button ${
            difficulty === "easy" ? "active" : ""
          }`}
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </button>
        <button
          className={`difficulty-button ${
            difficulty === "medium" ? "active" : ""
          }`}
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </button>
        <button
          className={`difficulty-button ${
            difficulty === "hard" ? "active" : ""
          }`}
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </button>
      </div>
    </div>
  );
};
