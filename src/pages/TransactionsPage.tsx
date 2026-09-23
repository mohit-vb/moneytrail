import { useState } from "react";
import type { Transaction } from "../domain/types/transactions";
import { goldenFixture } from "../data/seeds";
import { Plus } from "lucide-react";
import { Button, InputEl } from "../ui";
import TransactionTable from "../features/transactions/components/TransactionTable";
import TransactionTypeFilter from "../features/transactions/components/TransactionTypeFilter";
import {
  getFilterTransactions,
  getSearchedTransactions,
} from "../features/transactions/transactionsUtils";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [transactionType, setTransactionType] = useState<
    Transaction["type"] | "all"
  >("all");

  const handleFilterTransaction = function (type: Transaction["type"] | "all") {
    setTransactionType(type);
  };

  const typeFilteredTransactions = getFilterTransactions(
    goldenFixture,
    transactionType,
  );

  const searchedTransactions = getSearchedTransactions(
    typeFilteredTransactions,
    search,
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

      <TransactionTypeFilter onFilter={handleFilterTransaction} />

      <div className="mt-6">
        <TransactionTable transactions={searchedTransactions} />
      </div>
    </div>
  );
}
