import { useFormContext, type FieldError } from 'react-hook-form';
import { InputField } from './InputField';
import { DropdownField } from './DropdownField';
import { TextAreaField } from './TextAreaField';

type FormFieldProps = React.ComponentProps<typeof InputField> & {
  label?: string;
  name: string;
  type?: string;
  options?: string[] | Record<string, string[]>;
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
  ...props
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const fieldError = errors[name] as FieldError | undefined;
  const error = fieldError?.message;

  if (
    type === 'dropdownTwoLevel' &&
    options &&
    typeof options === 'object' &&
    !Array.isArray(options)
  ) {
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
        type="dropdownTwoLevel"
        value={props.value}
        onChange={(e) => setValue(name, e.target.value, { shouldValidate: true })}
      />
    );
  }

  if (type == 'dropdown' && Array.isArray(options)) {
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
        type="dropdown"
        onChange={(e) => setValue(name, e.target.value, { shouldValidate: true })}
      />
    );
  }

  if (type === 'textarea') {
    return (
      <TextAreaField
        label={label}
        id={name}
        {...register(name)}
        placeholder={placeholder}
        error={error}
        rows={5}
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
      onChange={(e) => setValue(name, e.target.value, { shouldValidate: true })}
      {...props}
    />
  );
}
