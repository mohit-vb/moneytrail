import TransactionForm from "./TransactionForm";
import { useTransactions } from "../hooks/useTransactions";
import { transactionToForm } from "../../../domain/transactions/transactionToForm";
import { formToTransaction } from "../../../domain/transactions/formToTransaction";
import type { Transaction } from "../../../domain/types/transactions";
import type { TransactionFormState } from "./TransactionForm";

type EditTransactionProps = {
  transaction: Transaction;
  onClose: () => void;
};

export default function EditTransaction({
  transaction,
  onClose,
}: EditTransactionProps) {
  const { updateTransaction } = useTransactions();

  const handleSubmit = function (form: TransactionFormState) {
    const updatedTransaction = formToTransaction(form, transaction);
    updateTransaction(updatedTransaction);
    onClose();
  };

  return (
    <div className="w-full">
      <TransactionForm
        mode="edit"
        onClose={onClose}
        handleSubmit={handleSubmit}
        initialForm={transactionToForm(transaction)}
      />
    </div>
  );
}
