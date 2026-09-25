import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  WalletCards,
  Target,
  SlidersHorizontal,
  Settings,
} from "lucide-react";

type SidebarMenuItems = {
  navTitle: string;
  to: string;
  icon: LucideIcon;
};

export const sidebarMenu: SidebarMenuItems[] = [
  { navTitle: "Dashboard", to: "/", icon: LayoutDashboard },
  { navTitle: "Transactions", to: "/transactions", icon: ArrowLeftRight },
  { navTitle: "Budget", to: "/budgets", icon: WalletCards },
  { navTitle: "Goals", to: "/goals", icon: Target },
  { navTitle: "Manage", to: "/manage", icon: SlidersHorizontal },
  { navTitle: "Settings", to: "/settings", icon: Settings },
];

export const categoriesOptions = [
  "Food & Dining",
  "Transport",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Groceries",
  "Transfer",
  "Rent",
  "Salary",
  "Gifts",
  "Donations",
  "Insurance",
  "Taxes",
  "Subscriptions",
  "Household",
  "Personal Care",
  "Pets",
  "Kids",
  "Debt Payments",
  "Miscellaneous",
  "Freelance",
  "Investments",
  "Refunds",
  "Bonus",
  "Savings",
  "Other",
];

export const paymentOptions = [
  "Cash",
  "Bank",
  "Card",
  "Investment",
  "Loan",
  "Other",
];

export const accountOptions = [
  { id: "acc_hdfc", label: "HDFC Bank" },
  { id: "acc_icici", label: "ICICI Bank" },
  { id: "acc_icici_cc", label: "ICICI Credit Card" },
  { id: "acc_sbi", label: "SBI Bank" },
  { id: "acc_sbi_cc", label: "SBI Credit Card" },
  { id: "acc_cash", label: "Cash" },
];
