import { supabase } from '../client';
import {
  mapCredentialsToSupabase,
  mapSupabaseSessionToAuth,
  mapSupabaseErrorToService,
} from './adapters';
import type { AuthCredentials, AuthSession } from './types';
import type { ServiceError, ServiceResponse } from '../types';
import { routePaths } from '@/router/routePaths';

export const authAPI = {
  signUp: async (credentials: AuthCredentials): Promise<ServiceResponse<string>> => {
    const { data, error } = await supabase.auth.signUp({
      ...mapCredentialsToSupabase(credentials),
      options: {
        emailRedirectTo: `${window.location.origin}${routePaths.ACCOUNT.AUTH_CALLBACK}`,
      },
    });

    if (error) return { data: null, error: mapSupabaseErrorToService(error) };

    const isExistingUser = data.user?.identities?.length === 0;

    if (isExistingUser) {
      return { data: null, error: { message: 'This email is already registered.' } };
    }

    return { data: data.user?.email ?? '', error: null };
  },

  signIn: async (credentials: AuthCredentials): Promise<ServiceResponse<AuthSession>> => {
    const { data, error } = await supabase.auth.signInWithPassword(
      mapCredentialsToSupabase(credentials),
    );

    if (error) return { data: null, error: mapSupabaseErrorToService(error) };
    if (!data.session) return { data: null, error: { message: 'Unable to sign in.' } };

    return { data: mapSupabaseSessionToAuth(data.session), error: null };
  },

  signOut: async (): Promise<{ error: ServiceError | null }> => {
    const { error } = await supabase.auth.signOut();
    if (error) return { error: mapSupabaseErrorToService(error) };
    return { error: null };
  },

  getSession: async (): Promise<ServiceResponse<AuthSession | null>> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) return { data: null, error: mapSupabaseErrorToService(error) };
    if (!session) return { data: null, error: null };

    return { data: mapSupabaseSessionToAuth(session), error: null };
  },

  onAuthStateChange: (callback: (event: string, session: AuthSession | null) => void) => {
    return supabase.auth.onAuthStateChange((event, rawSession) => {
      callback(event, rawSession ? mapSupabaseSessionToAuth(rawSession) : null);
    });
  },

  updatePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<{ error: ServiceError | null }> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) return { error: { message: 'User not found.' } };

    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (verifyError) return { error: { message: 'Current password is incorrect.' } };

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: mapSupabaseErrorToService(error) };

    return { error: null };
  },
};
