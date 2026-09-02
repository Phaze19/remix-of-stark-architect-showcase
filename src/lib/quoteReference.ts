/**
 * Human-readable tracking reference for a quote request, e.g. REL-2609-A1B2C3.
 * Generated client-side so the buyer sees it immediately after submitting.
 */
export const generateQuoteReference = (): string => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  bytes.forEach((b) => {
    suffix += alphabet[b % alphabet.length];
  });
  return `REL-${yy}${mm}-${suffix}`;
};

export const normalizeQuoteReference = (value: string): string =>
  value.trim().toUpperCase();
