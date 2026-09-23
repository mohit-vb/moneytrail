import { seedAccounts, seedCategories } from "../../data/seeds";
import type { Transaction } from "../../domain/types/transactions";

const getAccountName = function (accountId: string) {
  const account = seedAccounts.find((acc) => acc.id === accountId);
  return account?.name;
};

const getCategoryName = function (categoryId: string) {
  const category = seedCategories.find((cat) => cat.id === categoryId);
  return category?.name;
};

const getFilterTransactions = function (
  transactions: Transaction[],
  type: Transaction["type"] | "all",
) {
  if (type === "all") {
    return transactions;
  }

  return transactions.filter((transaction) => transaction.type === type);
};

const getSearchedTransactions = function (
  transactions: Transaction[],
  search: string,
) {
  return transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase()),
  );
};

const formatCurrency = function (amountMinor: number) {
  const formattedCurrency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amountMinor / 100);

  return formattedCurrency.replace("₹", "₹ ");
};

export {
  getAccountName,
  getCategoryName,
  getFilterTransactions,
  getSearchedTransactions,
  formatCurrency,
};
