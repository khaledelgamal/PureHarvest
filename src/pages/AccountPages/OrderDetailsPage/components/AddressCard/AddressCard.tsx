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
    <div className="w-full">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider p-5 border-b border-gray-100">
        {title}
      </p>
      <div className="p-5 flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <h4 className="text-gray-900">{fullName || '—'}</h4>

          {fullAddress && <p className="text-sm text-gray-600 ">{fullAddress}</p>}
        </div>

        <div className="flex flex-col gap-4">
          {address.email && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</p>
              <p className="text-sm text-gray-900">{address.email}</p>
            </div>
          )}

          {address.phone && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</p>
              <p className="text-sm text-gray-900">{address.phone}</p>
            </div>
          )}
        </div>

        {!fullName && !fullAddress && <p className="text-sm text-gray-400">No address provided.</p>}
      </div>
    </div>
  );
};
