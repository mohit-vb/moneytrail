import type { Account } from "./types/account";
import type { Transaction } from "./types/transactions";

export const calculateIncome = function (transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === "income" && transaction.isRefund !== true) {
      return acc + transaction.amountMinor;
    }
    return acc;
  }, 0);
};

export const calculateExpenses = function (transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === "expense") {
      return acc + transaction.amountMinor;
    }
    if (transaction.type === "income" && transaction.isRefund === true) {
      return acc - transaction.amountMinor;
    }
    return acc;
  }, 0);
};

export const calculateSavings = function (transactions: Transaction[]) {
  return calculateIncome(transactions) - calculateExpenses(transactions);
};

export const calculateSavingsRate = function (transactions: Transaction[]) {
  const income = calculateIncome(transactions);
  const savings = calculateSavings(transactions);
  return income === 0 ? undefined : (savings / income) * 100;
};

export const calculateSpendingByCategory = function (
  transactions: Transaction[],
) {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "expense") {
        const category = transaction.categoryId;
        const amount = transaction.amountMinor;

        acc[category] = (acc[category] ?? 0) + amount;
      }
      if (transaction.type === "income" && transaction.isRefund === true) {
        const category = transaction.categoryId;
        const amount = transaction.amountMinor;

        acc[category] = (acc[category] ?? 0) - amount;
      }
      return acc;
    },
    {} as Record<string, number>,
  );
};

export const calculateAccountBalance = function (
  account: Account,
  transactions: Transaction[],
) {
  return transactions.reduce((balance, transaction) => {
    if (transaction.type === "income" && transaction.accountId === account.id) {
      return balance + transaction.amountMinor;
    }

    if (
      transaction.type === "expense" &&
      transaction.accountId === account.id
    ) {
      return balance - transaction.amountMinor;
    }

    if (
      transaction.type === "transfer" &&
      transaction.accountId === account.id
    ) {
      return balance - transaction.amountMinor;
    }

    if (
      transaction.type === "transfer" &&
      transaction.toAccountId === account.id
    ) {
      return balance + transaction.amountMinor;
    }

    return balance;
  }, account.openingBalanceMinor);
};

export const calculateTotalBalance = function (
  accounts: Account[],
  transactions: Transaction[],
) {
  return accounts.reduce((total, account) => {
    if (!account.isArchived) {
      return total + calculateAccountBalance(account, transactions);
    }

    return total;
  }, 0);
};

export const filterTransactionByDate = function (
  transactions: Transaction[],
  startDate: string,
  endDate: string,
) {
  return transactions.filter((transaction) => {
    return transaction.date >= startDate && transaction.date <= endDate;
  });
};

export const getMonthTransactions = function (
  transactions: Transaction[],
  month: number,
  year: number,
) {
  const formattedMonth = String(month).padStart(2, "0");
  const lastDay = new Date(year, month, 0).getDate();
  const formattedLastDay = String(lastDay).padStart(2, "0");

  const startDate = `${year}-${formattedMonth}-01`;
  const endDate = `${year}-${formattedMonth}-${formattedLastDay}`;

  return filterTransactionByDate(transactions, startDate, endDate);
};

interface MonthlySummary {
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number | undefined;
}

export const calculateMonthlySummary = function (
  transactions: Transaction[],
  month: number,
  year: number,
): MonthlySummary {
  const monthTransactions = getMonthTransactions(transactions, month, year);

  return {
    income: calculateIncome(monthTransactions),
    expenses: calculateExpenses(monthTransactions),
    savings: calculateSavings(monthTransactions),
    savingsRate: calculateSavingsRate(monthTransactions),
  };
};
