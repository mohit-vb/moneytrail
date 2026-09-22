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
