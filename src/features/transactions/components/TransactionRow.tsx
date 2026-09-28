import { SquarePen, Trash } from "lucide-react";
import type { Transaction } from "../../../domain/types/transactions";
import {
  getAccountName,
  getCategoryName,
  formatCurrency,
} from "../transactionsUtils";
import { useTransactions } from "../hooks/useTransactions";

const typeColorMap: Partial<Record<Transaction["type"], string>> = {
  income: "text-income font-semibold",
  expense: "text-expense font-semibold",
};

type TransactionRowProps = {
  transaction: Transaction;
};

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const { deleteTransaction } = useTransactions();
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>
        {transaction.type === "transfer"
          ? "Transfer"
          : getCategoryName(transaction.categoryId)}
      </td>
      <td>{getAccountName(transaction.accountId)}</td>
      <td>
        {transaction.type === "transfer"
          ? "Bank transfer"
          : transaction.paymentMethod}
      </td>
      <td
        className={
          transaction.type === "transfer"
            ? "text-transfer"
            : typeColorMap[transaction.type] || "text-surfce/80"
        }
      >
        {transaction.type === "income"
          ? "+"
          : transaction.type === "expense"
            ? "-"
            : ""}{" "}
        {formatCurrency(transaction.amountMinor)}
      </td>
      <td className="flex gap-2">
        <button>
          <SquarePen className="size-4 cursor-pointer text-gray-300 hover:text-gray-50" />
        </button>
        <button onClick={() => deleteTransaction(transaction.id)}>
          <Trash className="size-4 cursor-pointer text-danger hover:text-red-300" />
        </button>
      </td>
    </tr>
  );
}
