import { MapPin, Mail, Phone } from 'lucide-react';
type Address = {
  firstName?: string | null;
  lastName?: string | null;
  streetAddress?: string | null;
  country?: string | null;
  state?: string | null;
  zipCode?: string | null;
  email?: string | null;
  phone?: string | null;
};

type AddressCardProps = {
  title: string;
  address: Address;
};

export const AddressCard = ({ title, address }: AddressCardProps) => {
  const fullName = [address.firstName, address.lastName].filter(Boolean).join(' ');

  const fullAddress = [address.streetAddress, address.state, address.country, address.zipCode]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>

      <h4 className="font-semibold text-gray-900">{fullName || '—'}</h4>

      {fullAddress && (
        <div className="text-sm text-gray-600 leading-relaxed flex items-center gap-2">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
          {fullAddress}
        </div>
      )}

      {address.email && (
        <div className="flex items-start gap-2 text-sm text-gray-900">
          <Mail className="w-4 h-4 shrink-0 text-gray-400" />
          {address.email}
        </div>
      )}

      {address.phone && (
        <div className="flex items-start gap-2 text-sm text-gray-900">
          <Phone className="w-4 h-4 shrink-0 text-gray-400" />
          {address.phone}
        </div>
      )}

      {!fullName && !fullAddress && <p className="text-sm text-gray-900">No address provided.</p>}
    </div>
  );
};
