import { useReducer } from "react";
import { goldenFixture } from "../data/seeds";
import { TransactionContext } from "../features/transactions/hooks/useTransactions";
import type { Transaction } from "../domain/types/transactions";

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

const initialState: TransactionState = {
  transactions: goldenFixture,
};

const transactionReducer = (
  state: TransactionState,
  action: TransactionAction,
) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
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
    initialState,
  );

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  return (
    <TransactionContext value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext>
  );
}
