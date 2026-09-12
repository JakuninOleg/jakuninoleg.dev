import type { ReactNode } from "react";
import { localizeLegalHref, type LegalBlock } from "@/content/legal";

function linkify(text: string, locale: string) {
  const parts: ReactNode[] = [];
  const re =
    /(https?:\/\/[^\s<]+|\/legal\/[a-z-]+|oleg\.kemz@gmail\.com)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const raw = match[0];
    const cleaned = raw.replace(/[.,;]+$/, "");
    const href = cleaned.includes("@")
      ? `mailto:${cleaned}`
      : localizeLegalHref(cleaned, locale);
    parts.push(
      <a key={`l-${key++}`} href={href}>
        {cleaned}
      </a>,
    );
    last = match.index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function LegalArticle({
  title,
  blocks,
  locale,
  note,
}: {
  title: string;
  blocks: LegalBlock[];
  locale: string;
  note?: string;
}) {
  return (
    <article className="legal-doc">
      <header className="legal-doc__head">
        <h1>{title}</h1>
        {note ? <p className="legal-doc__note">{note}</p> : null}
      </header>
      <div className="legal-doc__body">
        {blocks.map((block, index) => {
          if (block.type === "h2") {
            return <h2 key={index}>{linkify(block.text, locale)}</h2>;
          }
          if (block.type === "h3") {
            return <h3 key={index}>{linkify(block.text, locale)}</h3>;
          }
          if (block.type === "li") {
            return (
              <p key={index} className="legal-doc__li">
                — {linkify(block.text, locale)}
              </p>
            );
          }
          return <p key={index}>{linkify(block.text, locale)}</p>;
        })}
      </div>
    </article>
  );
}
