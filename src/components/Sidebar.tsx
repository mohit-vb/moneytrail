import { NavLink } from "react-router";
import { sidebarMenu } from "../constants";

export default function Sidebar() {
  return (
    <aside className="w-60 h-full flex flex-col gap-8 px-4 py-6 border-r border-r-gray-900  ">
      <h1>
        Money<span className="text-accent font-semibold">Trail</span>
      </h1>
      {sidebarMenu.map(({ to, navTitle, icon: Icon }) => (
        <NavLink to={to} key={navTitle} className="flex items-center gap-2">
          <Icon className="size-4" />
          <span> {navTitle}</span>
        </NavLink>
      ))}
    </aside>
  );
}
