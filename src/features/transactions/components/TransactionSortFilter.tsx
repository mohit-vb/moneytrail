import { SelectEl } from "../../../ui";

type TransactionSortType = "newest" | "oldest" | "amount-high" | "amount-low";

type TransactionSortOption = {
  value: TransactionSortType;
  label: string;
};

const transactionSortOptions: TransactionSortOption[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "amount-high", label: "Highest Amount" },
  { value: "amount-low", label: "Lowest Amount" },
];

type TransactionSortFilterProps = {
  sortBy: TransactionSortType;
  onSort: (sort: TransactionSortType) => void;
};

export default function TransactionSortFilter({
  sortBy,
  onSort,
}: TransactionSortFilterProps) {
  return (
    <div className="relative">
      <SelectEl
        value={sortBy}
        className="rounded-full"
        onChange={(e) => onSort(e.target.value as TransactionSortType)}
      >
        {transactionSortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectEl>
    </div>
  );
}
