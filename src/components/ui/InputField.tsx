import { forwardRef, useId, type ComponentProps } from 'react';
import { Input } from './Input';

interface InputFieldProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...props }, ref) => {
    const fallbackId = useId();
    const id = props.id || fallbackId;

    return (
      <div className="flex flex-col items-start self-stretch gap-1">
        {label && (
          <label htmlFor={id} className="text-body-1-semibold text-gray-500">
            {label}
          </label>
        )}
        <Input
          id={id}
          ref={ref}
          className={error ? 'border-red-500 focus:border-red-500' : ''}
          {...props}
        />
        {error && <p className="text-body-2-semibold text-error-200">{error}</p>}
      </div>
    );
  }
);
InputField.displayName = 'InputField';

export { InputField };
