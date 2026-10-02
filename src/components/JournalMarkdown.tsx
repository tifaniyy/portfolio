import type { ReactNode } from "react";

/**
 * Mini renderer untuk isi tulisan jurnal.
 *
 * Sengaja sederhana dan tanpa dependency — bukan Markdown penuh. Yang didukung:
 *   "## Judul"                 -> sub-judul
 *   "- poin"                   -> daftar berbutir
 *   1. poin                    -> daftar bernomor
 *   **tebal**                  -> tebal
 *   `kode`                     -> monospace
 *   baris kosong               -> pemisah paragraf
 *
 * Tidak ada HTML mentah yang dieksekusi, jadi tidak ada risiko XSS dari data.
 */

/** Render inline: **tebal** dan `kode`. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-b${index}`} className="font-semibold text-primary">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      nodes.push(
        <code
          key={`${keyPrefix}-c${index}`}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-secondary"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }

    lastIndex = match.index + token.length;
    index += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function JournalMarkdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/);

  return (
    <div className="space-y-5">
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n").map((line) => line.trim());

        /* Sub-judul */
        if (lines[0].startsWith("## ")) {
          return (
            <h2
              key={blockIndex}
              className="pt-2 text-lg font-semibold tracking-tight text-primary"
            >
              {renderInline(lines[0].slice(3), `h${blockIndex}`)}
            </h2>
          );
        }

        /* Daftar berbutir */
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={blockIndex} className="space-y-2 pl-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{renderInline(line.slice(2), `ul${blockIndex}-${i}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        /* Daftar bernomor */
        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={blockIndex} className="space-y-2 pl-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-xs font-semibold text-accent"
                  >
                    {i + 1}.
                  </span>
                  <span>
                    {renderInline(
                      line.replace(/^\d+\.\s/, ""),
                      `ol${blockIndex}-${i}`,
                    )}
                  </span>
                </li>
              ))}
            </ol>
          );
        }

        /* Paragraf biasa — baris tunggal dalam satu blok digabung */
        return (
          <p key={blockIndex} className="text-sm leading-relaxed text-muted sm:text-base">
            {renderInline(lines.join(" "), `p${blockIndex}`)}
          </p>
        );
      })}
    </div>
  );
}
