import type { Transaction } from "../types/transactions";
import type { TransactionFormState } from "../../features/transactions/components/TransactionForm";

export const formToTransaction = (
  form: TransactionFormState,
  existingTransaction: Transaction,
): Transaction => {
  const base = {
    ...existingTransaction,
    amountMinor: Math.round(Number(form.amount) * 100),
    description: form.description.trim(),
    date: form.date,
    updatedAt: new Date().toISOString(),
  };

  switch (form.type) {
    case "expense":
      return {
        ...base,
        type: "expense",
        accountId: form.accountId,
        categoryId: form.categoryId,
        paymentMethod: form.paymentMethod as Transaction["paymentMethod"],
      };

    case "income":
      return {
        ...base,
        type: "income",
        accountId: form.accountId,
        categoryId: form.categoryId,
        paymentMethod: form.paymentMethod as Transaction["paymentMethod"],
      };

    case "transfer":
      return {
        ...base,
        type: "transfer",
        accountId: form.fromAccountId,
        toAccountId: form.toAccountId,
      };
  }
};
