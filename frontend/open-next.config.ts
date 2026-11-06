import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

// KV keeps ISR pages fresh on the Workers free plan (R2 would require a
// payment method on the Cloudflare account).
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
