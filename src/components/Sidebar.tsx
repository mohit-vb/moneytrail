import { NavLink } from "react-router";
import { sidebarMenu } from "../constants";

export default function Sidebar() {
  return (
    <aside className="w-60 h-full flex flex-col gap-8 p-4 border-r border-r-gray-300">
      {sidebarMenu.map(({ to, navTitle, icon: Icon }) => (
        <NavLink to={to} key={navTitle} className="flex items-center gap-2">
          <Icon className="w-4" />
          <span> {navTitle}</span>
        </NavLink>
      ))}
    </aside>
  );
}
