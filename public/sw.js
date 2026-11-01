
const CACHE_NAME = "xauusd-elite-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== self.location.origin
  ) {
    return;
  }

  // Do not cache authentication, API or Supabase requests.
  if (
    request.url.includes("/auth/") ||
    request.url.includes("/api/") ||
    request.url.includes("supabase.co")
  ) {
    return;
  }

  // Let Next.js manage its own assets and navigation requests.
});
