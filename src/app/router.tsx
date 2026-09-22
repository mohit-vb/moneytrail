import { BrowserRouter, Routes, Route } from "react-router";

import {
  DashboardPage,
  TransactionsPage,
  BudgetsPage,
  GoalsPage,
  ManagePage,
  SettingsPage,
} from "../pages";

import AppLayout from "./AppLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
