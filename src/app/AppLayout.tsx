import { Outlet } from "react-router";
import { Header, Sidebar } from "../components";

export default function AppLayout() {
  return (
    <div className="min-h-screen ">
      <div className="max-w-350 mx-auto grid h-screen grid-cols-[240px_1fr] grid-rows-[auto_1fr] bg-ink text-surface">
        <Header />
        <Sidebar />
        <main className="p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
