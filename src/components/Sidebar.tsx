import { NavLink } from "react-router";
import { sidebarMenu } from "../constants";

export default function Sidebar() {
  return (
    <aside className="w-60 h-full flex flex-col gap-6 px-4 py-6 border-r border-r-white/10  ">
      <h1 className="mb-4">
        Money<span className="text-accent font-semibold">Trail</span>
      </h1>
      {sidebarMenu.map(({ to, navTitle, icon: Icon }) => (
        <NavLink
          to={to}
          key={navTitle}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200 ease-in-out ${
              isActive
                ? "bg-accent/30 text-surface"
                : "text-surface/60 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Icon className="size-4" />
          <span> {navTitle}</span>
        </NavLink>
      ))}
    </aside>
  );
}
