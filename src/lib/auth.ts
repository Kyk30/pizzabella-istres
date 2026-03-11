import crypto from "crypto";

const SECRET = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "default-dev-secret";

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export function createToken(): string {
  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac("sha256", SECRET());
  hmac.update(timestamp);
  const signature = hmac.digest("hex");
  return `${timestamp}.${signature}`;
}

export function verifyToken(token: string): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return false;

  // Token expires after 24 hours
  if (Date.now() - ts > 24 * 60 * 60 * 1000) return false;

  const hmac = crypto.createHmac("sha256", SECRET());
  hmac.update(timestamp);
  const expected = hmac.digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected, "hex")
  );
}
