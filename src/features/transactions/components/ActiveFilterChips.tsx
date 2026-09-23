import { X } from "lucide-react";
import type { Transaction } from "../../../domain/types/transactions";

type ActiveFilterChipsProps = {
  transactionType: Transaction["type"] | "all";
  onRemove: () => void;
};

export default function ActiveFilterChips({
  transactionType,
  onRemove,
}: ActiveFilterChipsProps) {
  if (transactionType === "all") return null;
  return (
    <div className="bg-accent rounded-full inline-flex items-center gap-1 px-2 py-1 text-xs ">
      <span>{transactionType}</span>
      <X className="size-3 cursor-pointer" onClick={onRemove} />
    </div>
  );
}
