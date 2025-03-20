import React from "react";

import "./gameHistory.scss";

type HistoryGamePaginationProps = {
  currentPage: number;
  maxPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const HistoryGamePagination = ({
  currentPage,
  setCurrentPage,
  maxPages,
}: HistoryGamePaginationProps) => {
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <span>
        Page {currentPage + 1} of {maxPages}
      </span>
      <button
        className="pagination__button"
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, maxPages - 1))
        }
        disabled={currentPage === maxPages - 1}
      >
        Next
      </button>
    </div>
  );
};
