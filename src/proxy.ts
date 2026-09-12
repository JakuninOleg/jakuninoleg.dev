import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = handleI18n(request);

  // Telegram / social crawlers often fail on relative Location redirects
  // (e.g. `/` → `/en`). Force absolute URLs.
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (location && location.startsWith("/")) {
      response.headers.set("location", new URL(location, request.url).toString());
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/(en|ru)/:path*", "/(en|ru)"],
};
