import fs from "node:fs";
import path from "node:path";

export const legalSlugs = ["privacy", "consent", "cookies"] as const;
export type LegalSlug = (typeof legalSlugs)[number];

export function isLegalSlug(value: string): value is LegalSlug {
  return (legalSlugs as readonly string[]).includes(value);
}

export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "li"; text: string };

export type LegalDoc = {
  slug: LegalSlug;
  title: string;
  blocks: LegalBlock[];
};

function parseBlocks(body: string): LegalBlock[] {
  const lines = body.split(/\r?\n/);
  const blocks: LegalBlock[] = [];
  let para: string[] = [];

  const flush = () => {
    const text = para.join(" ").replace(/\s+/g, " ").trim();
    para = [];
    if (!text) return;
    if (text.startsWith("—") || text.startsWith("-") || text.startsWith("*")) {
      blocks.push({ type: "li", text: text.replace(/^[—*]\s*/, "") });
      return;
    }
    blocks.push({ type: "p", text });
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (/^\d+\.\s+\S/.test(line) && !/^\d+\.\d+/.test(line)) {
      flush();
      blocks.push({ type: "h2", text: line });
      continue;
    }
    if (/^\d+\.\d+\.?\s+\S/.test(line)) {
      flush();
      blocks.push({ type: "h3", text: line });
      continue;
    }
    para.push(line);
  }
  flush();
  return blocks;
}

export function getLegalDoc(slug: LegalSlug): LegalDoc {
  const file = path.join(process.cwd(), "content", "legal", `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trim();
  const [first, ...rest] = raw.split(/\r?\n/);
  const title = (first ?? slug).trim();
  const body = rest.join("\n").trim();
  return { slug, title, blocks: parseBlocks(body) };
}

export function localizeLegalHref(href: string, locale: string) {
  if (href.startsWith("/legal/")) return `/${locale}${href}`;
  return href;
}
