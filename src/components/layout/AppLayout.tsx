import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
