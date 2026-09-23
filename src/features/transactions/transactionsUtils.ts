import { seedAccounts, seedCategories } from "../../data/seeds";
import type {
  Transaction,
  TransactionDateFilterValue,
} from "../../domain/types/transactions";

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

const filterTransactionsByDate = function (
  transactions: Transaction[],
  dateFilter: TransactionDateFilterValue,
  startDate: string,
  endDate: string,
) {
  if (dateFilter === "Date") return transactions;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const lastMonth = new Date(currentYear, currentMonth - 1, 1);

  if (dateFilter === "this-month") {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === currentYear &&
        transactionDate.getMonth() === currentMonth
      );
    });
  }

  if (dateFilter === "last-month") {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      return (
        transactionDate.getFullYear() === lastMonth.getFullYear() &&
        transactionDate.getMonth() === lastMonth.getMonth()
      );
    });
  }

  if (dateFilter === "custom-range") {
    console.log(startDate, endDate);
  }

  return transactions;
};

export {
  getAccountName,
  getCategoryName,
  getFilterTransactions,
  getSearchedTransactions,
  formatCurrency,
  filterTransactionsByDate,
};
