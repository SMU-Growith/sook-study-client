import { useFormContext, type FieldError } from 'react-hook-form';
import { InputField } from './InputField';

type FormFieldProps = React.ComponentProps<typeof InputField> & {
  label?: string;
  name: string;
};

export function FormField({ name, label, ...props }: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name] as FieldError | undefined;
  const error = fieldError?.message;
  return <InputField label={label} id={name} {...register(name)} {...props} error={error} />;
}
