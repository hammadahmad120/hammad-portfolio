/** Parses a comma-separated tag list into trimmed unique names. */
export function parseTagNames(input: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const part of input.split(",")) {
    const name = part.trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(name);
  }

  return result;
}

/** Formats tag names for a comma-separated input. */
export function formatTagNames(names: string[]): string {
  return names.join(", ");
}
