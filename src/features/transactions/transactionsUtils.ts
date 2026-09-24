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

const getTotalIncome = function (transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      return acc + transaction.amountMinor;
    }
    return acc;
  }, 0);
};

const getTotalExpense = function (transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      return acc + transaction.amountMinor;
    }
    return acc;
  }, 0);
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
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return transactionDate >= start && transactionDate <= end;
    });
  }

  return transactions;
};

const filterTransactionsByCategory = function (
  transactions: Transaction[],
  categoryId: string,
) {
  if (categoryId === "Category") return transactions;

  return transactions.filter((transaction) => {
    if (transaction.type !== "expense" && transaction.type !== "income") {
      return false;
    }
    return transaction.categoryId === categoryId;
  });
};

const paginateTransactions = function (
  transaction: Transaction[],
  currentPage: number,
  itemsPerPage: number,
) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return transaction.slice(startIndex, endIndex);
};

export {
  getAccountName,
  getCategoryName,
  getFilterTransactions,
  getSearchedTransactions,
  formatCurrency,
  filterTransactionsByDate,
  filterTransactionsByCategory,
  paginateTransactions,
  getTotalIncome,
  getTotalExpense,
};
