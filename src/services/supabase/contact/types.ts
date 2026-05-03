// ─── What FE sends ────────────────────────────
export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── What FE receives ─────────────────────────
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
