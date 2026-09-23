import type { TransactionDateFilterValue } from "../../../domain/types/transactions";

type TransactionDateFilter = {
  dateFilter: TransactionDateFilterValue;
  onFilter: (value: TransactionDateFilterValue) => void;
};

export default function TransactionDateFilter({
  dateFilter,
  onFilter,
}: TransactionDateFilter) {
  return (
    <select
      className="w-min border border-accent/40 py-1 px-4 rounded-full flex items-center gap-2 cursor-pointer bg-ink"
      value={dateFilter}
      onChange={(e) => onFilter(e.target.value as TransactionDateFilterValue)}
    >
      <option disabled={true} value="Date">
        Date
      </option>
      <option value="this-month">This Month</option>
      <option value="last-month">Last Month</option>
      <option value="custom-range">Custom Range</option>
    </select>
  );
}
