import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { InputEl, Button, SelectEl } from "../../../ui";

const transactionModes = [
  {
    id: "income",
    label: "Income",
    icon: <ArrowDownLeft />,
  },
  {
    id: "expense",
    label: "Expense",
    icon: <ArrowUpRight />,
  },
  {
    id: "transfer",
    label: "Transfer",
    icon: <ArrowLeftRight />,
  },
] as const;

type AddTransactionProps = {
  onClose: () => void;
};

export default function AddTransaction({ onClose }: AddTransactionProps) {
  const [selectedMode, setSelectedMode] = useState<
    "income" | "expense" | "transfer"
  >("expense");

  const isTransfer = selectedMode === "transfer";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full rounded-xl border border-white/20 overflow-hidden">
        {transactionModes.map((mode) => (
          <button
            key={mode.id}
            className={`flex items-center justify-center gap-2 cursor-pointer w-full py-2 font-light ${selectedMode === mode.id ? "bg-accent text-surface font-bold" : "text-surface/60 "}`}
            onClick={() => setSelectedMode(mode.id)}
          >
            {mode.icon}
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      <form className="flex flex-col gap-3 mt-6 text-surface">
        <div className="flex flex-col gap-1">
          <label>Amount</label>
          <InputEl type="number" className="font-display" placeholder="300" />
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <InputEl placeholder="eg. Zomato order" />
        </div>
        {/* for income-expense */}
        {!isTransfer && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label>Category</label>
              <SelectEl className="rounded-md">
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="shopping">Shopping</option>
              </SelectEl>
            </div>
            <div className="flex flex-col gap-1">
              <label>Account</label>
              <SelectEl className="rounded-md">
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
              </SelectEl>
            </div>
          </div>
        )}

        {/* for transfer */}

        {isTransfer && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label>From</label>
              <SelectEl className="rounded-md">
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
              </SelectEl>
            </div>
            <div className="flex flex-col gap-1">
              <label>To</label>
              <SelectEl className="rounded-md">
                <option value="cash">Cash</option>
                <option value="bank">Bank</option>
              </SelectEl>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label>Date</label>
          <InputEl
            type="date"
            className="[&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>
        <div className="flex justify-end gap-2 pt-6">
          <Button variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary">Save Transaction</Button>
        </div>
      </form>
    </div>
  );
}
