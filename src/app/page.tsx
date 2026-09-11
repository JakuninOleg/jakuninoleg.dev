import { redirect } from "next/navigation";

/** Root redirects via next-intl proxy; keep a fallback. */
export default function RootPage() {
  redirect("/en");
}
