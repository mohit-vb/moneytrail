import { useState } from "react";
import type { TransactionDateFilterValue } from "../../../domain/types/transactions";
import { Button } from "../../../ui";
import SelectEl from "../../../ui/SelectEl";

type TransactionDateFilter = {
  dateFilter: TransactionDateFilterValue;
  onFilter: (value: TransactionDateFilterValue) => void;
  onApply: (startDate: string, endDate: string) => void;
};

export default function TransactionDateFilter({
  dateFilter,
  onFilter,
  onApply,
}: TransactionDateFilter) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);

  return (
    <div className="relative">
      <SelectEl
        value={dateFilter}
        onChange={(e) => {
          const value = e.target.value as TransactionDateFilterValue;
          onFilter(value);
          if (value === "custom-range") {
            setIsCustomRangeOpen(true);
          }
        }}
      >
        <option disabled={true} value="Date">
          Date
        </option>
        <option value="this-month">This Month</option>
        <option value="last-month">Last Month</option>
        <option value="custom-range">Custom Range</option>
      </SelectEl>

      {dateFilter === "custom-range" && isCustomRangeOpen && (
        <div className="absolute left-0 w-[calc(100% + 20px)] top-full z-50 mt-2 rounded-2xl border border-gray-800 bg-ink p-4 shadow-lg">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="start-date"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Start Date
              </label>

              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-surface/10 px-3 py-2 text-sm text-gray-300 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            <div>
              <label
                htmlFor="end-date"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                End Date
              </label>

              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-surface/10 px-3 py-2 text-sm text-gray-300 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                onApply(startDate, endDate);
                setIsCustomRangeOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
