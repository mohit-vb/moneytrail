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
  ActiveFilterChips,
} from "../features/transactions/components";

import {
  filterTransactionsByDate,
  getFilterTransactions,
  getSearchedTransactions,
} from "../features/transactions/transactionsUtils";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [transactionType, setTransactionType] = useState<
    Transaction["type"] | "all"
  >("all");
  const [dateFilter, setDateFilter] =
    useState<TransactionDateFilterValue>("Date");

  const handleFilterTransaction = function (type: Transaction["type"] | "all") {
    setTransactionType(type);
  };

  const handleRemoveFilterTransaction = function () {
    setTransactionType("all");
  };

  const handleFilterTransactionByDate = function (
    value: TransactionDateFilterValue,
  ) {
    setDateFilter(value);
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
        <TransactionDateFilter
          dateFilter={dateFilter}
          onFilter={handleFilterTransactionByDate}
        />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <ActiveFilterChips
          transactionType={transactionType}
          onRemove={handleRemoveFilterTransaction}
        />
      </div>

      <div className="mt-6">
        <TransactionTable transactions={dateFilteredTransactions} />
      </div>
    </div>
  );
}
