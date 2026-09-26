import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { InputEl, Button, SelectEl } from "../../../ui";
import {
  categoriesOptions,
  paymentOptions,
  accountOptions,
} from "../../../constants";
import { getTodayDate } from "../../../util";
import { useTransactions } from "../hooks/useTransactions";

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

type TransactionFormState = {
  type: "income" | "expense" | "transfer";
  amount: string;
  description: string;
  accountId: string;
  categoryId: string;
  paymentMethod: string;
  fromAccountId: string;
  toAccountId: string;
  date: string;
};

export default function AddTransaction({ onClose }: AddTransactionProps) {
  const { addTransaction } = useTransactions();
  const [form, setForm] = useState<TransactionFormState>({
    type: "expense",
    amount: "",
    description: "",
    accountId: "",
    categoryId: "",
    paymentMethod: "",
    fromAccountId: "",
    toAccountId: "",
    date: getTodayDate(),
  });

  const handleChange = function (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
  };

  const isTransfer = form.type === "transfer";

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-4 mt-6 text-surface"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between w-full rounded-xl border border-white/20 overflow-hidden">
          {transactionModes.map((mode) => (
            <button
              key={mode.id}
              className={`flex items-center justify-center gap-2 cursor-pointer w-full py-2 font-light ${form.type === mode.id ? "bg-accent text-surface font-bold" : "text-surface/60 "}`}
              onClick={() => setForm((prev) => ({ ...prev, type: mode.id }))}
              type="button"
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <label>Amount</label>
          <InputEl
            type="number"
            className="font-display"
            placeholder="300"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <InputEl
            placeholder="eg. Zomato order"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        {/* for income-expense */}
        {!isTransfer && (
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label>Category</label>
              <SelectEl
                className="rounded-md"
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categoriesOptions.map((category) => (
                  <option
                    key={category}
                    value={`cat_${category.toLowerCase().trim().split(" ")[0]}`}
                  >
                    {category}
                  </option>
                ))}
              </SelectEl>
            </div>

            <div className="flex flex-col gap-1">
              <label>Account</label>
              <SelectEl
                className="rounded-md"
                name="accountId"
                value={form.accountId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select account
                </option>
                {accountOptions.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.label}
                  </option>
                ))}
              </SelectEl>
            </div>

            <div className="flex flex-col gap-1">
              <label>Payment Method</label>
              <SelectEl
                className="rounded-md"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select payment method
                </option>
                {paymentOptions.map((method) => (
                  <option key={method} value={method.toLowerCase()}>
                    {method}
                  </option>
                ))}
              </SelectEl>
            </div>
          </div>
        )}

        {/* for transfer */}

        {isTransfer && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label>From</label>
              <SelectEl
                className="rounded-md"
                name="fromAccountId"
                value={form.fromAccountId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select account
                </option>
                {accountOptions.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.label}
                  </option>
                ))}
              </SelectEl>
            </div>
            <div className="flex flex-col gap-1">
              <label>To</label>
              <SelectEl
                className="rounded-md"
                name="toAccountId"
                value={form.toAccountId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select account
                </option>
                {accountOptions.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.label}
                  </option>
                ))}
              </SelectEl>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label>Date</label>
          <InputEl
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="[&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>
        <div className="flex justify-end gap-2 pt-6">
          <Button variant="tertiary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Transaction
          </Button>
        </div>
      </form>
    </div>
  );
}
