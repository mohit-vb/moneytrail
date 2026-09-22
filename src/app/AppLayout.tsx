import { Outlet } from "react-router";
import { Header, Sidebar } from "../components";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <div className="max-w-350 mx-auto grid h-screen grid-cols-[240px_1fr] grid-rows-[auto_1fr] border bg-gradient-hero">
        <Header />
        <Sidebar />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
