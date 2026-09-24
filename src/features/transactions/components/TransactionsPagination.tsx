import { MoveLeft, MoveRight } from "lucide-react";
import { Button } from "../../../ui";

type TransactionsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageChange: (page: number) => void;
};

export default function TransactionsPagination({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  onPageChange,
}: TransactionsPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <Button
        variant="tertiary"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className={currentPage === 1 ? "opacity-40 pointer-events-none" : ""}
      >
        <MoveLeft />
        <span>Previous</span>
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Button
              key={page}
              variant={currentPage === page ? "tertiaryActive" : "tertiary"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ),
        )}
      </div>

      <Button
        variant="tertiary"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages ? "opacity-40 pointer-events-none" : ""
        }
      >
        <span>Next</span>
        <MoveRight />
      </Button>
    </div>
  );
}
