import { create } from "zustand";
import { TILE_COUNTS, ICON_SET } from "../helpers/game-settings";
import { GameRecord, GameState, Tile } from "@/types/types";

export const useGameStore = create<GameState>((set, get) => ({
  tiles: [],
  revealedTiles: [],
  matchedPairs: 0,
  attempts: 0,
  isGameActive: false,
  startTime: null,
  isChecking: false,
  difficulty: null,
  history: JSON.parse(localStorage.getItem("gameHistory") || "[]"),

  setDifficulty: (level) => {
    const { isGameActive, resetGame } = get();
    if (isGameActive) {
      resetGame();
    }
    set({ difficulty: level });
  },

  startGame: () => {
    const difficulty = get().difficulty;
    if (!difficulty) return;

    const numPairs = TILE_COUNTS[difficulty];
    const icons = ICON_SET.slice(0, numPairs);

    const tilePairs: Tile[] = [...icons, ...icons]
      .map((icon, index) => ({
        id: index,
        icon,
        isRevealed: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    set({
      tiles: tilePairs,
      revealedTiles: [],
      matchedPairs: 0,
      attempts: 0,
      isGameActive: true,
      startTime: Date.now(),
      isChecking: false,
    });
  },

  revealTile: (id) => {
    const {
      tiles,
      revealedTiles,
      matchedPairs,
      attempts,
      isChecking,
      difficulty,
    } = get();
    if (isChecking || revealedTiles.length >= 2) return;

    const updatedTiles = tiles.map((tile) =>
      tile.id === id ? { ...tile, isRevealed: true } : tile
    );

    const newRevealedTiles = [...revealedTiles, id];
    const revealTime = difficulty === "hard" ? 700 : 1000;

    if (newRevealedTiles.length === 2) {
      set({
        tiles: updatedTiles,
        revealedTiles: newRevealedTiles,
        isChecking: true,
      });

      setTimeout(() => {
        const [firstId, secondId] = newRevealedTiles;
        const firstTile = tiles.find((tile) => tile.id === firstId);
        const secondTile = tiles.find((tile) => tile.id === secondId);

        let newTiles = updatedTiles;
        let newMatchedPairs = matchedPairs;

        if (
          firstTile &&
          secondTile &&
          firstTile.icon &&
          secondTile.icon &&
          firstTile.icon === secondTile.icon
        ) {
          newTiles = updatedTiles.map((tile) =>
            tile.id === firstId || tile.id === secondId
              ? { ...tile, isMatched: true }
              : tile
          );
          newMatchedPairs++;
        } else {
          newTiles = updatedTiles.map((tile) =>
            tile.id === firstId || tile.id === secondId
              ? { ...tile, isRevealed: false }
              : tile
          );
        }

        set({
          tiles: newTiles,
          revealedTiles: [],
          matchedPairs: newMatchedPairs,
          attempts: attempts + 1,
          isChecking: false,
        });

        if (newMatchedPairs === tiles.length / 2) {
          get().saveGameResult();
        }
      }, revealTime);
    } else {
      set({ tiles: updatedTiles, revealedTiles: newRevealedTiles });
    }
  },

  resetGame: () => {
    set({
      tiles: [],
      revealedTiles: [],
      matchedPairs: 0,
      attempts: 0,
      isGameActive: false,
      startTime: null,
      isChecking: false,
    });
  },

  saveGameResult: () => {
    const { attempts, startTime, difficulty, history } = get();
    if (!startTime || !difficulty) return;

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const newRecord: GameRecord = {
      date: new Date().toLocaleString(),
      duration,
      attempts,
      difficulty,
    };

    const updatedHistory = [newRecord, ...history].slice(0, 10);
    localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));

    set({ history: updatedHistory, isGameActive: false });
  },
}));
