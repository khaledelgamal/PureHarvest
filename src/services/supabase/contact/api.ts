import { supabase } from '../client';
import { mapSupabaseContactMessageToContactMessage, mapContactPayloadToSupabase } from './adapters';
import type { ContactMessage, ContactMessagePayload } from './types';
import type { ServiceResponse } from '../types';

export const contactAPI = {
  sendMessage: async (payload: ContactMessagePayload): Promise<ServiceResponse<ContactMessage>> => {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert(mapContactPayloadToSupabase(payload))
      .select()
      .single();

    if (error) return { data: null, error: { message: error.message } };
    return { data: mapSupabaseContactMessageToContactMessage(data), error: null };
  },
};
