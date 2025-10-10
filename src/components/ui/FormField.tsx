import { useFormContext, type FieldError } from 'react-hook-form';
import { InputField } from './InputField';
import { DropdownField } from './DropdownField';

type FormFieldProps = React.ComponentProps<typeof InputField> & {
  label?: string;
  name: string;
  type?: string;
  options?: string[];
  placeholder?: string;
  isSearchable?: boolean;
};

export function FormField({
  name,
  label,
  type = 'input',
  options,
  placeholder,
  isSearchable = false,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const fieldError = errors[name] as FieldError | undefined;
  const error = fieldError?.message;

  if (type == 'dropdown' && options) {
    return (
      <DropdownField
        label={label}
        id={name}
        {...register(name)}
        name={name}
        options={options}
        placeholder={placeholder}
        error={error}
        isSearchable={isSearchable}
        onChange={(e) => setValue(name, e.target.value, { shouldValidate: true })}
      />
    );
  }
  return (
    <InputField
      label={label}
      id={name}
      {...register(name)}
      placeholder={placeholder}
      error={error}
      type={type}
    />
  );
}
