import { forwardRef, useId, type ComponentProps } from 'react';
import { TextArea } from './TextArea';

interface TextAreaProps extends ComponentProps<'textarea'> {
  label?: string;
  error?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, rows = 5, ...props }, ref) => {
    const fallbackId = useId();
    const id = props.id || fallbackId;

    return (
      <div className="flex flex-col items-start self-stretch gap-1">
        {label && (
          <label htmlFor={id} className="text-body-1-semibold text-gray-500">
            {label}
          </label>
        )}
        <TextArea
          id={id}
          ref={ref}
          rows={rows}
          className={error ? 'border-red-500 focus:border-red-500' : ''}
          {...props}
        />
        {error && <p className="text-body-2-semibold text-error-200">{error}</p>}
      </div>
    );
  }
);
TextAreaField.displayName = 'TextAreaField';

export { TextAreaField };
