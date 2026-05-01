const FormField = ({
  label,
  children,
  optional = false,
}: {
  label: string;
  children: React.ReactNode;
  optional?: boolean;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm text-gray-900">
      {label}
      {optional && <span className="text-gray-500 text-sm"> (optional)</span>}
    </label>
    {children}
  </div>
);

export default FormField;
