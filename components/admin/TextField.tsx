type TextFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  textarea?: boolean;
  placeholder?: string;
};

// A simple labeled text input (or textarea). All the admin forms use this
// so the styling stays consistent and we don't repeat markup everywhere.
export default function TextField({
  label,
  name,
  value,
  onChange,
  textarea = false,
  placeholder,
}: TextFieldProps) {
  const className =
    "rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none";

  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-zinc-700">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={5}
          className={className}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}