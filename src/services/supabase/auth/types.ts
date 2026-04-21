// ─── What FE sends ────────────────────────────
export interface AuthCredentials {
  email: string;
  password: string;
}

// ─── What FE receives ─────────────────────────
export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}
