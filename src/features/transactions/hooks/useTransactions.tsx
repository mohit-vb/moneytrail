import { createContext, useContext } from "react";
import type { Transaction } from "../../../domain/types/transactions";

type TransactionContextValue = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

export const TransactionContext = createContext<
  TransactionContextValue | undefined
>(undefined);

export const useTransactions = function () {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
