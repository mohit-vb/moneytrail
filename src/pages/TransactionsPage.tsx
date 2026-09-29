import { useState } from "react";
import { Plus } from "lucide-react";
import { useTransactions } from "../features/transactions/hooks/useTransactions";
import { Button, InputEl } from "../ui";

import {
  TransactionTable,
  TransactionTypeFilter,
  TransactionDateFilter,
  TransactionCategoryFilter,
  ActiveFilterChips,
  TransactionsPagination,
  TransactionsSummary,
  TransactionSortFilter,
  AddTransaction,
  EditTransaction,
} from "../features/transactions/components";

import {
  getTotalIncome,
  getTotalExpense,
  paginateTransactions,
} from "../features/transactions/transactionsUtils";

import useTransactionFilter from "../features/transactions/hooks/useTransactionFilter";
import Modal from "../ui/Modal";
import type { Transaction } from "../domain/types/transactions";

export default function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { transactions } = useTransactions();

  const handleAddTransaction = function () {
    setIsAddOpen(true);
  };

  const handleCloseAdd = function () {
    setIsAddOpen(false);
  };

  const handleEditTransaction = function (transaction: Transaction) {
    setSelectedTransaction(transaction);
    setIsEditOpen(true);
  };

  const handleCloseEdit = function () {
    setSelectedTransaction(null);
    setIsEditOpen(false);
  };

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
    sortBy,
    handleSearch,
    handleFilterTransaction,
    handleRemoveFilterTransaction,
    handleRemoveCategory,
    handleSortBy,
    handleRemoveSort,
    handleFilterTransactionByDate,
    handleApplyDateRange,
    handleFilterByCategory,
    handleRemoveDateFilter,
    handleClearAllFilters,
    sortedTransactions,
  } = useTransactionFilter({
    transactions: transactions,
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
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const paginatedTransactions = paginateTransactions(
    sortedTransactions,
    currentPage,
    itemsPerPage,
  );

  const totalTransactions = sortedTransactions.length;
  const totalIncome = getTotalIncome(sortedTransactions);
  const totalExpense = getTotalExpense(sortedTransactions);

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1>Transactions</h1>
        <Button onClick={handleAddTransaction}>
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
          <TransactionCategoryFilter
            categoryId={categoryId}
            onFilter={handleFilterByCategory}
          />
          <TransactionSortFilter sortBy={sortBy} onSort={handleSortBy} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <ActiveFilterChips
          transactionType={transactionType}
          onRemoveTransactionType={handleRemoveFilterTransaction}
          categoryId={categoryId}
          sortBy={sortBy}
          onRemoveCategory={handleRemoveCategory}
          onRemoveSort={handleRemoveSort}
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
        <TransactionTable
          transactions={paginatedTransactions}
          onEdit={handleEditTransaction}
        />
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

      <Modal
        title="Add Transaction"
        isOpen={isAddOpen}
        onClose={handleCloseAdd}
      >
        <AddTransaction onClose={handleCloseAdd} />
      </Modal>
      <Modal
        title="Edit Transaction"
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
      >
        {selectedTransaction && (
          <EditTransaction
            transaction={selectedTransaction}
            onClose={handleCloseEdit}
          />
        )}
      </Modal>
    </div>
  );
}
