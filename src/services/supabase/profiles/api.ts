import { supabase } from '../client';
import { mapSupabaseProfileToProfile, mapProfilePayloadToSupabase } from './adapters';
import type { Profile, UpdateProfilePayload } from './types';
import type { ServiceResponse } from '../types';

export const profilesAPI = {
  getProfile: async (userId: string): Promise<ServiceResponse<Profile>> => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

    if (error)
      return {
        data: null,
        error: { message: error.message, status: error.code ? Number(error.code) : undefined },
      };

    return { data: mapSupabaseProfileToProfile(data), error: null };
  },

  updateProfile: async (
    userId: string,
    payload: UpdateProfilePayload,
  ): Promise<ServiceResponse<Profile>> => {
    const { data, error } = await supabase
      .from('profiles')
      .update(mapProfilePayloadToSupabase(payload))
      .eq('id', userId)
      .select()
      .single();

    if (error)
      return {
        data: null,
        error: { message: error.message, status: error.code ? Number(error.code) : undefined },
      };

    return { data: mapSupabaseProfileToProfile(data), error: null };
  },

  uploadAvatar: async (userId: string, file: File): Promise<ServiceResponse<string>> => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true }); // upsert = overwrite if exists

    if (uploadError) return { data: null, error: { message: uploadError.message } };

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(filePath);

    return { data: publicUrl, error: null };
  },
};
