import type { ContactMessage, ContactMessagePayload } from './types';

interface SupabaseContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

// ─── Output: Supabase → FE ────────────────────
export const mapSupabaseContactMessageToContactMessage = (
  raw: SupabaseContactMessage,
): ContactMessage => ({
  id: raw.id,
  name: raw.name,
  email: raw.email,
  subject: raw.subject,
  message: raw.message,
  createdAt: raw.created_at,
});

// ─── Input: FE → Supabase ─────────────────────
export const mapContactPayloadToSupabase = (payload: ContactMessagePayload) => ({
  name: payload.name,
  email: payload.email,
  subject: payload.subject,
  message: payload.message,
});
