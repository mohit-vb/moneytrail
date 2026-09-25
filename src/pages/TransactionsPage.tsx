import { useState } from "react";

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
  TransactionsSummary,
} from "../features/transactions/components";

import {
  getTotalIncome,
  getTotalExpense,
  paginateTransactions,
} from "../features/transactions/transactionsUtils";

import useTransactionFilter from "../features/transactions/hooks/useTransactionFilter";
import Modal from "../ui/Modal";
import AddTransaction from "../features/transactions/components/AddTransaction";

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = function () {
    setCurrentPage(1);
  };

  const {
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
  } = useTransactionFilter({
    transactions: goldenFixture,
    onFilterChange: handleFilterChange,
  });

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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(
    categoryFilteredTransactions.length / itemsPerPage,
  );

  const paginatedTransactions = paginateTransactions(
    categoryFilteredTransactions,
    currentPage,
    itemsPerPage,
  );

  const totalTransactions = categoryFilteredTransactions.length;
  const totalIncome = getTotalIncome(categoryFilteredTransactions);
  const totalExpense = getTotalExpense(categoryFilteredTransactions);

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
        onChange={(e) => handleSearch(e.target.value)}
        value={search}
      />
      <div className="flex items-center gap-10 mt-4">
        <TransactionTypeFilter onFilter={handleFilterTransaction} />
        <div className="flex items-center gap-4">
          <TransactionDateFilter
            dateFilter={dateFilter}
            onFilter={handleFilterTransactionByDate}
            onApply={handleApplyDateRange}
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

      <TransactionsSummary
        totalTransactions={totalTransactions}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      <div className="mt-2">
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
      {/* <Modal
        title="Add Transaction"
        isOpen={true}
        onClose={() => console.log("not yet")}
      >
        <AddTransaction />
      </Modal> */}
    </div>
  );
}
