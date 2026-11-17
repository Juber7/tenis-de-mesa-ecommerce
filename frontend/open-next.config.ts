import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// KV stores the ISR pages on the Workers free plan (R2 would require a
// payment method on the Cloudflare account).
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  // Without a queue, stale pages are served forever: the home page and the
  // product pages would keep the prices and exchange rate of the deploy day.
  // The memory queue regenerates them through WORKER_SELF_REFERENCE
  // (wrangler.jsonc) and needs no extra Cloudflare resources.
  queue: memoryQueue,
});
