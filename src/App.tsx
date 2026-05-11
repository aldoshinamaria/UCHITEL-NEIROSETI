import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AboutPage } from "@/pages/AboutPage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { CaseDetailPage } from "@/pages/CaseDetailPage";
import { CasesPage } from "@/pages/CasesPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { MaterialsPage } from "@/pages/MaterialsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ToolsPage } from "@/pages/ToolsPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:slug" element={<CaseDetailPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
