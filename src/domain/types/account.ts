type AccountType = "bank" | "savings" | "cash" | "credit_card" | "wallet";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  openingBalanceMinor: number;
  openingDate: string;
  creditLimitMinor?: number;
  isArchived: boolean;
}
