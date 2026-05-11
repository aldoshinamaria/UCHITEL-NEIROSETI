import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogCategories, getFeaturedPost, posts, type BlogCategory } from "@/data/blog";
import { cn } from "@/lib/cn";

export function BlogPage() {
  const featured = getFeaturedPost();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<BlogCategory | "Все">("Все");

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const hit =
        `${p.title} ${p.excerpt}`.toLowerCase().includes(q.toLowerCase().trim()) ||
        q.trim().length === 0;
      const okCat = cat === "Все" || p.category === cat;
      return hit && okCat && p.slug !== featured.slug;
    });
  }, [cat, featured.slug, q]);

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Блог"
          title="Editorial AI magazine"
          subtitle="Короткие тексты, сильная структура, уважение к времени учителя."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <GlassCard dense glow className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">Поиск</p>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 px-4 py-3">
                <Search className="size-4 text-fg-subtle" aria-hidden />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
                  placeholder="Тема, инструмент, методика…"
                  aria-label="Поиск по статьям"
                />
              </div>
            </GlassCard>
            <GlassCard dense glow>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">Категории</p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setCat("Все")}
                  className={cn(
                    "rounded-xl px-3 py-2 text-left text-sm transition-colors",
                    cat === "Все" ? "bg-white/[0.08] text-fg" : "text-fg-muted hover:bg-white/[0.04] hover:text-fg",
                  )}
                >
                  Все
                </button>
                {blogCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    className={cn(
                      "rounded-xl px-3 py-2 text-left text-sm transition-colors",
                      cat === c ? "bg-white/[0.08] text-fg" : "text-fg-muted hover:bg-white/[0.04] hover:text-fg",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </GlassCard>
          </aside>

          <div className="lg:col-span-8">
            <Link to={`/blog/${featured.slug}`} className="group block">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow className="relative min-h-[280px] overflow-hidden">
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-95",
                      "bg-gradient-to-br",
                      featured.heroGradient,
                    )}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-8">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-fg-subtle">
                        Featured · {featured.category}
                      </p>
                      <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                        {featured.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">{featured.excerpt}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-fg-subtle">
                      <span>{featured.date}</span>
                      <span className="font-mono text-xs text-fg-muted">{featured.readMin} мин</span>
                      <span className="text-fg group-hover:text-accent-bright">Читать материал →</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </Link>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {filtered.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                  <GlassCard dense glow className="relative h-full overflow-hidden">
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-35 transition-opacity duration-500 group-hover:opacity-70",
                        "bg-gradient-to-br",
                        p.heroGradient,
                      )}
                    />
                    <div className="relative">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                        {p.category}
                      </p>
                      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-fg">{p.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{p.excerpt}</p>
                      <div className="mt-6 flex items-center justify-between text-xs text-fg-subtle">
                        <span>{p.date}</span>
                        <span className="font-mono text-[11px]">{p.readMin} мин</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
