import { useState } from "react";
import type { Transaction } from "../domain/types/transactions";
import type { TransactionDateFilterValue } from "../domain/types/transactions";
import { goldenFixture } from "../data/seeds";
import { Plus } from "lucide-react";
import { Button, InputEl } from "../ui";
import {
  TransactionTable,
  TransactionTypeFilter,
  TransactionDateFilter,
  TransactionCategoryFilter,
  ActiveFilterChips,
  TransactionsPagination,
} from "../features/transactions/components";

import {
  filterTransactionsByDate,
  getFilterTransactions,
  getSearchedTransactions,
  filterTransactionsByCategory,
  paginateTransactions,
} from "../features/transactions/transactionsUtils";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [transactionType, setTransactionType] = useState<
    Transaction["type"] | "all"
  >("all");
  const [dateFilter, setDateFilter] =
    useState<TransactionDateFilterValue>("Date");

  const [appliedStartDate, setAppliedStartDate] = useState("");
  const [appliedEndDate, setAppliedEndDate] = useState("");
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("Category");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterTransaction = function (type: Transaction["type"] | "all") {
    setTransactionType(type);
    setCurrentPage(1);
  };

  const handleRemoveFilterTransaction = function () {
    setTransactionType("all");
    setCurrentPage(1);
  };

  const handleRemoveCategory = function () {
    setCategoryId("Category");
    setCurrentPage(1);
  };

  const handleFilterTransactionByDate = function (
    value: TransactionDateFilterValue,
  ) {
    setDateFilter(value);
    setCurrentPage(1);
  };

  const handleApplyDateRange = function (startDate: string, endDate: string) {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
    setIsCustomRangeOpen(false);
    setCurrentPage(1);
  };

  const handleFilterByCategory = function (categoryId: string) {
    setCategoryId(categoryId);
    setCurrentPage(1);
  };

  const handleRemoveDateFilter = function () {
    setDateFilter("Date");
    setAppliedStartDate("");
    setAppliedEndDate("");
    setCurrentPage(1);
  };

  const handleClearAllFilters = function () {
    setTransactionType("all");
    setDateFilter("Date");
    setAppliedStartDate("");
    setAppliedEndDate("");
    setCategoryId("Category");
    setCurrentPage(1);
  };

  const handlePageChange = function (page: number) {
    setCurrentPage(page);
  };

  const handleNextPage = function () {
    setCurrentPage((prev) => {
      if (prev >= totalPages) {
        return prev;
      }
      return prev + 1;
    });
  };

  const handlePrevPage = function () {
    setCurrentPage((prev) => {
      if (prev <= 1) {
        return prev;
      }
      return prev - 1;
    });
  };

  const typeFilteredTransactions = getFilterTransactions(
    goldenFixture,
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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(
    categoryFilteredTransactions.length / itemsPerPage,
  );

  const paginatedTransactions = paginateTransactions(
    categoryFilteredTransactions,
    currentPage,
    itemsPerPage,
  );

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1>Transactions</h1>
        <Button>
          <Plus className="size-4" />
          <span>Add</span>
        </Button>
      </header>
      <InputEl
        className="mt-4"
        placeholder="Search by description"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="flex items-center gap-10 mt-4">
        <TransactionTypeFilter onFilter={handleFilterTransaction} />
        <div className="flex items-center gap-4">
          <TransactionDateFilter
            dateFilter={dateFilter}
            onFilter={handleFilterTransactionByDate}
            onApply={handleApplyDateRange}
            isCustomRangeOpen={isCustomRangeOpen}
            setIsCustomRangeOpen={setIsCustomRangeOpen}
          />
          <TransactionCategoryFilter onFilter={handleFilterByCategory} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <ActiveFilterChips
          transactionType={transactionType}
          onRemoveTransactionType={handleRemoveFilterTransaction}
          categoryId={categoryId}
          onRemoveCategory={handleRemoveCategory}
          dateFilter={dateFilter}
          onRemoveDateFilter={handleRemoveDateFilter}
          onClearAllFilters={handleClearAllFilters}
          appliedStartDate={appliedStartDate}
          appliedEndDate={appliedEndDate}
        />
      </div>

      <div className="mt-6">
        <TransactionTable transactions={paginatedTransactions} />
        {totalPages > 1 && (
          <TransactionsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePrevPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
