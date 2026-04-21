// ─── What FE receives ─────────────────────────
export interface Profile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  billing: BillingAddress | null;
  createdAt: string;
  updatedAt: string;
}

export interface BillingAddress {
  firstName: string | null;
  lastName: string | null;
  companyName: string | null;
  streetAddress: string | null;
  country: string | null;
  state: string | null;
  zipCode: string | null;
  email: string | null;
  phone: string | null;
}

// ─── What FE sends ────────────────────────────
export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  billing?: Partial<BillingAddress>;
}
