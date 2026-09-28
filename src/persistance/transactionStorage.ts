import type { Transaction } from "../domain/types/transactions";
import TransactionSchema from "../domain/schema/transaction.schema";
import z from "zod";

const TRANSACTION_STORAGE_KEY = "moneytrail:transactions";

const saveTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions));
};

const loadTransactions = (): Transaction[] => {
  const transactions = localStorage.getItem(TRANSACTION_STORAGE_KEY);
  if (!transactions) return [];
  try {
    const parsedTransactions = JSON.parse(transactions);
    const validatedTransactions = z
      .array(TransactionSchema)
      .safeParse(parsedTransactions);

    if (!validatedTransactions.success) {
      console.error("Invalid transactions data", validatedTransactions.error);
      return [];
    }

    return validatedTransactions.data;
  } catch (err) {
    console.error("Failed to load transactions", err);
    return [];
  }
};
export { saveTransactions, loadTransactions };
