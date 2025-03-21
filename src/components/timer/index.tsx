import { useEffect, useMemo, useState } from "react";

import { useGameStore } from "../../store/gameStore";
import { formatTime } from "../../helpers/utils";

import "./timer.scss";

export const Timer = () => {
  const startTime = useGameStore((state) => state.startTime);
  const isGameActive = useGameStore((state) => state.isGameActive);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: number | null = null;

    if (isGameActive && startTime) {
      interval = window.setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      setElapsedTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, startTime]);

  const elapsedTimeFormatted = useMemo(
    () => formatTime(elapsedTime),
    [elapsedTime]
  );

  return <div className="timer">⏳ Time: {elapsedTimeFormatted}</div>;
};
