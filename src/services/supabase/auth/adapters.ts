import type { AuthError as SupabaseAuthError, Session, User } from '@supabase/supabase-js';
import type { AuthCredentials, AuthUser, AuthSession } from './types';
import type { ServiceError } from '../types';

// ─── Input: FE → Supabase ─────────────────────

export const mapCredentialsToSupabase = (credentials: AuthCredentials) => ({
  email: credentials.email,
  password: credentials.password,
});

// ─── Output: Supabase → FE ────────────────────

export const mapSupabaseUserToAuth = (user: User): AuthUser => ({
  id: user.id,
  email: user.email!,
});

export const mapSupabaseSessionToAuth = (session: Session): AuthSession => ({
  accessToken: session.access_token,
  user: mapSupabaseUserToAuth(session.user),
});

export const mapSupabaseErrorToService = (error: SupabaseAuthError): ServiceError => ({
  message: error.message,
  status: error.status,
});
