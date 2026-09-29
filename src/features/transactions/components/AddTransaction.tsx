import { useTransactions } from "../hooks/useTransactions";
import { createTransaction } from "../../../domain/transactions/createTranasction";
import TransactionForm from "./TransactionForm";
import type { TransactionFormState } from "./TransactionForm";

type AddTransactionProps = {
  onClose: () => void;
};

export default function AddTransaction({ onClose }: AddTransactionProps) {
  const { addTransaction } = useTransactions();

  const handleSubmit = (form: TransactionFormState) => {
    const newTransaction = createTransaction(form);
    addTransaction(newTransaction);

    onClose();
  };

  return (
    <div className="w-full">
      <TransactionForm
        mode="add"
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
}
