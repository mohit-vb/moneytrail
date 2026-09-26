import { rupeesToPaise } from "../../util";
import type { Transaction, PaymentMethod } from "../types/transactions";

export type TransactionFormData = {
  type: "income" | "expense" | "transfer";
  amount: string;
  description: string;
  categoryId: string;
  accountId: string;
  paymentMethod: string;
  fromAccountId: string;
  toAccountId: string;
  date: string;
};

export const createTransaction = function (
  form: TransactionFormData,
): Transaction {
  const now = new Date().toISOString();

  const base = {
    id: crypto.randomUUID(),
    amountMinor: rupeesToPaise(form.amount),
    date: form.date,
    description: form.description.trim(),
    createdAt: now,
    updatedAt: now,
  };

  switch (form.type) {
    case "expense":
      return {
        ...base,
        type: "expense",
        accountId: form.accountId,
        categoryId: form.categoryId,
        paymentMethod: form.paymentMethod as PaymentMethod,
      };

    case "income":
      return {
        ...base,
        type: "income",
        accountId: form.accountId,
        categoryId: form.categoryId,
        paymentMethod: form.paymentMethod as PaymentMethod,
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
