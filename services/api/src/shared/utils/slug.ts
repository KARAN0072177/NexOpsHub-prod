/**
 * Converts a string into a URL-friendly slug.
 *
 * Examples:
 * "NexOpsHub"            -> "nexopshub"
 * "My Project"           -> "my-project"
 * "Hello, World!"        -> "hello-world"
 * "  API   Gateway  "    -> "api-gateway"
 */
export function generateSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}