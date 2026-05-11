import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getPostBySlug } from "@/data/blog";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { cn } from "@/lib/cn";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;
  const progress = useReadingProgress();

  if (!post) return <Navigate to="/blog" replace />;

  const toc = post.body.map((_, i) => ({
    id: `section-${i + 1}`,
    label: `Пункт ${i + 1}`,
  }));

  return (
    <div className="relative">
      <div className="fixed left-0 right-0 top-[64px] z-40 h-[3px] bg-white/[0.04] sm:top-[72px]">
        <div
          className="h-full bg-gradient-to-r from-accent via-teal-300 to-accent-bright"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="relative overflow-hidden border-b border-white/[0.06] py-14 sm:py-20">
        <div className={cn("pointer-events-none absolute inset-0 opacity-70", "bg-gradient-to-br", post.heroGradient)} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            Блог
          </Link>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-fg-subtle">{post.category}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-fg-muted">
            <span>{post.date}</span>
            <span className="font-mono text-xs">{post.readMin} мин чтения</span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        <aside className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <GlassCard dense glow>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">On this page</p>
            <nav className="mt-4 space-y-2" aria-label="Содержание статьи">
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="block rounded-xl px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                >
                  {t.label}
                </a>
              ))}
            </nav>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-fg-muted">Нравится формат?</p>
              <MagneticButton href="/contact" className="mt-4 w-full">
                Сотрудничество
              </MagneticButton>
            </div>
          </GlassCard>
        </aside>

        <article className="lg:col-span-8">
          <div className="max-w-none">
            {post.body.map((p, i) => (
              <p
                key={i}
                id={`section-${i + 1}`}
                className="mb-8 text-[17px] leading-[1.75] text-fg-muted sm:text-[18px]"
              >
                {p}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
