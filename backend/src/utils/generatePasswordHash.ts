import crypto from "crypto";

export function generatePasswordHash(raw_password: string): string {
  return crypto.createHash('sha256').update(raw_password).digest('hex');
}
