import { useEffect, useReducer } from "react";
import { goldenFixture } from "../data/seeds";
import { TransactionContext } from "../features/transactions/hooks/useTransactions";
import type { Transaction } from "../domain/types/transactions";
import {
  saveTransactions,
  loadTransactions,
} from "../persistance/transactionStorage";

type TransactionState = {
  transactions: Transaction[];
};

type TransactionAction =
  | {
      type: "ADD_TRANSACTION";
      payload: Transaction;
    }
  | {
      type: "UPDATE_TRANSACTION";
      payload: Transaction;
    }
  | {
      type: "DELETE_TRANSACTION";
      payload: string;
    };

const createInitialState = (): TransactionState => {
  const savedTransactions = loadTransactions();

  return {
    transactions:
      savedTransactions.length > 0 ? savedTransactions : goldenFixture,
  };
};

const transactionReducer = (
  state: TransactionState,
  action: TransactionAction,
): TransactionState => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        ),
      };
    default:
      throw new Error("Unknown action type");
  }
};

export default function TransactionProvider({
  children,
}: React.PropsWithChildren) {
  const [{ transactions }, dispatch] = useReducer(
    transactionReducer,
    undefined,
    createInitialState,
  );

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const deleteTransaction = (id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  useEffect(
    function () {
      saveTransactions(transactions);
    },
    [transactions],
  );

  return (
    <TransactionContext
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext>
  );
}
