import {
  Board,
  Button,
  DifficultySelector,
  GameHistory,
  Timer,
} from "./components";
import { useGameStore } from "./store/gameStore";

import "./styles/global.scss";

const App = () => {
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);
  const attempts = useGameStore((state) => state.attempts);
  const isGameActive = useGameStore((state) => state.isGameActive);
  const difficulty = useGameStore((state) => state.difficulty);

  return (
    <div className="app">
      <div className="app_game-container">
        <h1 className="app__title">Memory Game</h1>

        <DifficultySelector />

        <div className="app__game-actions">
          <Button
            onClick={startGame}
            disabled={!difficulty && !isGameActive}
            variant="primary"
          >
            Start Game
          </Button>
          <Button
            onClick={resetGame}
            disabled={!isGameActive}
            variant="secondary"
          >
            Reset Game
          </Button>
        </div>

        {isGameActive && <Timer />}
        <p>🔢 Attempts: {attempts}</p>
        <Board />
      </div>

      <GameHistory />
    </div>
  );
};

export default App;
