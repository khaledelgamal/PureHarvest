import { supabase } from '../client';
import type { ServiceResponse } from '../types';
import type { NewsletterSubscriber } from './types';

export const newsletterAPI = {
  addToNewsletter: async (email: string): Promise<ServiceResponse<NewsletterSubscriber>> => {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      return { data: null, error: { message: error.message } };
    }

    // Map to domain type
    const subscriber: NewsletterSubscriber = {
      id: data.id,
      email: data.email,
      createdAt: data.created_at,
    };

    return { data: subscriber, error: null };
  },
};
