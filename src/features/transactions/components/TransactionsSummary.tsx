import { formatCurrency } from "../transactionsUtils";

type TransactionsSummaryProps = {
  totalTransactions: number;
  totalIncome: number;
  totalExpense: number;
};

export default function TransactionsSummary({
  totalTransactions,
  totalIncome,
  totalExpense,
}: TransactionsSummaryProps) {
  return (
    <div className="flex items-center gap-4 py-2 mt-4 border-b border-b-white/20">
      <SummarySegament name="Transactions" value={totalTransactions} />
      <span className="`w-1 h-1 rounded-full bg-surface/50">&nbsp;</span>
      <SummarySegament name="Income" value={formatCurrency(totalIncome)} />
      <span className="`w-1 h-1 rounded-full bg-surface/50">&nbsp;</span>
      <SummarySegament name="Expense" value={formatCurrency(totalExpense)} />
      <span className="`w-1 h-1 rounded-full bg-surface/50">&nbsp;</span>
      <SummarySegament
        name="Net"
        value={formatCurrency(totalIncome - totalExpense)}
      />
    </div>
  );
}

function SummarySegament({
  name,
  value,
}: {
  name: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-surface/40 text-sm">{name}</span>
      <h4 className="font-display">{value}</h4>
    </div>
  );
}
