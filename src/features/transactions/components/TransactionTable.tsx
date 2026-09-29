import type { Transaction } from "../../../domain/types/transactions";
import TransactionRow from "./TransactionRow";

type TransactionTableProps = {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
};

export default function TransactionTable({
  transactions,
  onEdit,
}: TransactionTableProps) {
  return (
    <div className="rounded-md overflow-x-auto border border-white/10">
      <table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Account</th>
            <th scope="col">Payment method</th>
            <th scope="col">Amount</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
