import { forwardRef, useId, type ComponentProps } from 'react';
import { Input } from './Input';

interface InputFieldProps extends ComponentProps<'input'> {
  label: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, ...props }, ref) => {
  const fallbackId = useId();
  const id = props.id || fallbackId;

  return (
    <div className="flex flex-col items-start self-stretch gap-1">
      <label htmlFor={id} className="text-body-1-semibold text-gray-500">
        {label}
      </label>
      <Input ref={ref} id={id} {...props} />
    </div>
  );
});
InputField.displayName = 'InputField';

export { InputField };
