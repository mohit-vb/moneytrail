import { useState } from "react";

import type {
  Transaction,
  TransactionDateFilterValue,
} from "../../../domain/types/transactions";

import {
  filterTransactionsByCategory,
  filterTransactionsByDate,
  getFilterTransactions,
  getSearchedTransactions,
} from "../transactionsUtils";

type TransactionFilter = {
  transactions: Transaction[];
  onFilterChange: () => void;
};

export default function useTransactionFilter({
  transactions,
  onFilterChange,
}: TransactionFilter) {
  const [search, setSearch] = useState<string>("");
  const [transactionType, setTransactionType] = useState<
    Transaction["type"] | "all"
  >("all");
  const [dateFilter, setDateFilter] =
    useState<TransactionDateFilterValue>("Date");

  const [appliedStartDate, setAppliedStartDate] = useState("");
  const [appliedEndDate, setAppliedEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("Category");

  const handleSearch = function (value: string) {
    setSearch(value);

    onFilterChange();
  };

  const handleFilterTransaction = function (type: Transaction["type"] | "all") {
    setTransactionType(type);

    onFilterChange();
  };

  const handleRemoveFilterTransaction = function () {
    setTransactionType("all");

    onFilterChange();
  };

  const handleRemoveCategory = function () {
    setCategoryId("Category");

    onFilterChange();
  };

  const handleFilterTransactionByDate = function (
    value: TransactionDateFilterValue,
  ) {
    setDateFilter(value);

    onFilterChange();
  };

  const handleApplyDateRange = function (startDate: string, endDate: string) {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);

    onFilterChange();
  };

  const handleFilterByCategory = function (categoryId: string) {
    setCategoryId(categoryId);

    onFilterChange();
  };

  const handleRemoveDateFilter = function () {
    setDateFilter("Date");
    setAppliedStartDate("");
    setAppliedEndDate("");

    onFilterChange();
  };

  const handleClearAllFilters = function () {
    setTransactionType("all");
    setDateFilter("Date");
    setAppliedStartDate("");
    setAppliedEndDate("");
    setCategoryId("Category");

    onFilterChange();
  };

  // Filter pipeline
  const typeFilteredTransactions = getFilterTransactions(
    transactions,
    transactionType,
  );

  const searchedTransactions = getSearchedTransactions(
    typeFilteredTransactions,
    search,
  );

  const dateFilteredTransactions = filterTransactionsByDate(
    searchedTransactions,
    dateFilter,
    appliedStartDate,
    appliedEndDate,
  );

  const categoryFilteredTransactions = filterTransactionsByCategory(
    dateFilteredTransactions,
    categoryId,
  );

  return {
    search,
    transactionType,
    dateFilter,
    appliedStartDate,
    appliedEndDate,
    categoryId,
    handleSearch,
    handleFilterTransaction,
    handleRemoveFilterTransaction,
    handleRemoveCategory,
    handleFilterTransactionByDate,
    handleApplyDateRange,
    handleFilterByCategory,
    handleRemoveDateFilter,
    handleClearAllFilters,
    categoryFilteredTransactions,
  };
}
