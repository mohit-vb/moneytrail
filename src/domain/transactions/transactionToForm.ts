import type { Transaction } from "../types/transactions";
import type { TransactionFormState } from "../../features/transactions/components/TransactionForm";

export function transactionToForm(
  transaction: Transaction,
): TransactionFormState {
  const base = {
    type: transaction.type,
    amount: String(transaction.amountMinor / 100),
    description: transaction.description,
    accountId: "",
    categoryId: "",
    paymentMethod: transaction.paymentMethod ?? "",
    fromAccountId: "",
    toAccountId: "",
    date: transaction.date,
  };

  switch (transaction.type) {
    case "expense":
      return {
        ...base,
        accountId: transaction.accountId,
        categoryId: transaction.categoryId,
      };

    case "income":
      return {
        ...base,
        accountId: transaction.accountId,
        categoryId: transaction.categoryId,
      };

    case "transfer":
      return {
        ...base,
        fromAccountId: transaction.accountId,
        toAccountId: transaction.toAccountId,
      };
  }
}
