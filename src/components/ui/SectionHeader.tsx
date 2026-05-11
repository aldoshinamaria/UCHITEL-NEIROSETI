import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
