import type { Profile, UpdateProfilePayload } from './types';

// ─── Supabase row shape ───────────────────────
interface SupabaseProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  billing_first_name: string | null;
  billing_last_name: string | null;
  billing_company_name: string | null;
  billing_street_address: string | null;
  billing_country: string | null;
  billing_state: string | null;
  billing_zip_code: string | null;
  billing_email: string | null;
  billing_phone: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Output: Supabase → FE ────────────────────
export const mapSupabaseProfileToProfile = (row: SupabaseProfile): Profile => ({
  id: row.id,
  firstName: row.first_name,
  lastName: row.last_name,
  phone: row.phone,
  avatarUrl: row.avatar_url ? row.avatar_url + '?t=' + Date.now() : '',
  billing: {
    firstName: row.billing_first_name,
    lastName: row.billing_last_name,
    companyName: row.billing_company_name,
    streetAddress: row.billing_street_address,
    country: row.billing_country,
    state: row.billing_state,
    zipCode: row.billing_zip_code,
    email: row.billing_email,
    phone: row.billing_phone,
  },
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

// ─── Input: FE → Supabase ─────────────────────
export const mapProfilePayloadToSupabase = (payload: UpdateProfilePayload) => ({
  ...(payload.firstName !== undefined && { first_name: payload.firstName }),
  ...(payload.lastName !== undefined && { last_name: payload.lastName }),
  ...(payload.phone !== undefined && { phone: payload.phone }),
  ...(payload.avatarUrl !== undefined && { avatar_url: payload.avatarUrl }),
  ...(payload.billing?.firstName !== undefined && {
    billing_first_name: payload.billing.firstName,
  }),
  ...(payload.billing?.lastName !== undefined && { billing_last_name: payload.billing.lastName }),
  ...(payload.billing?.companyName !== undefined && {
    billing_company_name: payload.billing.companyName,
  }),
  ...(payload.billing?.streetAddress !== undefined && {
    billing_street_address: payload.billing.streetAddress,
  }),
  ...(payload.billing?.country !== undefined && { billing_country: payload.billing.country }),
  ...(payload.billing?.state !== undefined && { billing_state: payload.billing.state }),
  ...(payload.billing?.zipCode !== undefined && { billing_zip_code: payload.billing.zipCode }),
  ...(payload.billing?.email !== undefined && { billing_email: payload.billing.email }),
  ...(payload.billing?.phone !== undefined && { billing_phone: payload.billing.phone }),
});
