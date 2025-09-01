import React from "react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  rangeLimit?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  currentPage,
  onPageChange,
  rangeLimit = 3,
}) => {
  // if (pages <= 1) return null;

  const getPageNumbers = () => {
    const pagesToShow: (number | string)[] = [];
    const leftLimit = Math.max(2, currentPage - rangeLimit);
    const rightLimit = Math.min(pages - 1, currentPage + rangeLimit);

    pagesToShow.push(1);

    if (leftLimit > 2) {
      pagesToShow.push("…");
    }

    for (let i = leftLimit; i <= rightLimit; i++) {
      pagesToShow.push(i);
    }

    if (rightLimit < pages - 1) {
      pagesToShow.push("…");
    }

    if (pages > 1) {
      pagesToShow.push(pages);
    }

    return pagesToShow;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-1 w-full">
      <p className="text-sm text-gray-500">
        Page {currentPage} sur {pages}
      </p>

      <div className="flex items-center gap-1 flex-wrap">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {pageNumbers.map((num, idx) =>
          num === "…" ? (
            <Button key={idx} variant="outline" size="icon" disabled>
              …
            </Button>
          ) : (
            <Button
              key={idx}
              variant="outline"
              size="icon"
              onClick={() => onPageChange(num as number)}
              className={
                currentPage === num
                  ? "bg-primary text-white hover:bg-primary"
                  : ""
              }
            >
              {num}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === pages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
