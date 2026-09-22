import { Button } from "../ui";
import { Plus } from "lucide-react";

export default function TransactionsPage() {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h1>Transactions</h1>
        <Button>
          <Plus className="size-4" />
          <span>Add</span>
        </Button>
      </header>
    </div>
  );
}
