import type { Transaction } from "../../../domain/types/transactions";
import {
  getAccountName,
  getCategoryName,
  formatCurrency,
} from "../transactionsUtils";

const typeColorMap: Partial<Record<Transaction["type"], string>> = {
  income: "text-income font-semibold",
  expense: "text-expense font-semibold",
};

type TransactionRowProps = {
  transaction: Transaction;
};

export default function TransactionRow({ transaction }: TransactionRowProps) {
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
    </tr>
  );
}
