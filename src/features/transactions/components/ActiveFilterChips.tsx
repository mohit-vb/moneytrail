import { X } from "lucide-react";
import type {
  Transaction,
  TransactionDateFilterValue,
} from "../../../domain/types/transactions";
import { seedCategories } from "../../../data/seeds";
import { Button } from "../../../ui";

const sortLabelMap: Record<TransactionSortType, string> = {
  newest: "Newest",
  oldest: "Oldest",
  "amount-high": "Amount: High → Low",
  "amount-low": "Amount: Low → High",
};

type TransactionSortType = "newest" | "oldest" | "amount-high" | "amount-low";

type ActiveFilterChipsProps = {
  transactionType: Transaction["type"] | "all";
  categoryId: string | null;
  dateFilter: TransactionDateFilterValue;
  sortBy: TransactionSortType;
  onRemoveTransactionType: () => void;
  onRemoveCategory: () => void;
  onRemoveDateFilter: () => void;
  onClearAllFilters: () => void;
  onRemoveSort: () => void;
  appliedStartDate: string;
  appliedEndDate: string;
};

export default function ActiveFilterChips({
  transactionType,
  categoryId,
  dateFilter,
  sortBy,
  onRemoveTransactionType,
  onRemoveCategory,
  onRemoveDateFilter,
  onClearAllFilters,
  onRemoveSort,
  appliedStartDate,
  appliedEndDate,
}: ActiveFilterChipsProps) {
  const category = seedCategories.find(
    (category) => category.id === categoryId,
  );

  let dateFilterLabel = "";

  const hasActiveDateFilter =
    dateFilter === "this-month" ||
    dateFilter === "last-month" ||
    (dateFilter === "custom-range" &&
      appliedStartDate !== "" &&
      appliedEndDate !== "");

  if (dateFilter === "this-month") {
    dateFilterLabel = "September 2026";
  }

  if (dateFilter === "last-month") {
    dateFilterLabel = "August 2026";
  }

  if (dateFilter === "custom-range" && appliedStartDate && appliedEndDate) {
    dateFilterLabel = `${appliedStartDate} - ${appliedEndDate}`;
  }

  if (
    transactionType === "all" &&
    !category &&
    dateFilter === "Date" &&
    sortBy === "newest"
  )
    return null;

  return (
    <>
      {transactionType !== "all" && (
        <div className="bg-accent rounded-full inline-flex items-center gap-1 px-2 py-1 text-xs ">
          <span>{transactionType}</span>
          <X
            className="size-3 cursor-pointer"
            onClick={onRemoveTransactionType}
          />
        </div>
      )}

      {category && (
        <div className="bg-accent rounded-full inline-flex items-center gap-1 px-2 py-1 text-xs ">
          <span>{category.name}</span>
          <X className="size-3 cursor-pointer" onClick={onRemoveCategory} />
        </div>
      )}

      {dateFilter !== "Date" && dateFilterLabel && (
        <div className="bg-accent rounded-full inline-flex items-center gap-1 px-2 py-1 text-xs ">
          <span>{dateFilterLabel}</span>
          <X className="size-3 cursor-pointer" onClick={onRemoveDateFilter} />
        </div>
      )}

      {sortBy !== "newest" && (
        <div className="bg-accent rounded-full inline-flex items-center gap-1 px-2 py-1 text-xs ">
          <span>{sortLabelMap[sortBy]}</span>
          <X className="size-3 cursor-pointer" onClick={onRemoveSort} />
        </div>
      )}

      {(transactionType !== "all" ||
        category ||
        hasActiveDateFilter ||
        sortBy !== "newest") && (
        <Button variant="ghost" onClick={onClearAllFilters}>
          Clear Filters
        </Button>
      )}
    </>
  );
}
