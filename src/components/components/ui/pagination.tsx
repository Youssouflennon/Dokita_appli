import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  pages: number; // total pages
  currentPage: number;
  onPageChange: (page: number) => void;
  rangeLimit?: number; // combien de pages visibles autour
}

export function PaginationComponent({
  pages,
  currentPage,
  onPageChange,
  rangeLimit = 3,
}: PaginationProps) {
  const pageNumbers = getVisiblePages(currentPage, pages, rangeLimit);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Previous button */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page numbers */}
      {pageNumbers.map((page, i) =>
        page === "..." ? (
          <Button key={i} variant="ghost" size="icon" disabled>
            …
          </Button>
        ) : (
          <Button
            key={i}
            variant={page === currentPage ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        )
      )}

      {/* Next button */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === pages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

function getVisiblePages(current: number, total: number, limit: number): (number | "...")[] {
  const pages: (number | "...")[] = [];

  const start = Math.max(1, current - limit);
  const end = Math.min(total, current + limit);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total) {
    if (end < total - 1) pages.push("...");
    pages.push(total);
  }

  return pages;
}
