const FormField = ({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <div className="space-y-1.5">
    <label className="text-sm text-gray-900">
      {label}
      {!required && <span className="text-gray-500 text-sm"> (optional)</span>}
    </label>
    {children}
  </div>
);

export default FormField;
