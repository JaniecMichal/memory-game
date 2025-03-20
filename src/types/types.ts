import { IconType } from "react-icons";
import { DifficultyLevel } from "@/helpers/game-settings";

export type Tile = {
  id: number;
  icon: IconType;
  isRevealed: boolean;
  isMatched: boolean;
  isFake?: boolean;
};

export type GameRecord = {
  date: string;
  duration: number;
  attempts: number;
  difficulty: DifficultyLevel;
};

export type GameState = {
  tiles: Tile[];
  revealedTiles: number[];
  matchedPairs: number;
  attempts: number;
  isGameActive: boolean;
  startTime: number | null;
  isChecking: boolean;
  difficulty: DifficultyLevel | null;
  history: GameRecord[];
  setDifficulty: (level: DifficultyLevel) => void;
  startGame: () => void;
  revealTile: (id: number) => void;
  resetGame: () => void;
  saveGameResult: () => void;
};
