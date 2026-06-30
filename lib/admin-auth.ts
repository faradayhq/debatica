import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "debatica_admin_session";

function safeEqual(value: string, expected: string) {
  const providedBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return providedBuffer.length === expectedBuffer.length && timingSafeEqual(providedBuffer, expectedBuffer);
}

export function isValidAdminKey(value?: string) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !value) return false;
  return safeEqual(value, secret);
}

export function getAdminSessionToken() {
  const secret = process.env.ADMIN_SECRET;
  return secret ? createHmac("sha256", secret).update("debatica-admin-session-v1").digest("hex") : null;
}

export function isValidAdminSession(value?: string) {
  const expected = getAdminSessionToken();
  return Boolean(expected && value && safeEqual(value, expected));
}
