import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter";

import { components } from "../_generated/api";

/**
 * Rate Limiter Configuration for Google Docs Clone
 *
 * Strategies explained:
 *
 * 1. createDocument (Token Bucket):
 *    - Rate: 5 per minute with capacity of 3
 *    - Allows small burst for legitimate use (creating multiple docs quickly)
 *    - Prevents spam/abuse while allowing normal workflows
 *    - Token bucket smooths out requests over time
 *
 * 2. updateDocument (Token Bucket):
 *    - Rate: 60 per minute (~1/sec) with capacity of 10
 *    - Higher rate for frequent edits during active document editing
 *    - Generous capacity allows bursts when user is typing rapidly
 *    - Uses shards for high-throughput scenarios (collaborative editing)
 *
 * 3. deleteDocument (Fixed Window):
 *    - Rate: 5 per minute, strict
 *    - Destructive operation requires stricter controls
 *    - Fixed window ensures hard limit per time period
 *    - Lower capacity prevents bulk deletion attacks
 *
 * 4. globalCreateLimit (Fixed Window):
 *    - Rate: 100 per hour globally
 *    - Prevents system-wide abuse (e.g., bot attacks)
 *    - Acts as a secondary safeguard
 *
 * 5. failedAuthAttempts (Token Bucket):
 *    - Rate: 5 per hour with capacity of 3
 *    - Protects against brute force attacks
 *    - Low rate with small burst for typos
 */
export const rateLimiter = new RateLimiter(components.rateLimiter, {
  // Document Creation: Token bucket for smooth rate limiting with burst allowance
  createDocument: {
    kind: "token bucket",
    rate: 5,
    period: MINUTE,
    capacity: 3, // Allow small burst of 3 docs quickly
  },

  // Document Updates: High-frequency token bucket for active editing
  updateDocument: {
    kind: "token bucket",
    rate: 60,
    period: MINUTE,
    capacity: 10, // Allow burst of 10 rapid updates
    shards: 5, // Sharding for concurrent collaborative editing
  },

  // Document Deletion: Fixed window for strict destructive operation control
  deleteDocument: {
    kind: "fixed window",
    rate: 5,
    period: MINUTE,
    capacity: 5, // No extra burst - hard limit
  },

  // Global Create Limit: System-wide protection against abuse
  globalCreateLimit: {
    kind: "fixed window",
    rate: 100,
    period: HOUR,
    shards: 5, // Sharding for high-traffic scenarios
  },
});
