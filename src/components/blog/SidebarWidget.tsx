import type { ReactNode } from "react";

/** Kartu putih ala widget sidebar Blogger. */
export function SidebarWidget({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
      <h2 className="border-b border-border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
        {title}
      </h2>
      <div className="px-4 py-4">{children}</div>
    </section>
  );
}
