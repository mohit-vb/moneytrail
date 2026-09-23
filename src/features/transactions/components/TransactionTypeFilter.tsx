import { Plus, X } from "lucide-react";
import type { Transaction } from "../../../domain/types/transactions";

type TransactionFilterType = Transaction["type"] | "all";

type TransactionTypeOptions = {
  label: string;
  value: TransactionFilterType;
};

const transactionTypeOptions: TransactionTypeOptions[] = [
  { label: "All", value: "all" },
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
  { label: "Transfer", value: "transfer" },
];

type TransactionTypeFilterProps = {
  onFilter: (type: TransactionFilterType) => void;
};

export default function TransactionTypeFilter({
  onFilter,
}: TransactionTypeFilterProps) {
  return (
    <div className="flex items-center gap-2 mt-4">
      {transactionTypeOptions.map((option) => (
        <button
          key={option.value}
          className="border border-accent/40 py-1 px-4 rounded-full flex items-center gap-2 cursor-pointer"
          onClick={() => onFilter(option.value)}
        >
          {option.label}
          <Plus className="size-3 opacity-70" />
        </button>
      ))}
    </div>
  );
}
