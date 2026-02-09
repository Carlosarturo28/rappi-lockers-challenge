type InputProps = {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
};

export function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  type = 'text',
}: InputProps) {
  return (
    <div>
      <label className='block text-sm text-gray-600 mb-1'>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required
        className='
          w-full
          border border-gray-200
          rounded-lg
          px-3 py-2
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-gray-900/20
          transition
        '
      />
    </div>
  );
}
