export type PaymentMethod =
  | "upi"
  | "card"
  | "cash"
  | "netbanking"
  | "bank_transfer";

export interface BaseTransaction {
  id: string;
  amountMinor: number;
  date: string;
  description: string;
  merchant?: string;
  notes?: string;
  tags?: string[];
  paymentMethod?: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseTransaction extends BaseTransaction {
  type: "expense";
  accountId: string;
  categoryId: string;
}

export interface IncomeTransaction extends BaseTransaction {
  type: "income";
  accountId: string;
  categoryId: string;
  isRefund?: boolean;
}

export interface TransferTransaction extends BaseTransaction {
  type: "transfer";
  accountId: string;
  toAccountId: string;
}

export type Transaction =
  | ExpenseTransaction
  | IncomeTransaction
  | TransferTransaction;
