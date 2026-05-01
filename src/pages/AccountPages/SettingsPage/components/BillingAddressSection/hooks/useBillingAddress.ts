import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Country, State } from 'country-state-city';

import useAuthStore from '@/store/useAuthStore';
import { profilesAPI } from '@/services/supabase/profiles/api';
import { profileKeys } from '@/services/supabase/profiles/keys';
import type { Profile } from '@/services/supabase/profiles/types';
import { toast } from 'sonner';

// ─── Data ───────────────────────────────────
const allCountries = Country.getAllCountries();

export const countryOptions = allCountries.map(c => ({
  label: c.name,
  value: c.isoCode,
}));

const getCountryIso = (countryName: string | null) =>
  allCountries.find(c => c.name === countryName)?.isoCode ?? '';

// ─── Schema ─────────────────────────────────
const billingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  companyName: z.string().optional(),
  streetAddress: z.string().min(1),
  country: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(1),
  email: z.string().email().or(z.literal('')).optional(),
  phone: z.string().optional(),
});

export type BillingFormValues = z.infer<typeof billingSchema>;

// ─── Hook ───────────────────────────────────
export const useBillingAddress = (profile?: Profile) => {
  const user = useAuthStore(s => s.user);
  const queryClient = useQueryClient();

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    values: {
      firstName: profile?.billing?.firstName ?? '',
      lastName: profile?.billing?.lastName ?? '',
      companyName: profile?.billing?.companyName ?? '',
      streetAddress: profile?.billing?.streetAddress ?? '',
      country: getCountryIso(profile?.billing?.country ?? null),
      state: profile?.billing?.state ?? '',
      zipCode: profile?.billing?.zipCode ?? '',
      email: profile?.billing?.email ?? '',
      phone: profile?.billing?.phone ?? '',
    },
  });

  const { watch } = form;

  // ── Country / State logic ──
  const selectedCountryIso = watch('country');

  const stateOptions = selectedCountryIso
    ? State.getStatesOfCountry(selectedCountryIso).map(s => ({
        label: s.name,
        value: s.name,
      }))
    : [];

  // ── Mutation ──
  const { mutate: updateBilling, isPending } = useMutation({
    mutationFn: async (values: BillingFormValues) => {
      const countryName = Country.getCountryByCode(values.country)?.name ?? '';

      const { data, error } = await profilesAPI.updateProfile(user!.id, {
        billing: {
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.companyName,
          streetAddress: values.streetAddress,
          country: countryName,
          state: values.state,
          zipCode: values.zipCode,
          email: values.email,
          phone: values.phone,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: data => {
      queryClient.setQueryData(profileKeys.profile(user!.id), data);
      toast.success('Billing address updated successfully');
    },
    onError: () => {
      toast.error('Failed to update Billing address');
    },
  });

  return {
    ...form,
    stateOptions,
    selectedCountryIso,
    countryOptions,
    updateBilling,
    isPending,
  };
};
